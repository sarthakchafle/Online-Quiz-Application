package com.cts.mfpe.EvaluationService.payload.Request;

import java.io.Serializable;

public class EvaluateAnswerRequest implements Serializable {
    private long quiz_id;
    private String user_id;
    private long answer_id;

    public EvaluateAnswerRequest(long quiz_id, String user_id, long answer_id) {
        this.quiz_id = quiz_id;
        this.user_id = user_id;
        this.answer_id = answer_id;
    }

    public long getQuiz_id() {
        return quiz_id;
    }

    public void setQuiz_id(long quiz_id) {
        this.quiz_id = quiz_id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public long getAnswer_id() {
        return answer_id;
    }

    public void setAnswer_id(long answer_id) {
        this.answer_id = answer_id;
    }

    @Override
    public String toString() {
        return "EvaluateAnswerRequest{" +
                "quiz_id=" + quiz_id +
                ", user_id='" + user_id + '\'' +
                ", answer_id=" + answer_id +
                '}';
    }

    public EvaluateAnswerRequest() {
    }
}
