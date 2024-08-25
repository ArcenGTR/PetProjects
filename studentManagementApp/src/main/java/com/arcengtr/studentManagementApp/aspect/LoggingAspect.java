package com.arcengtr.studentManagementApp.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Aspect
@Component
public class LoggingAspect {

    private Logger logger = Logger.getLogger(getClass().getName());

    @Pointcut("execution(* com.arcengtr.studentManagementApp.controller.*.*(..))")
    public void forControllerPackage() {}

    @Pointcut("execution(* com.arcengtr.studentManagementApp.entity.*.*(..))")
    public void forEntityPackage() {}

    @Pointcut("execution(* com.arcengtr.studentManagementApp.service.*.*(..))")
    public void forServicePackage() {}

    @Pointcut("forControllerPackage() || forEntityPackage() || forServicePackage()")
    public void forAppFlow() {}

    @Before("forAppFlow()")
    public void before(JoinPoint joinPoint) {

        String method = joinPoint.getSignature().toShortString();
        logger.info("=======> in @Before calling method: "  + method);

        Object[] args = joinPoint.getArgs();
        for (Object arg : args) {
            logger.info("== arg:" + arg.toString());
        }


    }


}
