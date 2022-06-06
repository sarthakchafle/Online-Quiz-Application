package com.cts.MFPE.security.services;

import com.cts.MFPE.models.quizData.Quiz;
import com.cts.MFPE.payload.response.QuestionAnswerResponse;
import com.cts.MFPE.payload.response.QuizTitleResponse;
import com.cts.MFPE.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    public Quiz saveQuiz(Quiz quiz) {
        quizRepository.save(quiz);
        return quiz;
    }

    @Override
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    @Override
    public Quiz findByTitle(String title) {
        return quizRepository.findByTitle(title);
    }

    @Override
    public Boolean existsByTitle(String title) {
        return quizRepository.existsByTitleIgnoreCase(title);
    }

    @Override
    public List<QuizTitleResponse> getAllQuizzesByTitle() {
        return quizRepository.findAllQuizzesByTitle();
    }

    @Override
    public List<QuestionAnswerResponse> getQuestionAnswer(String title) {
        return quizRepository.getAnswerByQuestion(title);
    }

    @Override
    public long getQuestionByAnswerId(long ans_id) {
        return quizRepository.getQuestionByAnswerId(ans_id);
    }

    @Override
    public long getCorrectAnswerByQuestionId(long ques_id) {
        return quizRepository.getCorrectAnswerByQuestionId(ques_id);
    }

    @Override
    public long getQuizByQuestionId(long ques_id) {
        return quizRepository.getQuizByQuestionId(ques_id);
    }



}
