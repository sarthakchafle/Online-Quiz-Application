package com.cts.MFPE.payload.request;

public class UserAnswerRequest {
    private long user_id;
    private long answer_id;

    public UserAnswerRequest(long user_id, long answer_id) {
        this.user_id = user_id;
        this.answer_id = answer_id;
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public long getAnswer_id() {
        return answer_id;
    }

    public void setAnswer_id(long answer_id) {
        this.answer_id = answer_id;
    }
}
