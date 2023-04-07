import { Button, Form, Container, Row } from "react-bootstrap";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";
import {
  auth,
  db,
  providerFacebook,
  providerGoogle,
} from "../lib/firebase-config";
import { FormEvent, useEffect, useState } from "react";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { usersCollectionRef } from "../lib/firestore.colections";
import { useNavigate } from "react-router-dom";

export type ConfirmCodeType = {
  confirm: (val: string) => { user: { phoneNumber: string; uid: string } };
  verificationId: string;
};

const Registration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmCode, setConfirmCode] = useState({} as ConfirmCodeType);
  console.log(confirmCode);

  const onSighUp = async () => {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      addDoc(usersCollectionRef, {
        email: data.user.email,
        role: ["passenger"],
        uid: data.user.uid,
      });
      localStorage.setItem("isAuth", "true");
      return navigate("/");
    } catch (error) {
      console.log(error);
      localStorage.setItem("isAuth", "true");
    }
  };

  const onSighUpGoogle = async () => {
    try {
      await signInWithPopup(auth, providerGoogle).then((response) => {
        console.log(response, "signInWithEmailAndPassword");
        localStorage.setItem("isAuth", "true");
        addDoc(usersCollectionRef, {
          email: response.user.email,
          firstName: response.user.displayName,
          role: ["passenger"],
          uid: response.user.uid,
        });
        return navigate("/");
      });
    } catch (error) {
      console.log(error);
      localStorage.setItem("isAuth", "false");
    }
  };

  const onSighUpPhone = async () => {
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
      addDoc(usersCollectionRef, {
        phone: result.user.phoneNumber,
        role: ["passenger"],
        uid: result.user.uid,
      });
      return navigate("/");
    } catch (error) {
      console.log(error);
      localStorage.setItem("isAuth", "false");
    }
  };
  //facebook
  const onSighUpFacebook = async () => {
    try {
      await signInWithPopup(auth, providerFacebook).then((response) => {
        console.log(response, "signInWithEmailAndPassword");
        localStorage.setItem("isAuth", "true");
        addDoc(usersCollectionRef, {
          email: response.user.email,
          firstName: response.user.displayName,
          role: ["passenger"],
          uid: response.user.uid,
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
          <h1>Sigh up</h1>
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
            <Button onClick={() => onSighUp()} variant="primary" type="submit">
              Sigh up
            </Button>
          </div>
          <div className="mt-2 test">
            <Button
              onClick={() => onSighUpGoogle()}
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
              onClick={() => onSighUpPhone()}
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
              onClick={() => onSighUpFacebook()}
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

export default Registration;
