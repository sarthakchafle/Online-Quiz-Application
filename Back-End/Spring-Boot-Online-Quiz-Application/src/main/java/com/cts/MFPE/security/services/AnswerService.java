package com.cts.MFPE.security.services;

import com.cts.MFPE.payload.request.UserAnswerRequest;


public interface AnswerService {
    public void saveAnswer(long user_id,long answer_id);

}
