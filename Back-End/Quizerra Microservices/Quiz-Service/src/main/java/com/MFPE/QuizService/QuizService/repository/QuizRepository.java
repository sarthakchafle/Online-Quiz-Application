package com.MFPE.QuizService.QuizService.repository;

import com.MFPE.QuizService.QuizService.models.Quiz;
import com.MFPE.QuizService.QuizService.payload.response.QuestionAnswerResponse;
import com.MFPE.QuizService.QuizService.payload.response.QuizTitleResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    @Query(value = "SELECT * FROM QUIZ WHERE title = ?1", nativeQuery = true)
    Quiz findByTitle(String title);

    @Query(value = "select q.quiz_id as id,q.title as title, que.ques_id as ques, que.question as question, a.answer as answer from quiz q JOIN question que JOIN answer a where a.is_correct=true and a.fk_ques_id=que.ques_id and q.quiz_id=que.fk_quiz_id and q.title=:title", nativeQuery = true)
    List<QuestionAnswerResponse> getAnswerByQuestion(@Param("title") String title);

    boolean existsByQuizId(long quizId);

    Boolean existsByTitleIgnoreCase(String title);

    @Query(value = "SELECT quiz_id,title, time_limit FROM QUIZ", nativeQuery = true)
    List<QuizTitleResponse> findAllQuizzesByTitle();


    @Query(value = "select ans_id from answer where is_correct=1 and fk_ques_id=:ques_id",nativeQuery = true)
    long getCorrectAnswerByQuestionId(long ques_id);

    @Query(value = "select q.quiz_id from quiz q,question que where que.ques_id=:ques_id and que.fk_quiz_id=q.quiz_id;",nativeQuery = true)
    long getQuizByQuestionId(long ques_id);

    @Query(value = "select fk_ques_id from answer where ans_id=:ans_id",nativeQuery = true)
    long getQuestionIdFromAnswer(long ans_id);

}
