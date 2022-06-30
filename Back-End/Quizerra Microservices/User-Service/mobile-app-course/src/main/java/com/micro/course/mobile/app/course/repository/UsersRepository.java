package com.micro.course.mobile.app.course.repository;

import com.micro.course.mobile.app.course.data.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends CrudRepository<UserEntity,Long> {
    UserEntity findByEmail(String email);

    UserEntity findByUserId(String userId);

    Boolean existsByUserId(String id);
}
