package com.cts.MFPE.Answer_Service.controller;

import com.cts.MFPE.Answer_Service.Exception.SavingAnswerException;
import com.cts.MFPE.Answer_Service.payload.request.SaveAnswerRequest;
import com.cts.MFPE.Answer_Service.payload.response.MessageResponse;
import com.cts.MFPE.Answer_Service.services.AnswerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.WebApplicationContext;

import java.util.Arrays;
import java.util.List;

@Scope(value= WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
@RestController
@RequestMapping("/api")
public class UserAnswerController {
    Logger logger = LoggerFactory.getLogger(UserAnswerController.class);
    @Autowired
    AnswerService service;

    @PostMapping("/saveAnswer")
    @ResponseBody
    public ResponseEntity<?> saveAnswer(@RequestBody SaveAnswerRequest[] saveAnswerRequests) {
        logger.info("saveAnswer get method called");
        try {

            Arrays.stream(saveAnswerRequests).forEach(e -> {
                logger.info(String.valueOf(e));
                try {
                    service.saveAnswer(e.getUser_id(), e.getAnswer_id(),e.getQuiz_id());
                } catch (SavingAnswerException ex) {
                    logger.error(ex.getLocalizedMessage());
                    throw new RuntimeException(ex);
                }
            });
            return ResponseEntity.ok(new MessageResponse("Answers saved Successfully!"));
        } catch (Exception e) {
            logger.info(e.getLocalizedMessage());
            return ResponseEntity.status(500).body("Something went wrong! " + e.getMessage().substring(38));
        }
    }
    
    @GetMapping("/getAllAttemptedQuiz")
    public List<Long> getAllAttemptedQuiz(@RequestParam String user_id) {
    	return service.getAllAttemptedQuizByUser(user_id);
    }
}