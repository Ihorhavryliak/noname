import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc } from "firebase/firestore";
import { usersCollectionRef } from "../../../lib/firestore.colections";
import { auth } from "../../../lib/firebase-config";

export type LoginFormType = {
  setIsSuccess: (val: null | boolean) => void;
};

export const LoginForm = (props: LoginFormType) => {
  const { setIsSuccess } = props;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      addDoc(usersCollectionRef, { email: data.user.email });
      localStorage.setItem("isAuth", "true");
      return navigate("/");
    } catch (error) {
      console.log(error);
      localStorage.setItem("isAuth", "false");
      setIsSuccess(false);
    }
  };
  return (
    <>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword" className="mt-2">
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
          Sign in
        </Button>
      </div>
    </>
  );
};
