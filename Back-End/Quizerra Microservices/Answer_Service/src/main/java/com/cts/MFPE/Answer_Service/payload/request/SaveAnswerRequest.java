package com.cts.MFPE.Answer_Service.payload.request;

import java.io.Serializable;

public class SaveAnswerRequest implements Serializable {

    private String user_id;
    private long answer_id;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    private long quiz_id;
    private String title;

    public SaveAnswerRequest(String user_id, long answer_id, long quiz_id,String title) {
        this.user_id = user_id;
        this.answer_id = answer_id;
        this.quiz_id = quiz_id;
    }

    public SaveAnswerRequest() {
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

    public long getQuiz_id() {
        return quiz_id;
    }

    public void setQuiz_id(long quiz_id) {
        this.quiz_id = quiz_id;
    }

    @Override
    public String toString() {
        return "SaveAnswerRequest{" +
                "user_id='" + user_id + '\'' +
                ", answer_id=" + answer_id +
                ", quiz_id=" + quiz_id +
                '}';
    }
}
