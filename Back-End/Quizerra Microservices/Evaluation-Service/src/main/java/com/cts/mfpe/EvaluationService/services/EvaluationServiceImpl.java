package com.cts.mfpe.EvaluationService.services;

import com.cts.mfpe.EvaluationService.Exception.EvaluationException;
import com.cts.mfpe.EvaluationService.Repository.EvaluateAnswerRepository;
import com.cts.mfpe.EvaluationService.models.UserScore;
import com.cts.mfpe.EvaluationService.payload.Request.EvaluateAnswerRequest;
import com.cts.mfpe.EvaluationService.services.Feign.QuizCommunication;
import com.cts.mfpe.EvaluationService.services.Feign.UserCommunication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class EvaluationServiceImpl implements EvaluationService {

    Logger logger = LoggerFactory.getLogger(EvaluationServiceImpl.class);
    int count = 0;
    @Autowired
    EvaluateAnswerRepository evaluateAnswerRepository;

    @Autowired
    QuizCommunication quizCommunication;

    @Autowired
    UserCommunication userCommunication;

    @Autowired
    UserScore userScoreObj;
    
    @Override
    public void startEvaluation(EvaluateAnswerRequest evaluateAnswerRequest, Map<String, Map<Long, Integer>> userScore, Map<Long, Integer> questionScoreMap, int length, Map<Long, Boolean> result) throws EvaluationException {
        logger.info(String.valueOf(evaluateAnswerRequest));
        if (userCommunication.ifExists(evaluateAnswerRequest.getUser_id()) && quizCommunication.ifExistsQuiz(evaluateAnswerRequest.getQuiz_id()) && quizCommunication.ifExistsAnswer(evaluateAnswerRequest.getAnswer_id())) {
            count++;

            long questionId = quizCommunication.getQuestionFromAnswer(evaluateAnswerRequest.getAnswer_id());
            long correctAnswerId = quizCommunication.getCorrectAnswerByQuestionId(questionId);
            long quizId = quizCommunication.getQuizByQuestion(questionId);
            long questionIdFromAnswer = quizCommunication.getQuestionFromAnswer(correctAnswerId);
            boolean isCorrect = (evaluateAnswerRequest.getAnswer_id() == correctAnswerId && evaluateAnswerRequest.getQuiz_id() == quizId && questionIdFromAnswer == questionId);
            System.out.println(isCorrect);
            logger.info("all attributes are correct");
            result.put(questionIdFromAnswer, isCorrect);
            String userId = evaluateAnswerRequest.getUser_id();

            if (isCorrect) {
                questionScoreMap.put(quizId, questionScoreMap.getOrDefault(quizId, 0) + 1);
            } else {
                questionScoreMap.put(quizId, questionScoreMap.getOrDefault(quizId, 0));
            }
            userScore.put(evaluateAnswerRequest.getUser_id(), questionScoreMap);
            logger.info(String.valueOf(userScore));

            for (Map.Entry<String, Map<Long, Integer>> entry : userScore.entrySet()) {
                String user_Id = entry.getKey();
                Map<Long, Integer> quiz_map = entry.getValue();
                for (Long e : quiz_map.keySet()) {
                    Long quiz_id = e;
                    int score = quiz_map.get(e);
//                    System.out.println(user_Id + " " + quiz_id + " " + score);
                    logger.info("userId -> " + user_Id + "quizId -> " + quiz_id + "score -> " + score);
                    if (count == length) {
                        userScoreObj.setUser_id(evaluateAnswerRequest.getUser_id());
                        userScoreObj.setQuiz_id(evaluateAnswerRequest.getQuiz_id());
                        userScoreObj.setScore(score);
                        logger.info(String.valueOf(userScoreObj));
                        evaluateAnswerRepository.save(userScoreObj);
                        count = 0;
                    }
                }
            }
        } else {
            logger.error("Exception occurred");
            throw new EvaluationException();
        }
    }
}
