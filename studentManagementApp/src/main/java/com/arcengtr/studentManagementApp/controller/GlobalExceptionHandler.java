package com.arcengtr.studentManagementApp.controller;

import com.arcengtr.studentManagementApp.exception.NotUniqueEmailException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotUniqueEmailException.class)
    public ResponseEntity<String> handleNotUniqueEmailException(NotUniqueEmailException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}
