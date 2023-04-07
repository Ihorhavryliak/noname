import { Button, Form } from "react-bootstrap";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../lib/firebase-config";
import { usersCollectionRef } from "../../../lib/firestore.colections";
import { LoginFormType } from "../Login/LoginForm";

export const RegistrationForm = (props: LoginFormType) => {
  const { setIsSuccess } = props;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = async () => {
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
        <Button onClick={() => onSignUp()} variant="primary" type="submit">
          Sign up
        </Button>
      </div>
    </>
  );
};
