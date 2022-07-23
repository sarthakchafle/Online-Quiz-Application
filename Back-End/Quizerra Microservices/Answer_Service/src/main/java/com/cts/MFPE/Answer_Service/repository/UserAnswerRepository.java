package com.cts.MFPE.Answer_Service.repository;

import com.cts.MFPE.Answer_Service.models.UserAnswer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserAnswerRepository extends JpaRepository<UserAnswer,Long> {
    @Modifying
    @Query(value = "insert into user_answer values(:user_id,:answer_id,:quiz_id) ",nativeQuery = true)
    @Transactional
    public void saveAnswer(@Param("user_id") String user_id, @Param("answer_id") long answer_id,@Param("quiz_id") long quiz_id);

    @Query(value="select distinct quiz_id from user_answer where user_id=:user_id", nativeQuery=true)
    public List<Long> getAllAttemptedQuizByUser(String user_id);
}
