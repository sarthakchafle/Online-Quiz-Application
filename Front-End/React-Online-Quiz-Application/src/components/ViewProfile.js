import React, { useEffect, useState } from "react";
import AnswerService from "../services/answer.service";
import trophy from "../assets/trophy.json";
import { Navigate, useLocation} from "react-router-dom";
import Lottie from "lottie-react";
import EvaluationService from "../services/evaluation.service";
import LoadingSpinner from "./LoadingSpinner";
import AuthService from "../services/auth.service";

const ViewProfile = () => {
  let location = useLocation()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchMyAPI() {
      getData();
      await new Promise((r) => setTimeout(r, 1000));
      setLoading(false);
    }
    fetchMyAPI();
  }, []);

  const getData = async () => {
    let res = await AnswerService.getAllAttemptedQuiz();
    let a = [];
    await Promise.all(
      res.data.map(async (i) => {
        await EvaluationService.getQuizScoreByUser(i.quiz_Id).then(
          (response) => {
            i.score = response ? response.data : 0;
          },
          (error) => {
            i.score = 0;
          }
        );
        a.push(i);
      })
    );
    setData(a);
  };

  if(!AuthService.isLoggedIn()) {
    return (
      <Navigate to="/login" replace state={{ from: location }} />
    )
  }
  if (loading) {
    return <LoadingSpinner asOverlay />;
  }
  return (
    <div style={{ backgroundColor: "#533b7c" }}>
      <div style={{ height: "30vh", backgroundColor: "beige" }}>
        <center>
          <Lottie
            animationData={trophy}
            loop={true}
            style={{ height: "150px" }}
          />
          <h1>Miletstones Achieved</h1>
        </center>
      </div>
      <div style={{ backgroundColor: "#533b7c", padding: "40px", minHeight: "70vh" }}>
        <table
          className="table table-hover mx-auto rounded shadow"
          style={{ backgroundColor: "#f7fdcb", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th scope="col">Attempted Quiz</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{item.title}</th>
                  <td>{item.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ViewProfile;
