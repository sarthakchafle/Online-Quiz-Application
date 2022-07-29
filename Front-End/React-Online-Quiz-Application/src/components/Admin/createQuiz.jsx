import React, { useEffect, useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import AddedQuestions from "./AddedQuestions";
import { postQuiz } from "../../services/quiz.service";
import AddQuestion from "./AddQuestion";
import AuthService from "../../services/auth.service";
import "./createquiz.css";
import NotAllowed from "../NotAllowed";
import Snackbar from "@mui/material/Snackbar";

const CreateQuiz = () => {
  let navigate = useNavigate();
  const [state, setState] = useState(0);
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [admin, setAdmin] = useState("");
  const [count, setCount] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(3);
  const [formattedArray, setFormattedArray] = useState([]); //api
  const [timeLimit, setTimeLimit] = useState();
  const [showSnackBar, setshowSnackBar] = useState(false);
  let que = {
    title: title,
    question: formattedArray,
    timeLimit: timeLimit,
  }; // api

  useEffect(() => {
    console.log(AuthService.getCurrentUser().isAdmin);
    setAdmin(AuthService.getCurrentUser().isAdmin);
  }, []);
  const handleSubmit = () => {
    console.log(que);
    postQuiz(que);
    setState(2);
    setCount(0);
    setTitle("");
    setNumberOfQuestions(3);
    setFormattedArray([]);
  };

  if (!AuthService.isLoggedIn()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (admin === "false") {
    return <NotAllowed />;
  }

  return (
    <div className={"containerrr"}>
      {state === 0 ? (
        <div direction={"row"}>
          <Typography>Create Quiz</Typography>
          <TextField
            style={{ width: "50vw" }}
            className="my-4"
            required={true}
            id="outlined-textarea"
            label="Title of Quiz"
            placeholder="Title..."
            multiline
            fullWidth
            margin="dense"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <FormControl sx={{ width: "50vw" }} className="my-4">
            <InputLabel id="demo-multiple-name-label">
              Number of Questions...
            </InputLabel>
            <Select
              required={true}
              label="Number of Questions"
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={numberOfQuestions}
              inputProps={{ "aria-label": "Without label" }}
              onChange={(e) => setNumberOfQuestions(e.target.value)}
              input={<OutlinedInput label="Name" />}
              fullWidth
            >
              <MenuItem value={3}>{3}</MenuItem>
              <MenuItem value={10}>{10}</MenuItem>
              <MenuItem value={15}>{15}</MenuItem>
              <MenuItem value={20}>{20}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type={"number"}
            style={{ width: "50vw" }}
            className="my-4"
            required={true}
            id="outlined-textarea"
            label="Time Limit"
            placeholder="Time limit..."
            multiline
            fullWidth
            margin="dense"
            value={timeLimit}
            onChange={(e) => {
              setTimeLimit(e.target.value);
            }}
          />
          <br />
          <button
            className="btn-red-for-rest-pages my-2"
            onClick={(e) => {
              let reg = /^\d+$/;
              if (title && timeLimit && reg.test(timeLimit)) {
                setState(1);
              } else {
                setshowSnackBar(true);
              }
            }}
            variant="contained"
            sx={{ backgroundColor: "#533b7c" }}
          >
            {"Add Questions"}
          </button>
        </div>
      ) : null}
      {state === 1 && count < numberOfQuestions ? (
        <AddQuestion
          formattedArray={formattedArray}
          setFormattedArray={setFormattedArray}
          count={count}
          setCount={setCount}
        />
      ) : null}
      {state === 1 && count === numberOfQuestions ? (
        <>
          <AddedQuestions
            array={formattedArray}
            title={title}
            time={`${timeLimit} minutes`}
          />
          <button
            onClick={(e) => handleSubmit(e)}
            sx={{ margin: "20px" }}
            className="btn-red-for-rest-pages mx-5"
          >
            Submit
          </button>
        </>
      ) : null}
      {state === 2 && (
        <div>
          <Typography>Congratulation, the quiz has been added</Typography>
          <button
            href="/allQuizzes"
            className="btn-red-for-rest-pages"
            onClick={() => navigate("/allQuizzes")}
          >
            Show Quizzes
          </button>
        </div>
      )}
      <Snackbar
        open={showSnackBar}
        autoHideDuration={6000}
        onClose={() => setshowSnackBar(false)}
        message="Enter valid response"
      />
    </div>
  );
};

export default CreateQuiz;
