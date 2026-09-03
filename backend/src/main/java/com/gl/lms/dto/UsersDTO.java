package com.gl.lms.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class UsersDTO {

    private Integer id;
//    @NotNull(message = "Name should not be null")
    @NotBlank(message = "name should not be null")
    @NotBlank(message = "Name should not be blank")
    @Pattern(regexp = "[A-Za-z]+(\\s[A-Za-z]+)+", message = "Name should contain at least 2 words")
    private String name;

    @Email(message = "Email should be in valid format")
    private String email;

    @NotNull(message = "LibraryCardsDTO should not be null ")
    @Valid
    private LibraryCardsDTO libraryCardsDTO;
}
