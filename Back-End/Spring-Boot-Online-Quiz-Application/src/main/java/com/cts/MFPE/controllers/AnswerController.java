package com.cts.MFPE.controllers;

import com.cts.MFPE.payload.request.UserAnswerRequest;
import com.cts.MFPE.payload.response.MessageResponse;
import com.cts.MFPE.security.services.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class AnswerController {

    @Autowired
    AnswerService service;


    @PostMapping("/saveAnswer")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> saveAnswer(@Valid @RequestBody UserAnswerRequest[] userAnswerRequest) {
        try {
            Arrays.stream(userAnswerRequest).forEach(e -> {
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
}
