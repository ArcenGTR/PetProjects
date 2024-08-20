package com.arcengtr.studentManagementApp.exception;

public class NotUniqueEmailException extends RuntimeException{
    public NotUniqueEmailException(String message){
        super(message);
    }
}
