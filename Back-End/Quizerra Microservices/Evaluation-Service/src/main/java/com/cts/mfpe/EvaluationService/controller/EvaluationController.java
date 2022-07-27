package com.cts.mfpe.EvaluationService.controller;

import com.cts.mfpe.EvaluationService.Exception.EvaluationException;
import com.cts.mfpe.EvaluationService.Repository.EvaluateAnswerRepository;
import com.cts.mfpe.EvaluationService.models.UserScore;
import com.cts.mfpe.EvaluationService.payload.Request.EvaluateAnswerRequest;
import com.cts.mfpe.EvaluationService.payload.Response.MessageResponse;
import com.cts.mfpe.EvaluationService.services.EvaluationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.WebApplicationContext;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Scope(value = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
@RestController
@RequestMapping("/api")
public class EvaluationController {
    Logger logger = LoggerFactory.getLogger(EvaluationController.class);
    @Autowired
    EvaluationService service;

    @Autowired
    EvaluateAnswerRepository evaluateAnswerRepository;

    private final Map<String, Map<Long, Integer>> userScore = new HashMap<>();
    private final Map<Long, Integer> questionScoreMap = new HashMap<>();
private int getLength(EvaluateAnswerRequest[] evaluateAnswerRequest){
    int count=0;
    for(int i=0;i<evaluateAnswerRequest.length;i++){
        if(evaluateAnswerRequest[i].getAnswer_id()!=-1){
            count++;
        }
    }
    return count;
}
    @PostMapping("/evaluate")
    @ResponseBody
    Map<Long, Boolean> startEvaluation(@RequestBody EvaluateAnswerRequest[] evaluateAnswerRequest) {
        logger.info("evaluate post method called");
        Map<Long, Boolean> result = new HashMap<>();
        UserScore userScoreObj = new UserScore();
        int length = getLength(evaluateAnswerRequest);
        if(length==0){
            userScoreObj.setQuiz_id(evaluateAnswerRequest[0].getQuiz_id());
            userScoreObj.setScore(0);
            userScoreObj.setUser_id(evaluateAnswerRequest[0].getUser_id());
            evaluateAnswerRepository.save(userScoreObj);
        }
        try {
            Arrays.stream(evaluateAnswerRequest).forEach(e -> {
                if (e.getAnswer_id() != -1) {
                    logger.info("user object -> " + String.valueOf(e));
                    try {
                        service.startEvaluation(e, userScore, questionScoreMap, length, result);
                    } catch (EvaluationException ex) {
                        logger.info(ex.getLocalizedMessage());
                        throw new RuntimeException(ex);
                    }
                }
            });
            logger.info("Answers saved Successfully!");
            logger.info("result : " + result);
            return result;
//            return ResponseEntity.ok(new MessageResponse("Answers saved Successfully!"));
        } catch (Exception e) {
//            e.printStackTrace();
            logger.error(e.getLocalizedMessage());
            return result;
//            return ResponseEntity.badRequest().body("Error: Either user doesn't exists or answer or maybe both");
        }
    }

    @GetMapping("/score/{userId}/{quizId}")
    public int getUserScore(@PathVariable String userId, @PathVariable long quizId) {
        return evaluateAnswerRepository.findByUserIdAndQuizId(userId, quizId);
    }
}
