package com.gl.lms.service;

import com.gl.lms.dto.*;
import com.gl.lms.entity.*;
import com.gl.lms.exception.LibraryManagementSystemException;
import com.gl.lms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public  class LibraryManagementSystemServiceImpl implements LibraryManagementSystemService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private AuthorsRepository authorsRepository;

    @Autowired
    private BooksRepository booksRepository;

    @Autowired
    private LibraryCardsRepository libraryCardsRepository;

    @Autowired
    private ReviewsRepository reviewsRepository;

    @Override
    public ResponseDTO addUserAndIssueLibraryCard(UsersDTO usersDTO) throws LibraryManagementSystemException {

      Users user =  usersRepository.findByEmail(usersDTO.getEmail());

      if(user != null){

          throw new LibraryManagementSystemException("User already exists");
      }

       user = new Users();
//      user.setId(usersDTO.getId());
      user.setName(usersDTO.getName());
      user.setEmail(usersDTO.getEmail());

      LibraryCards libraryCards = new LibraryCards();
      libraryCards.setIssueDate(usersDTO.getLibraryCardsDTO().getIssueDate());
      libraryCards.setExpiryDate(usersDTO.getLibraryCardsDTO().getExpiryDate());

      user.setLibraryCards(libraryCards);

      usersRepository.save(user);

      ResponseDTO responseDTO = new ResponseDTO();
      responseDTO.setMessage("User added Successfully"+ user.getId() + " and library card issued with library id "+ user.getLibraryCards().getId());
        return responseDTO;
    }

    @Override
    public UsersDTO fetchUserAndIssuedLibraryCardByEmail(String email) throws LibraryManagementSystemException {

        Users user =  usersRepository.findByEmail(email);

        if(user == null){

            throw new LibraryManagementSystemException("User does not exists");
        }

        UsersDTO usersDTO = new UsersDTO();

        usersDTO.setId(user.getId());
        usersDTO.setName(user.getName());
        usersDTO.setEmail(user.getEmail());

        LibraryCardsDTO libraryCardsDTO = new LibraryCardsDTO();
        libraryCardsDTO.setId((user.getLibraryCards().getId()));
        libraryCardsDTO.setIssueDate(user.getLibraryCards().getIssueDate());
        libraryCardsDTO.setExpiryDate(user.getLibraryCards().getExpiryDate());

        usersDTO.setLibraryCardsDTO(libraryCardsDTO);

        return usersDTO;
    }

    @Override
    public ResponseDTO updateName(String email, String updatedName) throws LibraryManagementSystemException {

//        UsersDTO usersDTO = new UsersDTO();
        Users user =  usersRepository.findByEmail(email);
        if(user == null) {

            throw new LibraryManagementSystemException("User does not exists");
        }
//        user = new Users();
        user.setName(updatedName);

        usersRepository.save(user);

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setMessage("User updated Successfully");
        return responseDTO;


    }

    @Override
    public ResponseDTO deleteUserAndAssociatedLibraryCard(String email) throws LibraryManagementSystemException {

//        UsersDTO usersDTO = new UsersDTO();

        Users user =  usersRepository.findByEmail(email);

        if(user == null){

            throw new LibraryManagementSystemException("User does not exists");
        }

//        usersRepository.deleteById(user.getId());
        usersRepository.delete(user);

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setMessage("User deleted Successfully");
        return responseDTO;

    }

    @Override
    public ResponseDTO addAuthorAndBooks(AuthorsDTO authorsDTO) throws LibraryManagementSystemException {

        Authors authors=authorsRepository.findByName(authorsDTO.getName());
        if(authors!=null){
            throw new LibraryManagementSystemException("Author Already Exists");
        }
        authors=new Authors();
        authors.setName(authorsDTO.getName());

        List<Books> ListOfBooks=new ArrayList<>();


        for(BooksDTO booksDTO : authorsDTO.getBooksDTOS()){
            Books book = new Books();
            book.setTitle(booksDTO.getTitle());
            ListOfBooks.add(book);
        }

        authors.setBooks(ListOfBooks);
        authorsRepository.save(authors);

        ResponseDTO responseDTO=new ResponseDTO();
        responseDTO.setMessage("Author Added Successfully with its Books");
        return responseDTO;
    }

    @Override
    public ResponseDTO addBook(String authorName, BooksDTO booksDTO) throws LibraryManagementSystemException {

        Authors author = authorsRepository.findByName(authorName);
        if (author == null) {
            throw new LibraryManagementSystemException("Author not found");
        }

        Books existingBook = booksRepository.findByTitle(booksDTO.getTitle());
        if (existingBook != null) {
            throw new LibraryManagementSystemException("Book already exists");
        }

        Books book = new Books();
        book.setTitle(booksDTO.getTitle());

        List<Books> authorBooks = author.getBooks();
        if (authorBooks == null) {
            authorBooks = new ArrayList<>();
        }
        authorBooks.add(book);
        author.setBooks(authorBooks);

        authorsRepository.save(author);

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setMessage("Book added Successfully under Author: " + authorName);
        return responseDTO;
    }

    @Override
    public ResponseDTO addReviews(String title, ReviewsDTO reviewsDTO) throws LibraryManagementSystemException {

        Books books = booksRepository.findByTitle(title);

        if (books == null) {
            throw new LibraryManagementSystemException("Book not found");
        }


        Reviews reviews = new Reviews();
        reviews.setRating(reviewsDTO.getRating());
        reviews.setComment(reviewsDTO.getComment());
        reviews.setBook(books);

        reviewsRepository.save(reviews);

        ResponseDTO responseDTO=new ResponseDTO();
        responseDTO.setMessage("Review Added Successfully with  Book");
        return responseDTO;
    }

    @Override
    public List<ReviewsDTO> fetchBookDetailsAndReviews(String title) throws LibraryManagementSystemException {

        Books books = booksRepository.findByTitle(title);

        if (books == null) {
            throw new LibraryManagementSystemException("Book not found");
        }

        List<Reviews> reviewsList = reviewsRepository.findByBook(books);
        List<ReviewsDTO > reviewsDTOList = new ArrayList<>();

        for(Reviews reviews : reviewsList){
            ReviewsDTO reviewsDTO = new ReviewsDTO();

            reviewsDTO.setId(reviews.getId());
            reviewsDTO.setRating(reviews.getRating());
            reviewsDTO.setComment(reviews.getComment());

            BooksDTO booksDTO = new BooksDTO();

            booksDTO.setId(reviews.getBook().getId());
            booksDTO.setTitle(reviews.getBook().getTitle());
            reviewsDTO.setBooksDTO(booksDTO);


            reviewsDTOList.add(reviewsDTO);
        }


        return reviewsDTOList;
    }

    @Override
        public ResponseDTO deleteBookAndAssociatedReviews(String title) throws LibraryManagementSystemException {
            Books books = booksRepository.findByTitle(title);

        if (books == null) {
            throw new LibraryManagementSystemException("Book not found");
        }


        reviewsRepository.deleteAll( reviewsRepository.findByBook(books));;
        booksRepository.delete(books);


        ResponseDTO responseDTO=new ResponseDTO();
        responseDTO.setMessage("Deleted  Successfully ");
        return responseDTO;
    }

    @Override
    public List<UsersDTO> fetchAllUsers() throws LibraryManagementSystemException {

        List<Users> usersList = usersRepository.findAll();
        List<UsersDTO> usersDTOList = new ArrayList<>();

        for (Users user : usersList) {

            UsersDTO usersDTO = new UsersDTO();
            usersDTO.setId(user.getId());
            usersDTO.setName(user.getName());
            usersDTO.setEmail(user.getEmail());

            LibraryCardsDTO libraryCardsDTO = new LibraryCardsDTO();
            libraryCardsDTO.setId(user.getLibraryCards().getId());
            libraryCardsDTO.setIssueDate(user.getLibraryCards().getIssueDate());
            libraryCardsDTO.setExpiryDate(user.getLibraryCards().getExpiryDate());

            usersDTO.setLibraryCardsDTO(libraryCardsDTO);
            usersDTOList.add(usersDTO);
        }

        return usersDTOList;
    }

    @Override
    public List<BooksDTO> fetchAllBooks() throws LibraryManagementSystemException {

        List<Books> booksList = booksRepository.findAll();
        List<BooksDTO> booksDTOList = new ArrayList<>();

        Map<String, String> titleToAuthor = new HashMap<>();
        for (Authors author : authorsRepository.findAll()) {
            for (Books book : author.getBooks()) {
                titleToAuthor.put(book.getTitle(), author.getName());
            }
        }

        for (Books book : booksList) {

            BooksDTO booksDTO = new BooksDTO();
            booksDTO.setId(book.getId());
            booksDTO.setTitle(book.getTitle());
            booksDTO.setAuthorName(titleToAuthor.getOrDefault(book.getTitle(), "Unknown"));
            booksDTOList.add(booksDTO);
        }

        return booksDTOList;
    }

    @Override
    public List<ReviewsDTO> fetchAllReviews() throws LibraryManagementSystemException {

        List<Reviews> reviewsList = reviewsRepository.findAll();
        List<ReviewsDTO> reviewsDTOList = new ArrayList<>();

        for (Reviews review : reviewsList) {

            ReviewsDTO reviewsDTO = new ReviewsDTO();
            reviewsDTO.setId(review.getId());
            reviewsDTO.setRating(review.getRating());
            reviewsDTO.setComment(review.getComment());

            BooksDTO booksDTO = new BooksDTO();
            booksDTO.setId(review.getBook().getId());
            booksDTO.setTitle(review.getBook().getTitle());
            reviewsDTO.setBooksDTO(booksDTO);

            reviewsDTOList.add(reviewsDTO);
        }

        return reviewsDTOList;
    }
}
