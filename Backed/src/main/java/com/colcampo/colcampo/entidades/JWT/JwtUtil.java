package com.colcampo.colcampo.entidades.JWT;


import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts; 
import io.jsonwebtoken.SignatureAlgorithm; 
import java.util.Base64; 
import java.util.Date;

@Service
public class JwtUtil {
    private String secretKey = Base64.getEncoder().encodeToString("717F0110C0801AB4318466ECC4AB4C08612C3AE9AF7FAC4215CE3E081CADD0C1".getBytes()); 

    public String generateToken(String username) {
        return Jwts.builder()
        .setSubject(username) .setIssuedAt(new Date()) .setExpiration(new Date(System.currentTimeMillis() + 86400000)) 
        .signWith(SignatureAlgorithm.HS256, secretKey) 
        .compact();
    }
    public String extractUsername(String token) { 
        return Jwts.parser() 
        .setSigningKey(secretKey) 
        .parseClaimsJws(token) 
        .getBody() 
        .getSubject(); 
    }
}

