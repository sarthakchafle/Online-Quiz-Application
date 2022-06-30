package com.cts.MFPE.Answer_Service.services.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "answerComm", url = "http://localhost:8299/quiz-service/api/f")
public interface AnswerCommunication {
    @GetMapping("/existsAnswer/")
    boolean ifExistsAnswer(@RequestBody @RequestParam long id);

    @GetMapping("/existsQuiz/")
    boolean ifExistsQuiz(@RequestBody @RequestParam long id);
}
