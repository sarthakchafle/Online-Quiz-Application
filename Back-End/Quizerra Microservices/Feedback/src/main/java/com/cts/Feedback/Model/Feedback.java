package com.cts.Feedback.Model;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long FeedbackId;
    private String email;
    private int rating;
    private String review;


    public Feedback(long feedbackId,String email,int rating,String review) {
        super();
        this.FeedbackId = feedbackId;
        this.email = email;
        this.rating = rating;
        this.review = review;
    }

    public Feedback() {
        super();
        // TODO Auto-generated constructor stub
    }

    public long getFeedbackId() {
        return FeedbackId;
    }

    public void setFeedbackId(long feedbackId) {
        FeedbackId = feedbackId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }
}
