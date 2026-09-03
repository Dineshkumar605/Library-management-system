package com.gl.lms.dto;

import com.gl.lms.entity.Books;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
public class AuthorsDTO {
    private Integer id;

    @NotNull(message = "Name should not be null")

    @NotBlank(message = "Name should not be blank")
    @Pattern(regexp = "[A-Za-z]+(\\s[A-Za-z]+)+", message = "Name should contain at least 2 words")
    private String name;

    @NotEmpty(message = "Books should not be null or empty")
    @Valid
    private List<BooksDTO> booksDTOS;

}

