package com.MFPE.QuizService.QuizService.controllers;


import com.MFPE.QuizService.QuizService.models.Quiz;
import com.MFPE.QuizService.QuizService.payload.response.MessageResponse;
import com.MFPE.QuizService.QuizService.payload.response.QuestionAnswerResponse;
import com.MFPE.QuizService.QuizService.payload.response.QuizTitleResponse;
import com.MFPE.QuizService.QuizService.repository.AnswerRepository;
import com.MFPE.QuizService.QuizService.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.WebApplicationContext;

import javax.validation.Valid;
import java.util.List;

@Scope(value= WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class QuizController {
    @Autowired
    QuizService service;
    @Autowired
    AnswerRepository answerRepository;

    //Create Quiz with a title and other fields
    @PostMapping("/addQuiz")
//   @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addQuiz(@Valid @RequestBody Quiz quiz) {
        if (service.existsByTitle(quiz.getTitle())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Quiz with this Title " + quiz.getTitle() + " already Exists!"));
        } else {
            service.saveQuiz(quiz);
            return ResponseEntity.ok(new MessageResponse("Quiz with title " + quiz.getTitle() + " Added Succesfully!"));

        }
    }

    //Get all the quizzes
    @GetMapping("/getAllQuizzes")
//    @PreAuthorize("hasRole('ADMIN')")
    @ResponseBody
    public List<Quiz> getAllQuizzes() {
        return service.getAllQuizzes();
    }

    //Get all the quiz with title
    @GetMapping("/getQuiz")
//    @PreAuthorize("hasRole('ADMIN')")
    @ResponseBody
    public Quiz getQuiz(@RequestParam String title) {
        System.out.println(service.findByTitle(title));
        return service.findByTitle(title);
    }

    //Get all the titles
    @GetMapping("/getAllTitles")
//    @PreAuthorize("hasRole('ADMIN')")
    @ResponseBody
    public List<QuizTitleResponse> getAllQuizzesByTitle() {
        return service.getAllQuizzesByTitle();
    }

    //Get all the question with correct answer by title
    @GetMapping("/getQuestionAnswer")
//    @PreAuthorize("hasRole('ADMIN')")
    @ResponseBody
    public List<QuestionAnswerResponse> getQuestionAnswer(@RequestParam String title) {
        return service.getQuestionAnswer(title);
    }

    @GetMapping("/f/getQuestionByAnswer/{ansId}")
    @ResponseBody
    public long getQuestionByAnswer(@PathVariable Long ansId){
        return service.getQuestionByAnswer(ansId);
    }
    @GetMapping("/f/getCorrectAnswerByQuestionId/{quesId}")
    @ResponseBody
    public long getCorrectAnswerByQuestionId(@PathVariable  Long quesId){
        return service.getCorrectAnswerByQuestionId(quesId);
    }

    @GetMapping("/f/getQuizByQuestion/{quesId}")
    @ResponseBody
    public long getQuizByQuestion(@PathVariable Long quesId){
        return service.getQuizByQuestion(quesId);
    }

    @GetMapping("/f/existsQuiz/")
    @ResponseBody
    public boolean existsByQuizId(@RequestParam long id) {
        return service.existsByQuizId(id);
    }

    @GetMapping("/f/existsAnswer/")
    @ResponseBody
    public boolean existsByAnswerId(@RequestParam long id) {
        return answerRepository.existsByAnsId(id);
    }
}
