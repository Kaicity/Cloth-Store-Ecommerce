 package com.example.ctapi.dtos.sercurity;

import com.example.ctcommon.enums.Role;
import lombok.Data;

import java.time.LocalDateTime;

 @Data
public class JwtAuthenticationResponse {
    private String token;
    private String refreshToken;
    private LocalDateTime timeStart;
    private LocalDateTime timeEnd;
}
