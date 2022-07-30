import axios from "axios";
import AuthService from "./auth.service";

const API_URL =
  "http://apigateway-env.eba-prjw3tjy.ap-southeast-1.elasticbeanstalk.com/users-service/users/f/";

const getProfile = async () => {
  return axios.get(`${API_URL}${AuthService.getCurrentUser().id}`);
};

const UserService = {
  getProfile,
};

export default UserService;
