package com.cts.MFPE.repository;

import java.util.Optional;

import com.cts.MFPE.payload.request.UserAnswerRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cts.MFPE.models.User;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);


  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);

  @Modifying
  @Query(value = "insert into user_answers values(:user_id,:answer_id) ",nativeQuery = true)
  @Transactional
  public void storeAnswer(@Param("user_id") long user_id,@Param("answer_id") long answer_id);
}
