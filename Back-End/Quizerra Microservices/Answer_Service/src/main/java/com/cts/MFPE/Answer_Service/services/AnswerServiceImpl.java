package com.cts.MFPE.Answer_Service.services;

import com.cts.MFPE.Answer_Service.Exception.SavingAnswerException;
import com.cts.MFPE.Answer_Service.models.UserAnswer;
import com.cts.MFPE.Answer_Service.payload.response.QuizTitleResponse;
import com.cts.MFPE.Answer_Service.repository.UserAnswerRepository;
import com.cts.MFPE.Answer_Service.services.feign.AnswerCommunication;
import com.cts.MFPE.Answer_Service.services.feign.UserCommunication;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnswerServiceImpl implements AnswerService {
Logger logger = LoggerFactory.getLogger(AnswerServiceImpl.class);
    @Autowired
    UserAnswerRepository userAnswerRepository;

    @Autowired
    UserCommunication userCommunication;

    @Autowired
    AnswerCommunication answerCommunication;

    boolean isUser = false;
    boolean isAnswer = false;
    boolean isQuiz = false;


    @Override
    public void saveAnswer(String userId, long answerId,long quizId) throws SavingAnswerException {
        isUser = userCommunication.ifExists(userId);
        isAnswer = answerCommunication.ifExistsAnswer(answerId);
        if(!isAnswer && answerId==-1){
            isAnswer=true;
        }
        isQuiz = answerCommunication.ifExistsQuiz(quizId);
        logger.info("UserId exists="+isUser);
        logger.info("AnswerId exists="+isAnswer);
        logger.info("QuizId exists="+isQuiz);
        if (isUser && isAnswer && isQuiz) {
            System.out.println("yes");
            UserAnswer userAnswer = new UserAnswer();
            userAnswer.setUserId(userId);
            userAnswer.setAnswerId(answerId);
            userAnswer.setQuizId(quizId);
            userAnswerRepository.save(userAnswer);
            logger.info("User response saved");
        } else {
            throw new SavingAnswerException();
        }
    }
    @Override
	public List<QuizTitleResponse> getAllAttemptedQuizByUser(String user_id) {
		return userAnswerRepository.getAllAttemptedQuizByUser(user_id);
	}
}
