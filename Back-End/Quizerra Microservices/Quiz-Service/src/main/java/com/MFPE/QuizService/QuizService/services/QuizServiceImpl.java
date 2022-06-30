package com.MFPE.QuizService.QuizService.services;

import com.MFPE.QuizService.QuizService.models.Quiz;
import com.MFPE.QuizService.QuizService.payload.response.QuestionAnswerResponse;
import com.MFPE.QuizService.QuizService.payload.response.QuizTitleResponse;
import com.MFPE.QuizService.QuizService.repository.QuizRepository;
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
    public boolean existsByQuizId(long quizId) {
        return quizRepository.existsByQuizId(quizId);
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
    public long getQuestionByAnswer(long ansId) {
        return quizRepository.getQuestionIdFromAnswer(ansId);
    }

    @Override
    public long getCorrectAnswerByQuestionId(long quesId) {
        return quizRepository.getCorrectAnswerByQuestionId(quesId);
    }

    @Override
    public long getQuizByQuestion(long quesId) {
        return quizRepository.getQuizByQuestionId(quesId);
    }


}
