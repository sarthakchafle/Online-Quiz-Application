package com.cts.Feedback.Service;

import com.cts.Feedback.Model.Feedback;
import org.springframework.stereotype.Service;

import java.util.List;

public interface FeedbackService {

    void saveFeedback(Feedback feedback);
    List<Feedback> feedbacks();
}
