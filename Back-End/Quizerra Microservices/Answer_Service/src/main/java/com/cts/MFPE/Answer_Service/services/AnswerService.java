package com.cts.MFPE.Answer_Service.services;

import java.util.List;

import com.cts.MFPE.Answer_Service.Exception.SavingAnswerException;

public interface AnswerService {
    void saveAnswer(String userId,long answerId,long quizId) throws SavingAnswerException;
    public List<Long> getAllAttemptedQuizByUser(String user_id);
}
