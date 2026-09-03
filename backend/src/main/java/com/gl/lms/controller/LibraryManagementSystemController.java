package com.gl.lms.controller;

import com.gl.lms.dto.AuthorsDTO;
import com.gl.lms.dto.BooksDTO;
import com.gl.lms.dto.ResponseDTO;
import com.gl.lms.dto.ReviewsDTO;
import com.gl.lms.dto.UsersDTO;
import com.gl.lms.exception.LibraryManagementSystemException;
import com.gl.lms.service.LibraryManagementSystemService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/LMS")
@CrossOrigin
@Validated

public class LibraryManagementSystemController {

  @Autowired
  public LibraryManagementSystemService libraryManagementSystemService;

    @PostMapping("/add-user-and-issue-library-card")
    public ResponseEntity<ResponseDTO> addUserAndIssueLibraryCard(@RequestBody @Valid UsersDTO usersDTO) throws  LibraryManagementSystemException{

        ResponseDTO responseDTO = libraryManagementSystemService.addUserAndIssueLibraryCard(usersDTO);

        return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.CREATED);
    }


    @GetMapping(value="/fetch-user-and-issued-library-card/{email}")
    public ResponseEntity<UsersDTO> fetchUserAndIssuedLibraryCardByEmail(@PathVariable @Email(message = "Email should be in valid format") String email) throws LibraryManagementSystemException{

        UsersDTO usersDTO = libraryManagementSystemService.fetchUserAndIssuedLibraryCardByEmail(email);

        return new ResponseEntity<>(usersDTO, HttpStatus.OK);
    }

    @PutMapping(value = "update-name/{email}/{updatedName}")
    public ResponseEntity<ResponseDTO> updateName(@PathVariable   @Email(message = "Email should be in valid format") String email, @PathVariable   @NotBlank(message = "name should not be null") String updatedName) throws LibraryManagementSystemException{

        ResponseDTO responseDTO = libraryManagementSystemService.updateName(email, updatedName);

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @DeleteMapping("delete-user/{email}")
    public ResponseEntity<ResponseDTO> deleteUserAndAssociatedLibraryCard(@PathVariable   @Email(message = "Email should be in valid format") String email) throws LibraryManagementSystemException{

        ResponseDTO responseDTO = libraryManagementSystemService.deleteUserAndAssociatedLibraryCard(email);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @PostMapping(value = "add-author-and-books")
    public ResponseEntity<ResponseDTO> addAuthorAndBooks(@RequestBody @Valid AuthorsDTO authorsDTO) throws LibraryManagementSystemException{

        ResponseDTO responseDTO = libraryManagementSystemService.addAuthorAndBooks(authorsDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @PostMapping(value = "/add-book/{authorName}")
    public ResponseEntity<ResponseDTO> addBook(@PathVariable @NotBlank(message = "Author name should not be null or blank") String authorName, @RequestBody @Valid BooksDTO booksDTO) throws LibraryManagementSystemException {

        ResponseDTO responseDTO = libraryManagementSystemService.addBook(authorName, booksDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @PostMapping(value = "/add-reviews/{title}")
    public ResponseEntity<ResponseDTO> addReviews(@PathVariable  @NotBlank(message = "Title should not be null or blank") String title,@RequestBody @Valid ReviewsDTO reviewsDTO) throws LibraryManagementSystemException {

        ResponseDTO responseDTO = libraryManagementSystemService.addReviews(title, reviewsDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @GetMapping(value ="/fetchBookDetailsAndReviews/{title}" )
    public ResponseEntity<List<ReviewsDTO>> fetchBookDetailsAndReviews(@PathVariable  @NotBlank(message = "Title should not be null or blank") String title) throws LibraryManagementSystemException {

        List<ReviewsDTO> reviewsdto = libraryManagementSystemService.fetchBookDetailsAndReviews(title);
        return new ResponseEntity<>(reviewsdto, HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete-book/{title}")
    public ResponseEntity<ResponseDTO> deleteBookAndAssociatedReviews(@PathVariable  @NotBlank(message = "Title should not be null or blank") String title) throws LibraryManagementSystemException {
        ResponseDTO responseDTO = libraryManagementSystemService.deleteBookAndAssociatedReviews(title);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @GetMapping(value = "/fetch-all-users")
    public ResponseEntity<List<UsersDTO>> fetchAllUsers() throws LibraryManagementSystemException {

        List<UsersDTO> usersDTOList = libraryManagementSystemService.fetchAllUsers();
        return new ResponseEntity<>(usersDTOList, HttpStatus.OK);
    }

    @GetMapping(value = "/fetch-all-books")
    public ResponseEntity<List<BooksDTO>> fetchAllBooks() throws LibraryManagementSystemException {

        List<BooksDTO> booksDTOList = libraryManagementSystemService.fetchAllBooks();
        return new ResponseEntity<>(booksDTOList, HttpStatus.OK);
    }

    @GetMapping(value = "/fetch-all-reviews")
    public ResponseEntity<List<ReviewsDTO>> fetchAllReviews() throws LibraryManagementSystemException {

        List<ReviewsDTO> reviewsDTOList = libraryManagementSystemService.fetchAllReviews();
        return new ResponseEntity<>(reviewsDTOList, HttpStatus.OK);
    }

    @PostMapping(value = "/demo/add")
    public ResponseEntity<ResponseDTO> addDemoData() throws LibraryManagementSystemException {
        ResponseDTO responseDTO = libraryManagementSystemService.addDemoData();
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/demo/clear")
    public ResponseEntity<ResponseDTO> clearDemoData() throws LibraryManagementSystemException {
        ResponseDTO responseDTO = libraryManagementSystemService.clearDemoData();
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    }
