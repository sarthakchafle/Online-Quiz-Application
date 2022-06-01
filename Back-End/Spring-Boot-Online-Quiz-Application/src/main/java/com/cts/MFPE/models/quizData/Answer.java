package com.cts.MFPE.models.quizData;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="answer")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ans_id")
    private long ansId;


    private String answer;

    @Override
    public String toString() {
        return "Answer{" +
                "ansId=" + ansId +
                ", answer='" + answer + '\'' +
                ", isCorrect=" + isCorrect +
                '}';
    }

    @Column(nullable = false, columnDefinition = "TINYINT", length = 1)
    private boolean isCorrect;


    public Answer(long ansId, String answer, boolean isCorrect) {
        this.ansId = ansId;
        this.answer = answer;
        this.isCorrect = isCorrect;
    }

    public Answer() {
    }

    public long getAnsId() {
        return ansId;
    }

    public void setAnsId(long ansId) {
        this.ansId = ansId;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }
}
