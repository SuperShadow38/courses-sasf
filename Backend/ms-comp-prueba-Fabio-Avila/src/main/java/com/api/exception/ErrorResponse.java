package com.api.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class ErrorResponse {
    private int status;
    private String message;

    public ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


// ...

@ExceptionHandler(DisabledException.class)
public ResponseEntity<ErrorResponse> handleDisabledException(DisabledException e) {
    ErrorResponse errorResponse = new ErrorResponse(401, "Your account has been suspended or blocked. Contact supporter@example.com for assistance.");
    return ResponseEntity.status(401).body(errorResponse);
}

 }
