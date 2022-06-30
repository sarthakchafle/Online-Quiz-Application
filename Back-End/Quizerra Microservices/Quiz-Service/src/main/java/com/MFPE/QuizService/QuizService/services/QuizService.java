package com.MFPE.QuizService.QuizService.services;

import com.MFPE.QuizService.QuizService.models.Quiz;
import com.MFPE.QuizService.QuizService.payload.response.QuestionAnswerResponse;
import com.MFPE.QuizService.QuizService.payload.response.QuizTitleResponse;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface QuizService {
     Quiz saveQuiz(Quiz quiz);
    List<Quiz> getAllQuizzes();

    Quiz findByTitle(String title);
    Boolean existsByTitle(String title);

    boolean existsByQuizId(long quizId);
   List<QuizTitleResponse> getAllQuizzesByTitle();

    List<QuestionAnswerResponse> getQuestionAnswer(String title);

    long getQuestionByAnswer(long ansId);
    long getCorrectAnswerByQuestionId(long quesId);

    long getQuizByQuestion(long quesId);

}
