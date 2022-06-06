package com.cts.MFPE.security.services;

import com.cts.MFPE.models.quizData.Quiz;
import com.cts.MFPE.payload.response.QuestionAnswerResponse;
import com.cts.MFPE.payload.response.QuizTitleResponse;

import java.util.List;

public interface QuizService {
     Quiz saveQuiz(Quiz quiz);
    List<Quiz> getAllQuizzes();

    Quiz findByTitle(String title);
    Boolean existsByTitle(String title);

   List<QuizTitleResponse> getAllQuizzesByTitle();

    List<QuestionAnswerResponse> getQuestionAnswer(String title);

    long getQuestionByAnswerId(long ans_id);

    long getCorrectAnswerByQuestionId(long ques_id);
    long getQuizByQuestionId(long ques_id);

}
