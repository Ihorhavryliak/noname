import React, { FormEvent, useState } from "react";

import { Button, Form, Container, Row } from "react-bootstrap";
import { RecaptchaVerifier, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup } from "firebase/auth";
import { auth, providerFacebook, providerGoogle } from "../lib/firebase-config";
import { useNavigate } from "react-router-dom";
import { usersCollectionRef } from "../lib/firestore.colections";
import { addDoc } from "firebase/firestore";
import { ConfirmCodeType } from "./Registration";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmCode, setConfirmCode] = useState({} as ConfirmCodeType);


  const onLogin = async () => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      addDoc(usersCollectionRef, { email: data.user.email });
      localStorage.setItem("isAuth", "true");
      return navigate("/");
    } catch (error) {
      console.log(error);
      localStorage.setItem("isAuth", "false");
    }
  };

  const onLoginGoogle = async () => {
    try {
      await signInWithPopup(auth, providerGoogle).then((response) => {
        console.log(response, "signInWithEmailAndPassword");
        localStorage.setItem("isAuth", "true");
        addDoc(usersCollectionRef, {
          email: response.user.email,
          firstName: response.user.displayName,
        });
        return navigate("/");
      });
    } catch (error) {
      console.log(error);
      localStorage.setItem("isAuth", "false");
    }
  };

  const onLoginPhone = async () => {
    try {
      const appVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        auth
      );
      await signInWithPhoneNumber(auth, phone, appVerifier).then(
        (response: any) => {
          setConfirmCode(response);
        }
      );
    } catch (error) {
      console.log(error);
      localStorage.setItem("isAuth", "false");
    }
  };

  const validateOtp = async () => {
    try {
      const result = await confirmCode.confirm(otp);
      localStorage.setItem("isAuth", "true");
      addDoc(usersCollectionRef, { phone: result.user.phoneNumber });
      return navigate("/");
    } catch (error) {
      console.log(error);
      localStorage.setItem("isAuth", "false");
    }
  };
  //facebook
  const onLoginFacebook = async () => {
    try {
      await signInWithPopup(auth, providerFacebook).then((response) => {
        console.log(response, "signInWithEmailAndPassword");
        localStorage.setItem("isAuth", "true");
        addDoc(usersCollectionRef, {
          email: response.user.email,
          firstName: response.user.displayName,
        });
        return navigate("/");
      });
    } catch (error) {
      console.log(error);
      localStorage.setItem("isAuth", "false");
    }
  };
  
  return (
    <Container>
    <Row className="justify-content-center align-items-center vh-100">
      <div>
        <h1>Sigh in</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <div className="mt-2">
          <Button onClick={() => onLogin()} variant="primary" type="submit">
            Sigh up
          </Button>
        </div>
        <div className="mt-2 test">
          <Button
            onClick={() => onLoginGoogle()}
            variant="primary"
            type="submit"
          >
            Sigh in with google
          </Button>
        </div>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Phone </Form.Label>
          <Form.Control
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder="Enter phone"
          />
        </Form.Group>
        <div id="recaptcha-container"></div>
        <div className="mt-2">
          <Button
            onClick={() => onLoginPhone()}
            variant="primary"
            type="submit"
          >
            Sigh in with phone number
          </Button>
        </div>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Code </Form.Label>
          <Form.Control
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            placeholder="Enter Code"
          />
        </Form.Group>
        <div className="mt-2">
          <Button
            onClick={() => validateOtp()}
            variant="primary"
            type="submit"
          >
            Sigh
          </Button>
        </div>

        <div className="mt-2">
          <Button
            onClick={() => onLoginFacebook()}
            variant="primary"
            type="submit"
          >
            Sigh with Facebook
          </Button>
        </div>
      </div>
    </Row>
  </Container>
  );
};

export default Login;
