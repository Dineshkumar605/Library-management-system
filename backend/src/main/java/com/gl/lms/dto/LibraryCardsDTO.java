package com.gl.lms.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class LibraryCardsDTO {

    private Integer id;

    @FutureOrPresent(message = "Issue date should be of present or future")
    private LocalDate issueDate;

    @Future(message = "Expiry date should be in future")
    private LocalDate expiryDate;

}
