package com.cts.mfpe.EmailService.controller;

import com.cts.mfpe.EmailService.EmailService.EmailService;
import com.cts.mfpe.EmailService.Exception.EmailException;
import com.cts.mfpe.EmailService.request.MailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
public class MailController {

    @Autowired
    MailRequest mailRequest;
    @Autowired
    EmailService service;
    public static final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

    public static boolean validate(String emailStr) {
        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailStr);
        return matcher.find();
    }

    @PostMapping("/sendMail")
    ResponseEntity<?> sendMail(@RequestParam String email) throws Exception {

        try {
            if (!validate(email)) {
                throw new EmailException("Email is invalid");
            }
            mailRequest.setEmail(email);
            service.triggerMail();
            return ResponseEntity.ok().body("Email sent");
        } catch (EmailException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("something went wrong");
    }


}
