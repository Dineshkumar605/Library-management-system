package com.gl.lms.utility;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Error {

    private List<String> message;

    private String statusCode;

    private LocalDateTime timeStamp;



}
