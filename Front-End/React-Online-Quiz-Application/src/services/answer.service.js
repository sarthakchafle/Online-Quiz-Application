import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8299/answer-service/api/";

const saveAnswers = (param) => {
	console.log(param);
	try {
		return axios.post(API_URL + "saveAnswer", param, {
		headers: authHeader(),
		"Content-Type": "application/json",
		});
	} catch (err) {
		console.log(err);
		return [];
	}
}
const AnswerService = {
    saveAnswers
};
  
export default AnswerService;

