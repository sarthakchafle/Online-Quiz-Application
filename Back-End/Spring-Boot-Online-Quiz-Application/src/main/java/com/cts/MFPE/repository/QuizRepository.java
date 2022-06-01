package com.cts.MFPE.repository;

import com.cts.MFPE.models.quizData.Quiz;
import com.cts.MFPE.payload.response.QuestionAnswerResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz,Long> {
    @Query(value = "SELECT * FROM QUIZ WHERE title = ?1", nativeQuery = true)
    Quiz findByTitle(String title);

    Boolean existsByTitleIgnoreCase(String title);

    @Query(value = "SELECT title FROM QUIZ", nativeQuery = true)
    List<String> findAllQuizzesByTitle();


    @Query(value = "select q.quiz_id as id,q.title as title,que.question as question,a.answer as answer from quiz q JOIN question que JOIN answer a where a.is_correct=true and a.fk_ques_id=que.ques_id and q.quiz_id=que.fk_quiz_id and q.title=:title",nativeQuery = true)
    List<QuestionAnswerResponse> getAnswerByQuestion(@Param("title") String title);
}
