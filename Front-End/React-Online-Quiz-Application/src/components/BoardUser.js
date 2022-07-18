import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
import { useLocation, Navigate } from "react-router-dom";


const BoardUser = () => {
  let location = useLocation()
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  if(!AuthService.isLoggedIn()) {
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

export default BoardUser;
