import React from 'react'
import quizGuy from '../assets/quizGuy.json'
import Lottie from "lottie-react";

export default function LoginRegisterCommon() {
  return (
    <div className="d-flex justify-content-center align-items-center py-4 flex-column" style={{backgroundColor: "#9f8cca", width: "60vw", color: "white"}}>
        <h1><b>Welcome to Quizerra!!</b></h1>
        <div style={{ height: "2px", width: '50px', backgroundColor: "white", marginTop: "10px", marginBottom: "10px" }} />
        <Lottie animationData={quizGuy} loop={true} />;
    </div>
  )
}
