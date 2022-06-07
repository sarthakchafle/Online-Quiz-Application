package com.cts.MFPE.security.services;

import com.cts.MFPE.payload.request.EvaluateAnswerRequest;
import com.cts.MFPE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RestTemplate restTemplate;

    @Override
    public void saveAnswer(long user_id, long answer_id) {
        userRepository.storeAnswer(user_id, answer_id);
    }

    @Override
    public long getQuestionByAnswerId(long ans_id) {
        return userRepository.getQuestionByAnswerId(ans_id);
    }

    @Override
    public long getCorrectAnswerByQuestionId(long ques_id) {
        return userRepository.getCorrectAnswerByQuestionId(ques_id);
    }

    @Override
    public long getQuizByQuestionId(long ques_id) {
        return userRepository.getQuizByQuestionId(ques_id);
    }

    @Override
    public long getQuestionIdFromAnswer(long ans_id) {
        return userRepository.getQuestionIdFromAnswer(ans_id);
    }

    @Override
    public void startEvaluation(EvaluateAnswerRequest evaluateAnswerRequest,Map<Long, Map<Long,Integer>> userScore,Map<Long,Integer> questionScoreMap) {


        long questionId = this.getQuestionByAnswerId(evaluateAnswerRequest.getAnswer_id());
        long correctAnswerId = this.getCorrectAnswerByQuestionId(questionId);
        long quizId = this.getQuizByQuestionId(questionId);
        long questionIdFromAnswer = this.getQuestionIdFromAnswer(correctAnswerId);
        boolean isCorrect =(evaluateAnswerRequest.getAnswer_id() == correctAnswerId && evaluateAnswerRequest.getQuiz_id()==quizId && questionIdFromAnswer==questionId);
        System.out.println(isCorrect);

            long userId = evaluateAnswerRequest.getUser_id();

        if(isCorrect){
            questionScoreMap.put(quizId,questionScoreMap.getOrDefault(quizId,0)+1);
        }else{
            questionScoreMap.put(quizId, questionScoreMap.getOrDefault(quizId, 0));
        }
        userScore.put(evaluateAnswerRequest.getUser_id(),questionScoreMap);
        System.out.println(userScore);

    }


}

