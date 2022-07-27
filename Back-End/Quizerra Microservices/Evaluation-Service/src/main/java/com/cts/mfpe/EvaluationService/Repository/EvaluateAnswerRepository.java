package com.cts.mfpe.EvaluationService.Repository;

import com.cts.mfpe.EvaluationService.models.UserScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface EvaluateAnswerRepository extends JpaRepository<UserScore,Long> {

    @Modifying
    @Transactional
    @Query(value = "insert into user_score values (:quizId,:score,:userId)",nativeQuery = true)
    void saveScore(long quizId,int score,String userId);

    @Query(value = "select sum(score) from user_score where user_id=:userId and quiz_id=:quizId",nativeQuery = true)
    int findByUserIdAndQuizId(String userId,long quizId);
}
