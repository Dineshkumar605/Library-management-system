package com.gl.lms.repository;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gl.lms.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Integer> {

    public Users findByEmail(String email);

}
