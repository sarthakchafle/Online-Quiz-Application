import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8299/evaluation-service/api/";

const evaluate = async(param) => {
    return axios.post(API_URL + "evaluate", param,{
        headers: authHeader()
    })
}

const getQuizScoreByUser = async(quizId) => {
    return axios.get(`${API_URL}/score/${AuthService.getCurrentUser().id}/${quizId}`,{
        headers: authHeader()
    })
}

let EvaluationService = {
    evaluate,
    getQuizScoreByUser
}

export default EvaluationService