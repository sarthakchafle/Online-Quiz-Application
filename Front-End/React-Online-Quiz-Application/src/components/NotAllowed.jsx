import React from "react";
import Lottie from "lottie-react";
import Notallowed from "../assets/not-allowed.json";
import { useNavigate } from "react-router-dom";

const NotAllowed = () => {
  const navigate = useNavigate();
  return (
    <div style={{backgroundColor: "#533b7c", height: "100vh", paddingTop: "100px"}}>
      <Lottie
        animationData={Notallowed}
        loop={true}
        style={{ height: "60vh"}}
      />
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 style={{ textAlign: "center", color: "white" }}>
          You are not an admin, this page requires admin credentials
        </h3>
        <button
          className="btn-red-for-rest-pages my-3"
          onClick={() => navigate("/")}
          style={{ alignSelf: "center" }}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NotAllowed;
