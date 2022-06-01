package com.cts.MFPE.models.quizData;

import javax.persistence.*;
import java.util.List;

@Entity
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "quiz_id")
    private long quizId;


    private String title;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="fk_quiz_id", referencedColumnName = "quiz_id")
    private List<Question> question;

    public Quiz(long quizId, String title, List<Question> question) {
        this.quizId = quizId;
        this.title = title;
        this.question = question;
    }

    public Quiz() {
    }

    public long getQuizId() {
        return quizId;
    }

    public void setQuizId(long quizId) {
        this.quizId = quizId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Question> getQuestion() {
        return question;
    }

    public void setQuestion(List<Question> question) {
        this.question = question;
    }

    @Override
    public String toString() {
        return "Quiz{" +
                "quizId=" + quizId +
                ", title='" + title + '\'' +
                ", question=" + question +
                '}';
    }
}
