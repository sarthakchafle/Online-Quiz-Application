package com.cts.MFPE.Answer_Service.repository;

import com.cts.MFPE.Answer_Service.models.UserAnswer;
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
}
