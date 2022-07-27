import React from "react";
import Lottie from "lottie-react";
import Notallowed from "../assets/not-allowed.json";
import { useNavigate } from "react-router-dom";

const NotAllowed = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Lottie
        animationData={Notallowed}
        loop={true}
        style={{ height: "70vh" }}
      ></Lottie>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 style={{ textAlign: "center" }}>
          You are not an admin, this page requires admin credentails
        </h3>
        <button
          className="btn-red-for-rest-pages my-3"
          onClick={() => navigate("/")}
          style={{ alignSelf: "center" }}
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default NotAllowed;
