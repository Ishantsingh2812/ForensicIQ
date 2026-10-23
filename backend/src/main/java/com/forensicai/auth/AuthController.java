package com.forensicai.auth;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthDTOs.AuthResponse> register(
            @Valid @RequestBody AuthDTOs.RegisterRequest request,
            HttpServletResponse response
    ) {
        AuthDTOs.AuthResponse authResponse = authService.register(request);
        UserEntity user = authService.getUserById(authResponse.user().id());
        setRefreshTokenCookie(response, jwtService.generateRefreshToken(user));
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDTOs.AuthResponse> login(
            @Valid @RequestBody AuthDTOs.LoginRequest request,
            HttpServletResponse response
    ) {
        AuthDTOs.AuthResponse authResponse = authService.login(request);
        UserEntity user = authService.getUserById(authResponse.user().id());
        setRefreshTokenCookie(response, jwtService.generateRefreshToken(user));
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthDTOs.TokenRefreshResponse> refresh(HttpServletRequest request) {
        String refreshToken = extractRefreshTokenFromCookies(request);
        if (refreshToken == null) {
            return ResponseEntity.status(401).build();
        }
        try {
            AuthDTOs.TokenRefreshResponse refreshResponse = authService.refresh(refreshToken);
            return ResponseEntity.ok(refreshResponse);
        } catch (Exception e) {
            return ResponseEntity.status(401).build();
        }
    }

    @GetMapping("/me")
    public ResponseEntity<AuthDTOs.UserDTO> me(@AuthenticationPrincipal UserEntity user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(AuthDTOs.UserDTO.fromEntity(user));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(false) // Set to true in prod with HTTPS
                .sameSite("Lax")
                .path("/api/auth")
                .maxAge(0)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().build();
    }

    private void setRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(false) // Set to true in prod with HTTPS
                .sameSite("Lax")
                .path("/api/auth")
                .maxAge(7 * 24 * 60 * 60) // 7 days
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    private String extractRefreshTokenFromCookies(HttpServletRequest request) {
        if (request.getCookies() == null) return null;
        return Arrays.stream(request.getCookies())
                .filter(c -> "refreshToken".equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
    }
}
