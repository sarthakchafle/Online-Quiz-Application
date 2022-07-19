import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoggedin, setIsLoggedin] = useState(AuthService.isLoggedIn());
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
      <nav
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

          {currentUser && isLoggedin && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser && isLoggedin ? (
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
      </nav>
    </div>
  );
};

export default Navbar;
