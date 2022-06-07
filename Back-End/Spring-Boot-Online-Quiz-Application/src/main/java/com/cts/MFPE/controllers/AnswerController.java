package com.cts.MFPE.controllers;

import com.cts.MFPE.payload.request.EvaluateAnswerRequest;
import com.cts.MFPE.payload.request.UserAnswerRequest;
import com.cts.MFPE.payload.response.MessageResponse;
import com.cts.MFPE.security.services.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.WebApplicationContext;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Scope(value= WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class AnswerController {

    @Autowired
    AnswerService service;
    private final Map<Long, Map<Long,Integer>> userScore= new HashMap<>();
    private final Map<Long,Integer> questionScoreMap = new HashMap<>();

    @PostMapping("/saveAnswer")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> saveAnswer(@Valid @RequestBody EvaluateAnswerRequest[] evaluateAnswerRequests) {
        try {
            Arrays.stream(evaluateAnswerRequests).forEach(e -> {
                service.startEvaluation(e,userScore,questionScoreMap);
                service.saveAnswer(e.getUser_id(), e.getAnswer_id());
            });
            return ResponseEntity.ok(new MessageResponse("Answers saved Successfully!"));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Either user doesn't exists or answer or maybe both"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Something went wrong!");
        }
    }

    // get the question id from the answer id
    @GetMapping("/getQuestionId")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseBody
    public long getQuestionByAnswerId(@RequestParam long ans_id) {
        return service.getQuestionByAnswerId(ans_id);
    }

    // get the correct answer's id from the question id
    @GetMapping("/getCorrectAnswerId")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseBody
    public long getCorrectAnswerByQuestionId(@RequestParam long ques_id) {
        return service.getCorrectAnswerByQuestionId(ques_id);

    }

    // get the quiz id from the question id
    @GetMapping("/getQuizId")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseBody
    public long getQuizByQuestionId(@RequestParam long ques_id) {
        return service.getQuizByQuestionId(ques_id);

    }
}
