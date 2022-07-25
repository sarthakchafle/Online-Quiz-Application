package com.cts.MFPE.Answer_Service.services;

import java.util.List;

import com.cts.MFPE.Answer_Service.Exception.SavingAnswerException;
import com.cts.MFPE.Answer_Service.payload.response.QuizTitleResponse;

public interface AnswerService {
    void saveAnswer(String userId,long answerId,long quizId) throws SavingAnswerException;
    public List<QuizTitleResponse> getAllAttemptedQuizByUser(String user_id);
}
