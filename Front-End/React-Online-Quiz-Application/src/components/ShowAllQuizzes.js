import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { getAllQuizzesTitles } from "../services/quiz.service";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { Input } from "@mui/material";
import AnswerService from "../services/answer.service";

export default function AllQuizzes() {
  let navigate = useNavigate()
  let location = useLocation();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState();
  const [originalData, setOriginalData] = useState([]);
  const [attemptedQuizIds, setAttemptedQuizIds] = useState([])
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const r = await AnswerService.getAllAttemptedQuiz();
    setAttemptedQuizIds(r.data)
    const res = await getAllQuizzesTitles();
    setOriginalData(res.data);
    setData(res.data);
  };

  const searchData = (e) => {
    let a = originalData;
    const filtered = a.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    });
    setData(filtered);
  };

  if (!AuthService.isLoggedIn()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="p-5 d-flex flex-column">
      <h1 style={{ fontWeight: 100, alignSelf: "center" }}>
        Available quizzes
      </h1>
      <div className="d-flex flex-row py-4 px-5 mx-5">
        <Input
          style={{ height: "50px" }}
          type="text"
          placeholder="Search"
          className="form-control"
          name="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-red-for-rest-pages mx-5" onClick={searchData}>
          Search
        </button>
        <button
          className="btn-red-for-rest-pages"
          onClick={() => setData(originalData)}
        >
          Reset
        </button>
      </div>
      <Grid
        container
        spacing={2}
        style={{ display: "flex", flexDirection: "row" }}
      >
        {data.map((item, key) => {
          return (
            <Grid item xs={6} md={4} lg={3} key={key}>
              <div
                className="d-flex align-items-center p-2 flex-column"
                style={{ backgroundColor: "#e3e3e3" }}
              >
                <h4 style={{maxWidth: "100px"}}>{item.title}</h4>
                <span>Time Limit: 20 minutes</span>
                  <Button
                    className="my-3 px-5"
                    variant="contained"
                    style={{ backgroundColor: attemptedQuizIds.includes(item.quiz_Id) ? "grey" : "#533b7c" }}
                    onClick={() => navigate("/quiz", { state: {title: item.title}, replace: true })}
                    // disabled={attemptedQuizIds.includes(item.quiz_Id)}
                  >
                    Start
                  </Button>  
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
