import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8085/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getCreateQuiz = () => {
  return axios.get(API_URL + "createQuiz", { headers: authHeader() });
};

// const getUserDetails = () => {
//   axios
//     .get(`${USER_API}${localStorage.getItem("userId")}`, {
//       headers: authHeader(),
//     })
//     .then((response) => {
//       //console.log(response.data);
//       return response.data;
//     });
// };

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getCreateQuiz,
  // getUserDetails,
};

export default UserService;
