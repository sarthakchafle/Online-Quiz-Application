package com.cts.MFPE.Answer_Service.services;

import com.cts.MFPE.Answer_Service.Exception.SavingAnswerException;

public interface AnswerService {
    void saveAnswer(String userId,long answerId,long quizId) throws SavingAnswerException;
}
