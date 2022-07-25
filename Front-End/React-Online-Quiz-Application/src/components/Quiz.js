import React, { useState, useEffect } from "react";
import "./../styles/Quiz.css";
import Button from "@mui/material/Button";
import Question from "./Question";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { getQuizByTitle } from "../services/quiz.service";
import AuthService from "../services/auth.service";
import AnswerService from "../services/answer.service";

export default function Quiz() {
  let navigate = useNavigate();
  const location = useLocation();
  const { title } = location.state ? location.state : "";
  const [started, setStarted] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [param, setparam] = useState();
  const [error, setError] = useState(false)
  const [userAnswers, setUserAnswers] = useState([])

  useEffect(() => {
    if (!location.state) {
      navigate("/allQuizzes", { replace: true});
    }
    getData();
  }, []);

  const getData = async () => {
    let res = await getQuizByTitle(title);
    setQuestions(res.data.question);
    setparam({
      length: 3,
      quiz_id: res.data.quizId,
      param: [],
    });
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  const submit = () => {
    console.log({ param });
    console.log({userAnswers})
    AnswerService.saveAnswers(param.param).then(
      (response) => {
        console.log({response});
        setMinutes(0);
        setSeconds(0);
      },
      (error) => {
        setMinutes(0);
        setSeconds(0);
        setError(true)
      }
    );
  }

  if (!AuthService.isLoggedIn()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!started)
    return (
      <div
        className="d-flex justify-content-center align-items-center py-4"
        style={{ backgroundColor: "#533b7c", height: "100vh" }}
      >
        <div className="quiz-semi-container d-flex justify-content-center align-items-center flex-column rounded p-5">
          <h3 className="font-weight-bold">Quiz Title: {title}</h3>
          <div style={{ width: "500px", color: "grey", textAlign: "center" }}>
            <p>
              This is a timed quiz. You cannot stop the timer after starting the
              quiz. <span>Do not refresh the page during the quiz</span>
            </p>
            <p>Click on the button below to start the quiz</p>
          </div>
          <Button
            className="my-3 px-5"
            variant="contained"
            style={{ backgroundColor: "#533b7c" }}
            onClick={() => {
              setStarted(true);
              setMinutes(20);
              setSeconds(0);
            }}
          >
            Start
          </Button>
        </div>
      </div>
    );
  return (
    <div style={{ height: "100vh" }}>
      {minutes === 0 && seconds === 0 ? (
        <div
          className="quiz-container d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="quiz-semi-container d-flex justify-content-center align-items-center flex-column rounded p-5">
            {
              error ? 
              <>
                <h4 className="text-danger">There was an error in submitting the answer. Please try again later.</h4>
              </> : 
              <>
                <h1 className="font-italic my-4">Congratulations!!</h1>
                <h4 className="">The test has been submitted</h4>
                <Button
                  className="my-3 px-5"
                  variant="contained"
                  style={{ backgroundColor: "#533b7c" }}
                  onClick={() => {
                    console.log("answer: ", userAnswers)
                    navigate("/result", { state: {param: param.param, title: title, questions: questions, userAnswers: userAnswers}});
                  }}
                >
                  Click here for the results
                </Button>
              </>
            }
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center flex-column"
          style={{ height: "100vh" }}
        >
          <h4
            style={{
              display: "grid",
              alignSelf: "flex-end",
              justifySelf: "flex-start",
              flex: 1,
              margin: "2vh",
              color: minutes === 0 ? "red" : "black",
            }}
          >
            Time Left: {minutes} : {seconds}
          </h4>
          <Question
            question={questions[questionNumber]}
            setparam={setparam}
            param={param}
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
            submit={submit}
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
          />
        </div>
      )}
    </div>
  );
}
