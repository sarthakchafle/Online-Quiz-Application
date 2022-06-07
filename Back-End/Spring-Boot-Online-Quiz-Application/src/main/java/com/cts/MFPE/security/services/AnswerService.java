package com.cts.MFPE.security.services;

import com.cts.MFPE.payload.request.EvaluateAnswerRequest;
import com.cts.MFPE.payload.request.UserAnswerRequest;
import com.cts.MFPE.payload.response.QuestionAnswerResponse;

import java.util.List;
import java.util.Map;


public interface AnswerService {
    public void saveAnswer(long user_id,long answer_id);
    public void startEvaluation(EvaluateAnswerRequest evaluateAnswerRequest, Map<Long, Map<Long,Integer>> userScore,Map<Long,Integer> questionScoreMap);
    long getQuestionByAnswerId(long ans_id);

    long getCorrectAnswerByQuestionId(long ques_id);
    long getQuizByQuestionId(long ques_id);

    long getQuestionIdFromAnswer(long ans_id);

}
