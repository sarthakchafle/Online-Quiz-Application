import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import LoginRegisterCommon from "./LoginRegisterCommon";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className='d-flex' style={{height: "90vh"}}>
      <div className="d-flex justify-content-center align-items-center py-4 flex-column" style={{backgroundColor: "white", width: "50vw"}}>
        <h1 style={{color: "#533b7c"}}><b>Sign in to Account</b></h1>
        <div style={{ height: "2px", width: '50px', backgroundColor: "#533b7c", marginTop: "10px", marginBottom: "10px" }} />
        <Form onSubmit={handleLogin} ref={form} class="d-flex flex-column">
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <Input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading} style={{backgroundColor: "#533b7c", borderColor: "#533b7c"}}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
          <div style={{alignSelf: "center", marginTop: "-10px", fontSize: "small"}}>
            Don't have an account? 
            <Link to={"/register"}> Register</Link>
          </div>
        </Form>
      </div>
      <LoginRegisterCommon />
    </div>
  )
};

export default Login;
