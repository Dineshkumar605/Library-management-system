package com.gl.lms.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReviewsDTO {

    private Integer id;

    @Min(value = 1, message = "Rating must be at-least 1")
    @Max(value = 5, message = "Rating must me at most 5")
    private Integer rating;

    @NotBlank(message = "Comment should not be null or blank")
    private String comment;

    @NotNull(message = "Books can not be null")
    @Valid
    private BooksDTO booksDTO;

}
