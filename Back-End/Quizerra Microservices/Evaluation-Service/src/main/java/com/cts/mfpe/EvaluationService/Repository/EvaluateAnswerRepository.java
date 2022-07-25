package com.cts.mfpe.EvaluationService.Repository;

import com.cts.mfpe.EvaluationService.models.UserScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluateAnswerRepository extends JpaRepository<UserScore,Long> {

    @Query(value = "Select * from user_score where user_id=:userId and quiz_id=:quizId",nativeQuery = true)
    UserScore findByUserIdAndQuizId(String userId,long quizId);
}
