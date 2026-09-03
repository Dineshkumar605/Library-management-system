package com.gl.lms.repository;

import com.gl.lms.entity.Books;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BooksRepository  extends JpaRepository<Books, Integer> {
    //find
    //findAll
    //findById
    //delete
    //deleteAll
    //deleteByTitle
    //deleteById
    //save -> insert, update

     Books findByTitle(String bookTitle);

     List<Books> findByIsDemo(boolean isDemo);

}
