package com.gl.lms.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BooksDTO {

    private Integer id;

    @NotBlank(message = "Title should not be null or blank")
    private String title;

    private String authorName;
}
