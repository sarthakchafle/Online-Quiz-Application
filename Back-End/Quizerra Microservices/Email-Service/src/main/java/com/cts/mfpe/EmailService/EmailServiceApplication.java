package com.cts.mfpe.EmailService;

import com.cts.mfpe.EmailService.EmailService.EmailService;
import com.cts.mfpe.EmailService.request.MailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;

import javax.mail.MessagingException;

@SpringBootApplication
public class EmailServiceApplication {

    @Autowired
    private EmailService service;

    public static void main(String[] args) {
        SpringApplication.run(EmailServiceApplication.class, args);
    }


}
