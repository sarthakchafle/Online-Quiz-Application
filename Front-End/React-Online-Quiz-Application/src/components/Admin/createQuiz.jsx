import React, { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import Box from "@mui/material/Box";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import AddedQuestions from "./AddedQuestions";
import { postQuiz } from "../../services/quiz.service";
import AddQuestion from "./AddQuestion";
import AuthService from "../../services/auth.service";
import "./createquiz.css";
import NotAllowed from "../NotAllowed";

const CreateQuiz = () => {
  let navigate = useNavigate();
  const [state, setState] = useState(0);
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [admin, setAdmin] = useState("");
  const [count, setCount] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(3);
  const [formattedArray, setFormattedArray] = useState([]); //api
  let que = {
    title: title,
    question: formattedArray,
  }; // api

  useEffect(() => {
    console.log(AuthService.getCurrentUser().isAdmin);
    setAdmin(AuthService.getCurrentUser().isAdmin);
  }, []);
  function timeSince(firsttime, secondtime) {
    var seconds = Math.floor((secondtime - firsttime) / 1000);

    var interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years";

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months";

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days";

    interval = seconds / 3600;
    if (interval > 1)
      return (
        Math.floor(interval) +
        " hours, " +
        (seconds - Math.floor(interval) * 3600) / 60 +
        " mins "
      );

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ";

    return Math.floor(seconds) + " seconds";
  }
  const handleSubmit = () => {
    console.log(que);
    postQuiz(que);
    setState(2);
    setCount(0);
    setTitle("");
    setNumberOfQuestions(3);
    setFormattedArray([]);
  };

  if (admin === "false") {
    return (
      <NotAllowed />
    );
  }

  if (!AuthService.isLoggedIn()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className={"containerrr"}>
      {state === 0 ? (
        <div container direction={"row"}>
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
          <Box>Time of Assignment will be : 20 minutes</Box>
          <button
            className="btn-red-for-rest-pages my-2"
            onClick={(e) => setState(1)}
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
            time={"20 minutes"}
          />
          <Button
            onClick={(e) => handleSubmit(e)}
            sx={{ margin: "20px" }}
            variant="contained"
          >
            {"Submit"}
          </Button>
        </>
      ) : null}
      {state === 2 && (
        <div>
          <Typography>Congratulation, the quiz has been added</Typography>
          <Button
            variant="contained"
            href="/allQuizzes"
            sx={{ backgroundColor: "#533b7c" }}
          >
            <span style={{ color: "#fff" }}>Show Quizzes</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateQuiz;
