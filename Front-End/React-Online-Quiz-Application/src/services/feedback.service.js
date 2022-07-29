import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8299/feedback-service/";

const sendFeedback = async (email, rating, review) => {
  return axios.post(API_URL + "feedback", {
      email,
      rating,
      review,
    },{
      headers: authHeader(),
    }
  );
};

const getFeedback = async() =>{
  return axios.get(API_URL + "getFeedback",{
      headers: authHeader() 
    }
  );
};

const FeedbackService = {
  sendFeedback,
  getFeedback
};

export default FeedbackService;
