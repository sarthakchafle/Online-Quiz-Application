package com.cts.MFPE.repository;

import com.cts.MFPE.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);


  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);

  @Modifying
  @Query(value = "insert into user_answers values(:user_id,:answer_id) ",nativeQuery = true)
  @Transactional
  public void storeAnswer(@Param("user_id") long user_id,@Param("answer_id") long answer_id);

  @Query(value = "select q.ques_id,q.question from question q,answer a where a.ans_id=:ans_id and a.fk_ques_id=q.ques_id",nativeQuery = true)
  long getQuestionByAnswerId(long ans_id);

  @Query(value = "select ans_id from answer where is_correct=1 and fk_ques_id=:ques_id",nativeQuery = true)
  long getCorrectAnswerByQuestionId(long ques_id);

  @Query(value = "select q.quiz_id from quiz q,question que where que.ques_id=:ques_id and que.fk_quiz_id=q.quiz_id;",nativeQuery = true)
  long getQuizByQuestionId(long ques_id);

  @Query(value = "select fk_ques_id from answer where ans_id=:ans_id",nativeQuery = true)
  long getQuestionIdFromAnswer(long ans_id);

  @Modifying
  @Query(value = "insert into user_score(fk_user_id,fk_quiz_id,score) values(:user_id,:quiz_id,:score) ",nativeQuery = true)
  @Transactional
  public void storeScore(@Param("user_id") long user_id,@Param("quiz_id") long quiz_id,@Param("score") int score);
}
