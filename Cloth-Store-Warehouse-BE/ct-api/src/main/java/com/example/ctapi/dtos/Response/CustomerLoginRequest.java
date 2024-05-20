package com.example.ctapi.dtos.Response;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class CustomerLoginRequest {
    private String username;
    private String password;
}
