import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";

const API_URL =
  "http://apigateway-env.eba-prjw3tjy.ap-southeast-1.elasticbeanstalk.com/answer-service/api/";

const saveAnswers = (param) => {
  try {
    return axios.post(API_URL + "saveAnswer", param, {
      headers: authHeader(),
      "Content-Type": "application/json",
    });
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getAllAttemptedQuiz = () => {
  return axios.get(API_URL + "getAllAttemptedQuiz", {
    params: { user_id: AuthService.getCurrentUser().id },
    headers: authHeader(),
  });
};

const AnswerService = {
  saveAnswers,
  getAllAttemptedQuiz,
};

export default AnswerService;
