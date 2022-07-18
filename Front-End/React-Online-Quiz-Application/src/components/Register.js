import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useNavigate, Link } from "react-router-dom";
import { isEmail } from "validator";
import LoginRegisterCommon from "./LoginRegisterCommon";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();
  let navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    //e.preventDefault();

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

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(firstname, lastname, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          setTimeout(function () {
            // navigate("/login");
            // window.location.reload();
            handleLogin();
          }, 1500);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };
  

  return (
    <div className='d-flex' style={{height: "90vh"}}>
      <div className="d-flex justify-content-center align-items-center py-4 flex-column" style={{backgroundColor: "white", width: "50vw"}}>
        <h1 style={{color: "#533b7c"}}><b>Register</b></h1>
        <div style={{ height: "2px", width: '50px', backgroundColor: "#533b7c", marginTop: "10px", marginBottom: "10px" }} />
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="d-flex flex-row">
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  validations={[required]}
                />
              </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <button className="btn btn-primary btn-block" style={{backgroundColor: "#533b7c", borderColor: "#533b7c"}}>Register</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
          <div style={{alignSelf: "center", marginTop: "-10px", fontSize: "small"}}>
            Already have an account? 
            <Link to={"/login"}> Login</Link>
          </div>
        </Form>
      </div>
      <LoginRegisterCommon />
    </div>
  )

};

export default Register;
