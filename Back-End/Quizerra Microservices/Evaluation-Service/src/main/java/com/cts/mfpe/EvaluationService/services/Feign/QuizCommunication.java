package com.cts.mfpe.EvaluationService.services.Feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "quizComm", url = "http://localhost:8299/quiz-service/api/f")
public interface QuizCommunication {

    @GetMapping("/existsQuiz/")
    boolean ifExistsQuiz(@RequestParam long id);

    @GetMapping("/existsAnswer/")
    boolean ifExistsAnswer(@RequestParam long id);
    @GetMapping("/getQuestionByAnswer/{ansId}")
    long getQuestionFromAnswer( @PathVariable long ansId);

    @GetMapping("/getCorrectAnswerByQuestionId/{quesId}")
    long getCorrectAnswerByQuestionId(@PathVariable long quesId);

    @GetMapping("/getQuizByQuestion/{quesId}")
    long getQuizByQuestion(@PathVariable long quesId);


}
