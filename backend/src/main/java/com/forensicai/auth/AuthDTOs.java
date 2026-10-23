package com.forensicai.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDTOs {

    public record LoginRequest(
        @NotBlank(message = "Email is required")
        @Email(message = "Valid email is required")
        String email,

        @NotBlank(message = "Password is required")
        String password
    ) {}

    public record RegisterRequest(
        @NotBlank(message = "Name is required")
        String name,

        @NotBlank(message = "Email is required")
        @Email(message = "Valid email is required")
        String email,

        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters")
        String password,

        Role role
    ) {}

    public record UserDTO(
        String id,
        String email,
        String name,
        Role role
    ) {
        public static UserDTO fromEntity(UserEntity entity) {
            return new UserDTO(entity.getId(), entity.getEmail(), entity.getName(), entity.getRole());
        }
    }

    public record AuthResponse(
        String accessToken,
        String tokenType,
        long expiresIn,
        UserDTO user
    ) {}

    public record TokenRefreshResponse(
        String accessToken,
        String tokenType,
        long expiresIn
    ) {}
}
