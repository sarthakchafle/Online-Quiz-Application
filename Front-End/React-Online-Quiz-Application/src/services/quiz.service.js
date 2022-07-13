import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8299/quiz-service/api/";

export const postQuiz = async (data) => {
  console.log(data);
  try {
    return axios.post(API_URL + "addQuiz", data, {
      headers: authHeader(),
      "Content-Type": "application/json",
    });
  } catch (err) {
    console.log(err);
    return [];
  }
};
export const getAllQuizzes = async () => {
  return axios.get(
    API_URL + "getAllQuizzes",

    { headers: authHeader() }
  );
};
