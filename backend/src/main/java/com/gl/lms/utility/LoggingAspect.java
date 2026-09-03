package com.gl.lms.utility;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LoggingAspect {

    private static final Log LOGGER = LogFactory.getLog(LoggingAspect.class);

//    For single method implementation
//    @AfterThrowing(pointcut = "execution(public com.gl.lms.service.LibraryManagementSystemServiceImpl" +
//            ".addUserAndIssueLibraryCard(UsersDTO usersDTO))", throwing = "exception")

//    For all the methods
    @AfterThrowing(pointcut = "execution(* com.gl.lms.service.*Impl" +
            ".*(..))", throwing = "exception")

    public void logException(Exception exception){
        LOGGER.error(exception);
    }


}
