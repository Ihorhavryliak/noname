import React, { FormEvent, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { LoginForm } from "../Components/view/Login/LoginForm";
import { LoginGoogle } from "../Components/view/Login/LoginGoogle";
import { LoginFacebook } from "../Components/view/Login/LoginFacebook";
import { LoginPhone } from "../Components/view/Login/LoginPhone";
import { NavLink } from "react-router-dom";
import Notification from "../Components/Notification/Notification";

const Login = () => {
  const [isSuccess, setIsSuccess] = useState(null as null | boolean);

  return (
    <Container>
      <Row className="justify-content-center align-items-center vh-100">
        <div>
          <h1>Sign in</h1>
          <Notification setIsSuccess={setIsSuccess} isSuccess={isSuccess} />
          <LoginForm setIsSuccess={setIsSuccess} />
          <LoginGoogle setIsSuccess={setIsSuccess} />
          <LoginFacebook setIsSuccess={setIsSuccess} />
          <LoginPhone setIsSuccess={setIsSuccess} />
          <div className="mt-3">
            Don't have an account?
            <span className="ml-2">
              <NavLink to="/sign-up">Sign up here</NavLink>
            </span>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Login;
