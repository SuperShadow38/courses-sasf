package com.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.config.JwtUtil;
import com.api.exception.ErrorResponse;
import com.api.service.LoginService;
import com.api.token.TokenResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginService loginService) {
    UsernamePasswordAuthenticationToken login = new UsernamePasswordAuthenticationToken(loginService.getUsername(), loginService.getPassword());

    try {
        Authentication authentication = this.authenticationManager.authenticate(login);

        String jwt = this.jwtUtil.create(loginService.getUsername());

        // Devolver el token JWT en la respuesta JSON
        return ResponseEntity.ok().body(new TokenResponse(jwt));
    }catch (DisabledException e) {
        ErrorResponse errorResponse = new ErrorResponse(401, "Your account has been suspended or blocked. Contact supporter@example.com for assistance.");
        return ResponseEntity.status(401).body(errorResponse);
    } catch (AuthenticationException e) {
        ErrorResponse errorResponse = new ErrorResponse(401, "Invalid Username or password");
        return ResponseEntity.status(401).body(errorResponse);
    }
}
}