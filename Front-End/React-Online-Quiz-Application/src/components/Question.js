import React, { useState } from 'react'
import Button from "@mui/material/Button";

export default function Question({questions, questionNumber, setQuestionNumber, setQuestions, question, submit}) {
    const [answer, setAnswer] = useState(question.answer)
    const selectOption = (n) => {
        setAnswer(question.options[n])
        let a = questions

        a[questionNumber].answer = question.options[n]
        setQuestions(a)
    }
    const onNextClick = () => {
        setQuestionNumber(questionNumber+1)
        setAnswer("")
    }
    return (
        <>
        <div className='d-flex justify-content-space-around flex-row rounded p-5 border' style={{height: "50vh", width: "70vw", position: "absolute"}}>
            <h4><h1>Question {questionNumber+1} / {questions.length}</h1> {question.question}</h4>
            <div className='d-flex flex-column mx-5' style={{flex: 1, height: "15vh"}}>
                <div 
                    onClick={() => selectOption(0)} 
                    className='border p-2 m-2 pe-auto' 
                    style={{flex: 1, backgroundColor: answer === question.options[0] ? "#9f8cca" : null}}>{question.options[0]}</div>
                <div onClick={() => selectOption(1)} className='border p-2 m-2 pe-auto' style={{flex: 1, backgroundColor: answer === question.options[1] ? "#9f8cca" : null}}>{question.options[1]}</div>
                <div onClick={() => selectOption(2)} className='border p-2 m-2 pe-auto' style={{flex: 1, backgroundColor: answer === question.options[2] ? "#9f8cca" : null}}>{question.options[2]}</div>
                <div onClick={() => selectOption(3)} className='border p-2 m-2 pe-auto' style={{flex: 1, backgroundColor: answer === question.options[3] ? "#9f8cca" : null}}>{question.options[3]}</div>
            </div>
        </div>
        <Button
                className="m-5 px-5"
                variant="contained"
                style={{backgroundColor: "#533b7c", width: "10vw", alignSelf: "flex-end"}}
                onClick={questionNumber < questions.length-1 ? onNextClick : submit}
            >
                {questionNumber < questions.length-1 ? "Next": "Submit"}
            </Button>
        </>
    )
}
