package com.gl.lms.service;

import com.gl.lms.dto.*;

import com.gl.lms.exception.LibraryManagementSystemException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ResourceBundle;


public interface LibraryManagementSystemService {

    public ResponseDTO addUserAndIssueLibraryCard(UsersDTO usersDTO) throws LibraryManagementSystemException;

    public UsersDTO fetchUserAndIssuedLibraryCardByEmail(String email) throws LibraryManagementSystemException;

    public ResponseDTO updateName(String email, String updatedName) throws LibraryManagementSystemException;

    public ResponseDTO deleteUserAndAssociatedLibraryCard(String email) throws LibraryManagementSystemException;

    public ResponseDTO addAuthorAndBooks(AuthorsDTO authorsDTO) throws LibraryManagementSystemException;

    public ResponseDTO addBook(String authorName, BooksDTO booksDTO) throws LibraryManagementSystemException;

    public ResponseDTO addReviews(String title, ReviewsDTO reviewsDTO) throws LibraryManagementSystemException;

    public List<ReviewsDTO> fetchBookDetailsAndReviews(String title) throws LibraryManagementSystemException;

    public List<ReviewsDTO> fetchAllReviews() throws LibraryManagementSystemException;

    public ResponseDTO deleteBookAndAssociatedReviews(String title) throws LibraryManagementSystemException;

    public List<UsersDTO> fetchAllUsers() throws LibraryManagementSystemException;

    public List<BooksDTO> fetchAllBooks() throws LibraryManagementSystemException;

    public ResponseDTO addDemoData() throws LibraryManagementSystemException;

    public ResponseDTO clearDemoData() throws LibraryManagementSystemException;
}
