import React from "react";
import Lottie from "lottie-react";
import PageNotFound from "../assets/page-not-found.json";
import { useNavigate } from "react-router-dom";
import { ButtonGroup } from "@mui/material";
const NotFound = () => {
  let navigate = useNavigate();
  return (
    <div>
      <Lottie
        animationData={PageNotFound}
        loop={true}
        style={{ height: "90vh" }}
      ></Lottie>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button
          className="btn-red-for-rest-pages"
          onClick={() => navigate("/")}
          style={{ alignSelf: "center" }}
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
