package com.cts.MFPE.controllers;

import com.cts.MFPE.models.quizData.Quiz;
import com.cts.MFPE.payload.response.MessageResponse;
import com.cts.MFPE.payload.response.QuestionAnswerResponse;
import com.cts.MFPE.payload.response.QuizTitleResponse;
import com.cts.MFPE.security.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class QuizController {
    @Autowired
    QuizService service;

    //Create Quiz with a title and other fields
    @PostMapping("/addQuiz")
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseBody
    public List<Quiz> getAllQuizzes() {
        return service.getAllQuizzes();
    }

    //Get all the quiz with title
    @GetMapping("/getQuiz")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseBody
    public Quiz getQuiz(@RequestParam String title) {
        System.out.println(service.findByTitle(title));
        return service.findByTitle(title);
    }

    //Get all the titles
    @GetMapping("/getAllTitles")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseBody
    public List<QuizTitleResponse> getAllQuizzesByTitle() {
        return service.getAllQuizzesByTitle();
    }

    //Get all the question with correct answer by title
    @GetMapping("/getQuestionAnswer")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseBody
    public List<QuestionAnswerResponse> getQuestionAnswer(@RequestParam String title) {
        return service.getQuestionAnswer(title);
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
