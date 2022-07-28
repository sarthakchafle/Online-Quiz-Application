package com.cts.MFPE.Answer_Service.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class UserAnswer  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userAnswerId;
    private String userId;
    private long quizId;
    private long answerId;
    private String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public UserAnswer(long userAnswerId, String userId, long quizId, long answerId, String title) {
        this.userAnswerId = userAnswerId;
        this.userId = userId;
        this.quizId = quizId;
        this.answerId = answerId;
    }

    public UserAnswer() {
    }

    public long getUserAnswerId() {
        return userAnswerId;
    }

    public void setUserAnswerId(long userAnswerId) {
        this.userAnswerId = userAnswerId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public long getQuizId() {
        return quizId;
    }

    public void setQuizId(long quizId) {
        this.quizId = quizId;
    }

    public long getAnswerId() {
        return answerId;
    }

    public void setAnswerId(long answerId) {
        this.answerId = answerId;
    }
}
