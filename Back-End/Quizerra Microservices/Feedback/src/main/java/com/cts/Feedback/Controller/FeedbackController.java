package com.cts.Feedback.Controller;

import com.cts.Feedback.Model.Feedback;
import com.cts.Feedback.Service.FeedbackService;
import com.cts.Feedback.Service.FeedbackServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FeedbackController {
    @Autowired
    private FeedbackServiceImpl feedback;

    @PostMapping("/feedback")
    public void savefeedback(@RequestBody Feedback feed) {
        this.feedback.saveFeedback(feed);
    }
}
