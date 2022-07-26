import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import authHeader from "../services/auth-header";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import "../components/profile.css";
import UserService from "../services/user.service";

const Profile = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const [data, setData] = useState([]);

  const getData = async () => {
    let res = await UserService.getProfile();
    setData(res.data);
  };
  useEffect(() => {
    getData();
  }, []);

  if (!AuthService.isLoggedIn()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div
      style={{
        backgroundColor: "#533b7c",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="profile-card">
        <div className="upper-container">
          <div className="image-container">
            <img
              src="data:image/png;base64,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"
              alt=""
              height="200px"
              width="200px"
            />
          </div>
        </div>
        <div className="lower-container">
          <div className="card-info">
            <p id="id1">
              <strong>{`${data.firstName} ${data.lastName} `}</strong>
            </p>
          </div>
          <div className="card-info">
            <p id="id2">
              <strong>UserId - {data.userId}</strong>
            </p>
          </div>
          <div className="card-info">
            <p id="id3">
              <strong>Email - {data.email}</strong>
            </p>
          </div>
          <button
            type="button"
            style={{ backgroundColor: "#533b7c" }}
            className="btn btn-primary"
            onClick={() => navigate("/viewProfile")}
          >
            View More
          </button>{" "}
          &nbsp; &nbsp;
          <button
            type="button"
            style={{ backgroundColor: "#533b7c" }}
            className="btn btn-danger"
            onClick={() => navigate("/")}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#533b7c", height: "90vh" }}>
      {
        <div className="card">
          <div className="upper-container">
            <div className="image-container">
              <img
                src="data:image/png;base64,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"
                alt=""
                height="200px"
                width="200px"
              ></img>
            </div>
          </div>
          <div className="lower-container">
            <div className="card-info">
              <p id="id1">
                <strong>{`${data.firstName} ${data.lastName} `}</strong>
              </p>
            </div>
            <div className="card-info">
              <p id="id2">
                <strong>UserId - {data.userId}</strong>
              </p>
            </div>
            <div className="card-info">
              <p id="id3">
                <strong>Email - {data.email}</strong>
              </p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: "#533b7c" }}
              className="btn btn-primary"
              onClick={() => navigate("/viewProfile")}
            >
              View More
            </button>{" "}
            &nbsp; &nbsp;
            <button
              type="button"
              style={{ backgroundColor: "#533b7c" }}
              className="btn btn-danger"
              onClick={() => navigate("/")}
            >
              Close
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default Profile;
