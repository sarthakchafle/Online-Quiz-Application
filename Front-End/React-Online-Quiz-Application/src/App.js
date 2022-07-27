import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import CreateQuiz from "./components/Admin/createQuiz";
import EventBus from "./common/EventBus";
import Quiz from "./components/Quiz";
import ShowAllQuizzes from "./components/ShowAllQuizzes";
import Homepage from "./components/Homepage";
import Result from "./components/Result";
import ViewProfile from './components/ViewProfile'
import Feedback from "./components/Feedback";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  //const [createQuiz, setcreateQuiz] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user.user) {
      setCurrentUser(user.id);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    //setcreateQuiz(false);
  };
  return (
    <div>
      {/* <nav
        className="navbar navbar-expand navbar-dark bg-dark"
        style={{ height: "10vh" }}
      >
        <Link to={"/"} className="navbar-brand">
          Online Quiz
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav> */}

      <div>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createQuiz" element={<CreateQuiz />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/allQuizzes" element={<ShowAllQuizzes />} />
          <Route path="/result" element={<Result />} />
          <Route path="/viewProfile" element={<ViewProfile />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
