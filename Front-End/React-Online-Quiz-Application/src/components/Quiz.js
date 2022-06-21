import React, {useState} from 'react'
import './../styles/Quiz.css'
import Button from "@mui/material/Button";
import Question from './Question';


export default function Quiz() {
  const [started, setStarted] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [timer, setTimer] = useState()
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "ques1",
      options: ["option 1", "option 2", "option 3", "option 4"],
      answer: ""
    },
    {
      id: 2,
      question: "ques2",
      options: ["option 1", "option 2", "option 3", "option 4"],
      answer: ""
    }
  ])
  if(!started)
    return (
      <div className='quiz-container d-flex justify-content-center align-items-center'>
          <div className='quiz-semi-container d-flex justify-content-center align-items-center flex-column rounded p-5'>
              <h3 className='font-weight-bold'>Quiz title</h3>
              <div style={{width: '500px', color: "grey", textAlign: "center"}}>
              <p>This is a timed quiz. You cannot stop the timer after starting the quiz.</p>
              <p>Click on the button below to start the quiz</p>
              </div>
              <Button
                  className="my-3 px-5"
                  variant="contained"
                  style={{backgroundColor: "#533b7c"}}
                  onClick={() => setStarted(true)}
              >
                  {"Start"}
              </Button>
          </div>
      </div>
    )
    return (
      <Question question={questions[questionNumber]} setQuestions={setQuestions} questions={questions} questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} />
    )}
