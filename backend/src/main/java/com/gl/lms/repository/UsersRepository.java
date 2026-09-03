package com.gl.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gl.lms.entity.Users;

import java.util.List;

public interface UsersRepository extends JpaRepository<Users, Integer> {

    public Users findByEmail(String email);

    public List<Users> findByIsDemo(boolean isDemo);

}
