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

const CreateQuiz = () => {
  const [content, setContent] = useState("");
  const history = useNavigate();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  const [allAdded, setAllAdded] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [count, setCount] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(3);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now() + 60 * 60 * 1000);
  const [questions, setQuestions] = useState([]);
  const [formattedArray, setFormattedArray] = useState([]);
  let que = {
    title: title,
    question: formattedArray,
  };

  useEffect(() => {
    UserService.getCreateQuiz().then(
      (response) => {
        setContent(response.data);
        setAdmin(true);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

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
  const handleOption1 = (e) => {
    setOption1(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleQuestion = (e) => {
    setQuestion(e.target.value);
    console.log(question);
  };
  const handleOption2 = (e) => {
    setOption2(e.target.value);
  };
  const handleOption3 = (e) => {
    setOption3(e.target.value);
  };
  const handleOption4 = (e) => {
    setOption4(e.target.value);
  };
  const handleAdd = (e) => {
    //console.log("count: " + count);
    //console.log("no. of que: " + numberOfQuestions);
    e.preventDefault();

    setStarted(true);
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswer("");

    if (count < numberOfQuestions - 1) {
      setCount(count + 1);
      setQuestions((oldQues) => [...oldQues, que]);
      setFormattedArray((old) => [
        ...old,
        {
          question: question,
          option: [
            { answer: option1, correct: answer === option1 },
            { answer: option2, correct: answer === option2 },
            { answer: option3, correct: answer === option3 },
            { answer: option4, correct: answer === option4 },
          ],
        },
      ]);
      console.log(que);
    } else if (count === numberOfQuestions - 1) {
      setQuestions((oldQues) => [...oldQues, que]);
      setFormattedArray((old) => [
        ...old,
        {
          question: question,
          option: [
            { answer: option1, correct: answer === option1 },
            { answer: option2, correct: answer === option2 },
            { answer: option3, correct: answer === option3 },
            { answer: option4, correct: answer === option4 },
          ],
        },
      ]);

      console.log(que);
      setAllAdded(true);
    }
  };

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };
  const handleNumber = (event) => {
    setNumberOfQuestions(event.target.value);
  };

  const handleSubmit = () => {
    setEnded(true);
    console.log(que);
    postQuiz(que);
  };

  const handleGoHome = (e) => {
    e.preventDefault();
    history("/");
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom component="div">
        {content}
      </Typography>
      {admin && (
        <>
          <AddedQuestions
            array={formattedArray}
            title={title}
            time={timeSince(startTime, endTime)}
            question={question}
          />
          <form onSubmit={handleAdd}>
            <Grid container direction={"row"}>
              <TextField
                required={true}
                id="outlined-textarea"
                label="Title of Quiz"
                placeholder="title..."
                multiline
                fullWidth
                margin="dense"
                value={title}
                disabled={started}
                onChange={(e) => {
                  handleTitle(e);
                }}
              />
              <FormControl sx={{ width: "100%" }}>
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
                  onChange={handleNumber}
                  disabled={started}
                  input={<OutlinedInput label="Name" />}
                  fullWidth
                >
                  <MenuItem value={3}>{3}</MenuItem>
                  <MenuItem value={10}>{10}</MenuItem>
                  <MenuItem value={15}>{15}</MenuItem>
                  <MenuItem value={20}>{20}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container direction={"row"}>
              <TextField
                required={true}
                id="outlined-textarea"
                label="Question"
                placeholder="question..."
                multiline
                fullWidth
                margin="dense"
                value={question}
                onChange={(e) => {
                  handleQuestion(e);
                }}
              />
            </Grid>
            <Grid container direction={"row"}>
              <TextField
                required={true}
                id="outlined-textarea"
                label="Oprion 1"
                placeholder="option..."
                multiline
                margin="dense"
                value={option1}
                sx={{ width: "49%", marginRight: "2px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">a.</InputAdornment>
                  ),
                }}
                onChange={(e) => handleOption1(e)}
              />

              <TextField
                required={true}
                id="outlined-textarea"
                label="Oprion 2"
                placeholder="option..."
                multiline
                margin="dense"
                sx={{ width: "49%", marginLeft: "20px" }}
                value={option2}
                onChange={(e) => handleOption2(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">b.</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid container direction={"row"}>
              <TextField
                required={true}
                id="outlined-textarea"
                label="Oprion 3"
                placeholder="option..."
                multiline
                margin="dense"
                value={option3}
                onChange={(e) => handleOption3(e)}
                sx={{ width: "49%", marginRight: "2px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">c.</InputAdornment>
                  ),
                }}
              />

              <TextField
                required={true}
                id="outlined-textarea"
                label="Oprion 4"
                placeholder="option..."
                multiline
                margin="dense"
                value={option4}
                onChange={(e) => handleOption4(e)}
                sx={{ width: "49%", marginLeft: "20px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">d.</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid container direction={"row"}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-name-label">
                  Correct Answer...
                </InputLabel>
                <Select
                  required={true}
                  label="Correct Answer"
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={answer}
                  inputProps={{ "aria-label": "Without label" }}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  fullWidth
                >
                  <MenuItem value={option1}>{option1}</MenuItem>
                  <MenuItem value={option2}>{option2}</MenuItem>
                  <MenuItem value={option3}>{option3}</MenuItem>
                  <MenuItem value={option4}>{option4}</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box sx={{ margin: "5px 10px 5px 0 " }}>
                    <Typography sx={{ marginTop: "15px " }}>
                      Start Time
                    </Typography>
                    <DateTimePicker
                      value={startTime}
                      onChange={handleStartTimeChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Box>
                  <Box sx={{ margin: "5px 10px 5px 0 " }}>
                    <Typography sx={{ marginTop: "15px " }}>
                      End Time
                    </Typography>
                    <DateTimePicker
                      value={endTime}
                      onChange={handleEndTimeChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Box>
                </Box>
              </LocalizationProvider>
            </Grid>
            <Box>
              Time of Assignment will be : {timeSince(startTime, endTime)}
            </Box>
            <Button
              sx={{ margin: "20px" }}
              variant="contained"
              color="success"
              type="submit"
              disabled={allAdded && count === numberOfQuestions - 1}
            >
              {"Add"}
            </Button>
            {!ended && (
              <Button
                onClick={(e) => handleSubmit(e)}
                sx={{ margin: "20px" }}
                variant="contained"
                color="success"
                disabled={!allAdded}
              >
                {"Submit"}
              </Button>
            )}
          </form>
          {ended && (
            <div style={{ margin: "20px 0" }}>
              <Typography variant="h5" style={{ color: "#07b530" }}>
                Questions Added Succesfully!
              </Typography>
              <Button
                variant="contained"
                color="success"
                onClick={(e) => {
                  handleGoHome(e);
                }}
              >
                Go Home
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CreateQuiz;
