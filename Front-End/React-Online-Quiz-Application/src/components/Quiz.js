import React, {useState, useEffect} from 'react'
import './../styles/Quiz.css'
import Button from "@mui/material/Button";
import Question from './Question';
import { useLocation } from 'react-router-dom';


export default function Quiz() {
	const location = useLocation()
	const { title } = location.state
	const [started, setStarted] = useState(false)
	const [questionNumber, setQuestionNumber] = useState(0)
	const [minutes, setMinutes ] = useState(0);
	const [seconds, setSeconds ] =  useState(0);
	const [questions, setQuestions] = useState([
		{
		id: 1,
		question: "Choose one option from the following",
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
  
	useEffect(()=>{
		let myInterval = setInterval(() => {
		if (seconds > 0) {
			setSeconds(seconds - 1);
		}
		if (seconds === 0) {
			if (minutes === 0) {
			clearInterval(myInterval)
			} else {
			setMinutes(minutes - 1);
			setSeconds(59);
			}
		} 
		}, 1000)
		return ()=> {
		clearInterval(myInterval);
		};
	});
	const submit = () => {
		setMinutes(0)
		setSeconds(0)
		console.log({questions})
	}
	if(!started)
		return (
		<div className='d-flex justify-content-center align-items-center py-4' style={{backgroundColor: "#533b7c", height: "90vh"}}>
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
					onClick={() => {
						setStarted(true)
						setSeconds(30)
					}}
				>
					Start
				</Button>
			</div>
		</div>
	)
	return (
		<div>
		{ minutes === 0 && seconds === 0
			? 
			<div className='quiz-container d-flex justify-content-center align-items-center'>
				<div className='quiz-semi-container d-flex justify-content-center align-items-center flex-column rounded p-5'>
					<h1 className='font-italic my-4'>Congratulations!!</h1>
					<h4 className=''>The test has been submitted</h4>
					<Button
						className="my-3 px-5"
						variant="contained"
						style={{backgroundColor: "#533b7c"}}
					>
						Click here for the results
					</Button>
				</div>
			</div>
			: 
			<div className='d-flex justify-content-center align-items-center flex-column' style={{height: "100vh"}}>
				<h4 style={{display: "grid", alignSelf: "flex-end",justifySelf:"flex-start", flex: 1, margin: '2vh'}}>
					Time Left: {minutes} : {seconds}</h4>
				<Question question={questions[questionNumber]} setQuestions={setQuestions} questions={questions} questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} submit={submit} />
			</div>
		}
		</div>
  	)
}
