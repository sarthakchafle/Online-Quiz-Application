import React, { useState, useEffect } from "react";
import AuthService from '../services/auth.service'
import UserService from "../services/user.service";
import { useLocation, useNavigate } from "react-router";
import { Navigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  if(!AuthService.isLoggedIn()) {
    console.log("navigating to login")
    return (
      <Navigate to="/login" replace state={{ from: location }} />
    )
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Home;
