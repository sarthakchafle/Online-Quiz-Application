package com.cts.Feedback.Service;

import com.cts.Feedback.Repository.FeedbackRepository;
import com.cts.Feedback.Model.Feedback;
import com.cts.Feedback.Repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService{
    @Autowired
    FeedbackRepository feedbackRepository;


    @Override
    public void saveFeedback(Feedback feedback) {
        // TODO Auto-generated method stub
        feedbackRepository.save(feedback);


    }

    @Override
    public List<Feedback> feedbacks() {
        // TODO Auto-generated method stub
        return feedbackRepository.findAll();
    }


}
