import React, {useEffect, useState} from "react";
import "./result.css";
import {useLocation, useNavigate} from 'react-router-dom'
import EvaluationService from "../services/evaluation.service";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Button} from '@mui/material';
import {getQuestionAnswer} from '../services/quiz.service'

const Result = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const [data, setData] = useState({})
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [allQuestionAnswer, setAllQuestionAnswer] = useState([])
  // const [error, setError] = useState(second)
  useEffect(() => {
    if (!location.state) {
      navigate("/allQuizzes", { replace: true});
    }
    getAnswers()
    getData()
  }, [])

  const getAnswers = async() => {
    let res = await getQuestionAnswer(location.state.title)
    setAllQuestionAnswer(res.data)
    console.log({res})
  }

  const getData = async() => {
    let res = await EvaluationService.evaluate(location.state.param)
    setData(res.data)
    let count = 0
    Object.values(res.data).forEach(item => count = item ? count + 1 : count);
    setScore(count)
    setLoading(false)
  }
  
  if(loading) {
    return (
        <Box sx={{ display: 'flex', flex: 1, alignItems: "center", justifyContent: "center", height: '100vh'}}>
          <CircularProgress />
        </Box>
    )
  }
  
  return (
    <React.Fragment>
      <div className="name">
        <h1 className="display-5 m-2">Title: {location.state.title}</h1>
      </div>
      <div style={{ textAlign: "center" }}>
        <h4>Your Score</h4>
        <h4>{score}/{Object.keys(data).length}</h4>
      </div>
      <div className="root" style={{padding: 40}}>
        <div>
          <div className="table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table table-hover mx-auto my-table shadow p-3 mb-5 bg-body rounded">
              <thead>
                <tr>
                  <th scope="col">Question</th>
                  <th scope="col">Correct Answer</th>
                  <th scope="col">Your Answer</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {
                  location.state.questions.map((ques, key) => {
                    let a = allQuestionAnswer.filter(obj => {
                      return obj.ques === ques.quesId
                    })
                    console.log({a})
                    return (
                      <tr className={`${data[ques.quesId] ? "table-success" : "table-danger"}`} key={key}>
                      <th style={{width: "500px"}} scope="row">{ques.question}</th>
                      <th style={{width: "500px"}} scope="row">{a[0].answer}</th>
                      <td>{data[ques.quesId] ? "1" : "0"}</td>
                    </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: "center" }}>Total Score: {score}/{Object.keys(data).length}</div>
          <div style={{ textAlign: "center" }}>
            <button type="button" className="btn m-2">
              Mail the Score
            </button>
            <button type="button" className="btn" onClick={() => setOpenDialog(true)}>
              Return to home
            </button>
          </div>
        </div>
      </div>
      <Dialog
        open={openDialog}
        keepMounted
        onClose={() => setOpenDialog(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Return to home"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Once you exit this page, you cannot view this page again. Are you sure you want to return to home?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/', {replace: true})}>Yes</Button>
          <Button onClick={() => setOpenDialog(false)}>No</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default Result;
