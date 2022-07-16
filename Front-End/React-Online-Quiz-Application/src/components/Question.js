import React, { useState } from 'react'
import Button from "@mui/material/Button";

export default function Question({questions, questionNumber, setQuestionNumber, setQuestions, question, submit}) {
    const [answer, setAnswer] = useState(question.answer)
    const selectOption = (n) => {
        setAnswer(n)
        let a = questions

        a[questionNumber].answer = question.option[n]
        setQuestions(a)
    }
    const onNextClick = () => {
        setQuestionNumber(questionNumber+1)
        setAnswer("")
    }
    return (
        <>
        <div className='d-flex justify-content-space-around flex-row rounded p-5 border' style={{height: "50vh", width: "70vw", position: "absolute"}}>
            <div>
                <h1>Question {questionNumber+1} / {questions.length}</h1> 
                <h4 style={{width: '30vw'}}>{question.question}</h4>
            </div>
            <div className='d-flex flex-column mx-5' style={{flex: 1, height: "15vh"}}>
                <div 
                    onClick={() => selectOption(question.option[0].answer)} 
                    className='border p-2 m-2 pe-auto' 
                    style={{flex: 1, backgroundColor: answer === question.option[0].answer ? "#9f8cca" : null, cursor: "pointer"}}>{question.option[0].answer}</div>
                <div onClick={() => selectOption(question.option[1].answer)} className='border p-2 m-2 pe-auto' 
                    style={{flex: 1, backgroundColor: answer === question.option[1].answer ? "#9f8cca" : null, cursor: "pointer"}}>{question.option[1].answer}</div>
                <div onClick={() => selectOption(question.option[2].answer)} className='border p-2 m-2 pe-auto' 
                    style={{flex: 1, backgroundColor: answer === question.option[2].answer ? "#9f8cca" : null, cursor: "pointer"}}>{question.option[2].answer}</div>
                <div onClick={() => selectOption(question.option[3].answer)} className='border p-2 m-2 pe-auto' 
                    style={{flex: 1, backgroundColor: answer === question.option[3].answer ? "#9f8cca" : null, cursor: "pointer"}}>{question.option[3].answer}</div>
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
