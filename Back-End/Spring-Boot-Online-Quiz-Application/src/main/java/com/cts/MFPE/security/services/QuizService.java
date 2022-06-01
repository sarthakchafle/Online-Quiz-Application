package com.cts.MFPE.security.services;

import com.cts.MFPE.models.quizData.Quiz;
import com.cts.MFPE.payload.response.QuestionAnswerResponse;

import java.util.List;

public interface QuizService {
    public Quiz saveQuiz(Quiz quiz);
    public List<Quiz> getAllQuizzes();

    public Quiz findByTitle(String title);
    public Boolean existsByTitle(String title);

    public List<String> getAllQuizzesByTitle();

    public List<QuestionAnswerResponse> getQuestionAnswer(String title);
}
