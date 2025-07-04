import axios from "axios";

const API_URL = "http://localhost:8299/users-service/users";

const register = (firstName, lastName, email, password) => {
  return axios.post(API_URL + "/register", {
    firstName,
    lastName,
    password,
    email,
    "admin": false
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
        localStorage.setItem("user", response.headers.token);
        localStorage.setItem("userId", response.headers.userid);
        localStorage.setItem("isAdmin", response.headers.isadmin);
      }
      console.log(response.headers.token);
      return response.headers.token;
    });
};

const logout = () => {
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("userId");
  window.localStorage.removeItem("isAdmin");
};

const getCurrentUser = () => {
  return {
    user: localStorage.getItem("user"),
    id: localStorage.getItem("userId"),
    isAdmin: localStorage.getItem("isAdmin")
  };
};

const isLoggedIn = () => {
  if(localStorage.getItem("user")) {
    return true;
  }
  return false;
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  isLoggedIn
};

export default AuthService;
