import React, { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import AddedQuestions from "./AddedQuestions";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { postQuiz } from "../../services/quiz.service";
import AddQuestion from "./AddQuestion";

const CreateQuiz = () => {
  const [state, setState] = useState(0)
  const history = useNavigate();
  const [title, setTitle] = useState("");
  const [admin, setAdmin] = useState(false);
  const [count, setCount] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(3);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now() + 60 * 60 * 1000);
  const [formattedArray, setFormattedArray] = useState([]); //api
  let que = {
    title: title,
    question: formattedArray,
  }; // api

  useEffect(() => {
    UserService.getCreateQuiz().then(
      (response) => {
        setAdmin(true);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
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
  const handleStartTimeChange = (newValue) => {
    setStartTime(Date.parse(newValue));
  };
  const handleEndTimeChange = (newValue) => {
    setEndTime(Date.parse(newValue));
  };

  const handleSubmit = () => {
    console.log(que);
    postQuiz(que);
    setState(2)
    setCount(0)
    setTitle("")
    setNumberOfQuestions(3)
    setFormattedArray([])
  };

  const handleGoHome = (e) => {
    e.preventDefault();
    history("/");
  };

  if(!admin) {
    <Typography variant="h2" gutterBottom component="div">
      Quiz cannot be created. The user is not admin.
    </Typography>
  }

  return (
    <div className="p-4">
          {
            state === 0 ?
            <div container direction={"row"}>
              <TextField
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
              <FormControl sx={{ width: "100%" }} className="my-4">
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
              <Box>
                Time of Assignment will be : {timeSince(startTime, endTime)}
              </Box>
              <Button
                className="my-2"
                onClick={(e) => setState(1)}
                variant="contained"
                color="success"
              >
                {"Add Questions"}
              </Button>
            </div> : null}
            {
              state === 1 && count < numberOfQuestions ? <AddQuestion formattedArray={formattedArray} setFormattedArray={setFormattedArray} count={count} setCount={setCount}/> : null
            } 
            {
              state === 1 && count === numberOfQuestions ? 
              <>
                <AddedQuestions
                  array={formattedArray}
                  title={title}
                  time={timeSince(startTime, endTime)}
                />
                <Button
                onClick={(e) => handleSubmit(e)}
                sx={{ margin: "20px" }}
                variant="contained"
                color="success"
              >
                {"Submit"}
              </Button>
              </>: null
            }
            {
              state === 2 && <Typography>Congratulation, the quiz has been added</Typography>
            }
    </div>
  );
};

export default CreateQuiz;
