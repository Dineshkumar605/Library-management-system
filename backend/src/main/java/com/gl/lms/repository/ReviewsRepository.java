package com.gl.lms.repository;

import com.gl.lms.entity.Books;
import com.gl.lms.entity.Reviews;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface ReviewsRepository extends JpaRepository<Reviews, Integer> {
    public List<Reviews> findByBook(Books book);
}
