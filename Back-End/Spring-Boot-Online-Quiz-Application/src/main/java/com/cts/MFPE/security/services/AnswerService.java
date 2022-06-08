package com.cts.MFPE.security.services;

import com.cts.MFPE.payload.request.EvaluateAnswerRequest;

import java.util.Map;


public interface AnswerService {
    void saveAnswer(long user_id, long answer_id);

    void startEvaluation(EvaluateAnswerRequest evaluateAnswerRequest, Map<Long, Map<Long, Integer>> userScore, Map<Long, Integer> questionScoreMap,int length);

    long getQuestionByAnswerId(long ans_id);

    long getCorrectAnswerByQuestionId(long ques_id);

    long getQuizByQuestionId(long ques_id);

    long getQuestionIdFromAnswer(long ans_id);

    void storeScore(long user_id,long quiz_id,int score);

}
