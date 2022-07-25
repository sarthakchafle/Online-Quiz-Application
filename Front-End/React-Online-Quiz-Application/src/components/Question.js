import React, { useState } from 'react'
import Button from "@mui/material/Button";
import AuthService from '../services/auth.service';

export default function Question({question, questionNumber, setQuestionNumber, param, setparam, submit, userAnswers, setUserAnswers}) {
    const [answer, setAnswer] = useState()
    const [error, setError] = useState(false)

    const selectOption = (m) => {
        setAnswer(m.answer)
        let a = param
        let temp = {
            "user_id": AuthService.getCurrentUser().id,
            "answer_id": m.ansId,
            "quiz_id": param.quiz_id

        }
        a.param.push(temp)
        setparam(a)

        console.log({m})
        let b = userAnswers
        b.push({
            answer: m.answer,
            ques: question.quesId
        })
        setUserAnswers(b);
        console.log({b})
    }
    
    const onNextClick = () => {
        if(answer) {
            setQuestionNumber(questionNumber+1)
            setAnswer("")
            setError(false)
        } else {
            setError(true)
        }
    }
    return (
        <>
        <div className='d-flex justify-content-space-around flex-row rounded p-5 border' style={{height: "50vh", width: "70vw", position: "absolute"}}>
            <div>
                <h1>Question {questionNumber+1} / {param.length}</h1> 
                <h4 style={{width: '30vw'}}>{question.question}</h4>
            </div>
            <div className='d-flex flex-column mx-5' style={{flex: 1, height: "15vh"}}>
                <div 
                    onClick={() => selectOption(question.option[0])} 
                    className='border p-2 m-2 pe-auto' 
                    style={{flex: 1, backgroundColor: answer === question.option[0].answer ? "#9f8cca" : null, cursor: "pointer"}}
                >
                    {question.option[0].answer}
                </div>
                <div 
                    onClick={() => selectOption(question.option[1])} 
                    className='border p-2 m-2 pe-auto' 
                    style={{flex: 1, backgroundColor: answer === question.option[1].answer ? "#9f8cca" : null, cursor: "pointer"}}
                >
                    {question.option[1].answer}
                </div>
                <div 
                    onClick={() => selectOption(question.option[2])} 
                    className='border p-2 m-2 pe-auto' 
                    style={{flex: 1, backgroundColor: answer === question.option[2].answer ? "#9f8cca" : null, cursor: "pointer"}}
                >
                    {question.option[2].answer}
                </div>
                <div 
                    onClick={() => selectOption(question.option[3])} 
                    className='border p-2 m-2 pe-auto' 
                    style={{flex: 1, backgroundColor: answer === question.option[3].answer ? "#9f8cca" : null, cursor: "pointer"}}
                >
                    {question.option[3].answer}
                </div>
                {error ? <span className="text-danger m-2" style={{alignSelf: "flex-end"}}>Please select an option before proceeding</span> : null}
            </div>
        </div>
        <Button
            className="m-5 px-5"
            variant="contained"
            style={{backgroundColor: "#533b7c", width: "10vw", alignSelf: "flex-end"}}
            onClick={questionNumber < param.length-1 ? onNextClick : submit}
        >
            {questionNumber < param.length-1 ? "Next": "Submit"}
        </Button>
    </>
)}
