import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8299/feedback-service/feedback";

const sendFeedback = async (email, rating, review) => {
  return axios.post(
    API_URL,
    {
      email,
      rating,
      review,
    },
    {
      headers: authHeader(),
    }
  );
};
const FeedbackService = {
  sendFeedback,
};

export default FeedbackService;
