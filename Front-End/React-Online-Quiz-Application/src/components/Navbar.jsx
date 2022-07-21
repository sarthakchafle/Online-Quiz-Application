import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoggedin, setIsLoggedin] = useState(false);
  //const [createQuiz, setcreateQuiz] = useState(false);

  useEffect(() => {
    setIsLoggedin(AuthService.isLoggedIn)
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

  const [navBackground, setNavBackground] = useState(false);
  const navRef = useRef();
  navRef.current = navBackground;
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    //setcreateQuiz(false);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <nav
        className="navbar  fixed-top navbar-expand-lg navbar-light shadow-5-strong"
        style={{
          transition: "0.5s ease",
          backgroundColor: navBackground ? "	#f1f2f3" : "transparent",
        }}
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
              <Link to={"/profile"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {isLoggedin ? (
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
