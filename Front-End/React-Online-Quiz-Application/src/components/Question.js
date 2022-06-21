import React, { useState } from 'react'
import Button from "@mui/material/Button";

export default function Question({questions, questionNumber, setQuestionNumber, setQuestions, question}) {
    console.log(questionNumber + " " + questions.length) 
    const [answer, setAnswer] = useState(question.answer)
    const selectOption = (n) => {
        setAnswer(question.options[n])
        let a = questions
        console.log({answer})
        a[questionNumber].answer = question.options[n]
        console.log({a})
    }
    const onNextClick = () => {
        setQuestionNumber(questionNumber+1)
        setAnswer("")
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{height: "100vh"}}>
        <div className='d-flex justify-content-center flex-column rounded p-5 border' style={{height: "70vh", width: "70vw"}}>
            <h4>{questionNumber+1} {question.question}</h4>
            <div className='d-flex'>
                <div 
                    onClick={() => selectOption(0)} 
                    className='border p-2 m-2' 
                    style={{flex: 1, backgroundColor: answer === question.options[0] ? "#9f8cca" : null}}>{question.options[0]}</div>
                <div onClick={() => selectOption(1)} className='border p-2 m-2' style={{flex: 1, backgroundColor: answer === question.options[1] ? "#9f8cca" : null}}>{question.options[1]}</div>
            </div>
            <div className='d-flex'>
                <div onClick={() => selectOption(2)} className='border p-2 m-2' style={{flex: 1, backgroundColor: answer === question.options[2] ? "#9f8cca" : null}}>{question.options[2]}</div>
                <div onClick={() => selectOption(3)} className='border p-2 m-2' style={{flex: 1, backgroundColor: answer === question.options[3] ? "#9f8cca" : null}}>{question.options[3]}</div>
            </div>
            <Button
                className="my-3 mx-2 px-5"
                variant="contained"
                style={{backgroundColor: "#533b7c", width: "10vw", alignSelf: "flex-end"}}
                onClick={onNextClick}
            >
                {questionNumber < questions.length-1 ? "Next": "Submit"}
            </Button>
        </div>
        </div>
    )
}
