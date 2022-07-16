import axios from "axios";

const API_URL = "http://localhost:8299/users-service/users";

const register = (firstName, lastName, email, password) => {
  return axios.post(API_URL + "/register", {
    firstName,
    lastName,
    password,
    email,
  });
};

const login = async(email, password) => {
  return await axios
    .post(
      API_URL + "/login",
      {
        email,
        password,
      },
      { "Access-Control-Expose-Headers": "*" }
    )
    .then((response) => {
      console.log(response);
      if (response.headers.token) {
        console.log(true);
        localStorage.setItem("user", response.headers.token);
        localStorage.setItem("userId", response.headers.userid);
      }
      console.log(response.headers.token);
      return response.headers.token;
    });
};

const logout = () => {
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("userId");
};

const getCurrentUser = () => {
  return {
    user: localStorage.getItem("user"),
    id: localStorage.getItem("userId"),
  };
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
