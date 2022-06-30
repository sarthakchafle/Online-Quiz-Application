package com.cts.mfpe.EvaluationService.Repository;

import com.cts.mfpe.EvaluationService.models.UserScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluateAnswerRepository extends JpaRepository<UserScore,Long> {

}
