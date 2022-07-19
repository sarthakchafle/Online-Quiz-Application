import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import authHeader from "../services/auth-header";
import { useLocation, Navigate } from "react-router-dom";

const Profile = () => {
  const location = useLocation()
  const currentUser = AuthService.getCurrentUser();
  const USER_API = "http://localhost:8299/users-service/users/f/";

  const [data, setData] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(`${USER_API}${currentUser.id}`, {
      headers: authHeader(),
    });
    setData(data);
  };
  useEffect(() => {
    getData();
  });
  
  if(!AuthService.isLoggedIn()) {
    return (
      <Navigate to="/login" replace state={{ from: location }} />
    )
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Profile</h3>
      </header>
      <p>
        <strong>Name:</strong> {`${data.firstName} ${data.lastName} `}
      </p>
      <p>
        <strong>UserId:</strong> {data.userId}
      </p>
      <p>
        <strong>Email:</strong> {data.email}
      </p>
    </div>
  );
};

export default Profile;
