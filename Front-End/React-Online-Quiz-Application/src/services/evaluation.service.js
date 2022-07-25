import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8299/evaluation-service/api/";

const evaluate = (param) => {
    return axios.post(API_URL + "/evaluate", param,{
        headers: authHeader()
    })
}

let EvaluationService = {
    evaluate
}

export default EvaluationService