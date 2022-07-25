package com.cts.mfpe.EvaluationService.services;

import com.cts.mfpe.EvaluationService.Exception.EvaluationException;
import com.cts.mfpe.EvaluationService.payload.Request.EvaluateAnswerRequest;

import java.util.HashMap;
import java.util.Map;

public interface EvaluationService {
    void startEvaluation(EvaluateAnswerRequest evaluateAnswerRequest, Map<String, Map<Long, Integer>> userScore, Map<Long, Integer> questionScoreMap, int length, Map<Long, Boolean> result) throws EvaluationException;
}
