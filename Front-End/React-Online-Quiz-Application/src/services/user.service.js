import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8299/users-service/users/f/";

const getProfile = async() => {
  return axios.get(`${API_URL}${AuthService.getCurrentUser().id}`);
}

const UserService = {
  getProfile
};

export default UserService;
