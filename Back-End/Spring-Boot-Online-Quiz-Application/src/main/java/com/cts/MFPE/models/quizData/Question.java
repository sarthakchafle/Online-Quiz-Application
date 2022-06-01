package com.cts.MFPE.models.quizData;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="question")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ques_id")
    private long quesId;


    private String question;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="fk_ques_id",referencedColumnName = "ques_id")
    private List<Answer> answer;


    public Question(long quesId, String question, List<Answer> option) {
        this.quesId = quesId;
        this.question = question;
        this.answer = option;
    }

    public Question() {
    }

    public long getQuesId() {
        return quesId;
    }

    public void setQuesId(long quesId) {
        this.quesId = quesId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<Answer> getOption() {
        return answer;
    }

    public void setOption(List<Answer> option) {
        this.answer = option;
    }

    @Override
    public String toString() {
        return "Question{" +
                "quesId=" + quesId +
                ", question='" + question + '\'' +
                ", answer=" + answer +
                '}';
    }
}
