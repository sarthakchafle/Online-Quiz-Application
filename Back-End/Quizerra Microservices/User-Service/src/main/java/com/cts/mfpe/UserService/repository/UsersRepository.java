package com.cts.mfpe.UserService.repository;

import com.cts.mfpe.UserService.data.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends CrudRepository<UserEntity, Long> {
    UserEntity findByEmail(String email);

    UserEntity findByUserId(String userId);

    Boolean existsByUserId(String id);
}
