package com.forensicai.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthDTOs.AuthResponse register(AuthDTOs.RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email is already registered");
        }

        Role assignedRole = request.role() != null ? request.role() : Role.STUDENT;

        UserEntity user = new UserEntity(
                "usr-" + UUID.randomUUID().toString().substring(0, 8),
                request.email().toLowerCase().trim(),
                passwordEncoder.encode(request.password()),
                request.name().trim(),
                assignedRole
        );

        UserEntity saved = userRepository.save(user);
        String token = jwtService.generateAccessToken(saved);

        return new AuthDTOs.AuthResponse(
                token,
                "Bearer",
                jwtService.getExpirationMs() / 1000,
                AuthDTOs.UserDTO.fromEntity(saved)
        );
    }

    public AuthDTOs.AuthResponse login(AuthDTOs.LoginRequest request) {
        UserEntity user = userRepository.findByEmail(request.email().toLowerCase().trim())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String token = jwtService.generateAccessToken(user);

        return new AuthDTOs.AuthResponse(
                token,
                "Bearer",
                jwtService.getExpirationMs() / 1000,
                AuthDTOs.UserDTO.fromEntity(user)
        );
    }

    public AuthDTOs.TokenRefreshResponse refresh(String refreshToken) {
        if (refreshToken == null || jwtService.isTokenExpired(refreshToken)) {
            throw new IllegalArgumentException("Invalid or expired refresh token");
        }

        String userId = jwtService.extractUserId(refreshToken);
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String newAccessToken = jwtService.generateAccessToken(user);

        return new AuthDTOs.TokenRefreshResponse(
                newAccessToken,
                "Bearer",
                jwtService.getExpirationMs() / 1000
        );
    }

    public UserEntity getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }
}
