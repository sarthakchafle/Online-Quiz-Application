package com.MFPE.QuizService.QuizService.repository;

import com.MFPE.QuizService.QuizService.models.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer,Long>{
    boolean existsByAnsId(long id);
}
