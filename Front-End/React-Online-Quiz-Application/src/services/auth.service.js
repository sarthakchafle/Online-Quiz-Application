import axios from "axios";

const API_URL = "http://localhost:8299/users-service/users";

const register = (firstName, lastName, email, password) => {
  return axios.post(API_URL, {
    firstName,
    lastName,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
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
      }
      console.log(response.headers.token);
      return response.headers.token;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return localStorage.getItem("user");
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
