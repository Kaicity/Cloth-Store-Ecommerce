package com.example.ctapi.services;


import io.jsonwebtoken.Claims;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.HashMap;

public interface JWTService {
    String extractUserName(String token);

    String generateToken(Authentication authentication);

    boolean isTokenValid(String token, UserDetails userDetails);

    String generateRefreshToken(HashMap<String, Object> extracClaims, UserDetails userDetails);

    Authentication getAllInfomationByToken(String token);

    public Claims decodeJWT(String jwt);
}
