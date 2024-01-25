package com.sixback.eyebird.api.Exception;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.security.auth.message.AuthException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;

@RestControllerAdvice
@Slf4j
public class ControllerAdvice {

    @ExceptionHandler(value = {IllegalArgumentException.class})
    public ResponseEntity<String> illegalException() {
        return ResponseEntity.status(403).body("illegal argument");
    }


    @ExceptionHandler(InsufficientAuthenticationException.class)
    public ResponseEntity<String> handleGlobalException(InsufficientAuthenticationException e) {
        log.info(e.getClass().getName());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증 권한 없음");
    }

}
