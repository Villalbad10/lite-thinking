package com.lite_thinking.app.dto;

import lombok.Data;

@Data
public class UserRegistrationDTO {
    private String fullName;
    private String email;
    private String password;
}