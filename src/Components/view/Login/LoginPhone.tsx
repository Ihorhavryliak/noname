import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { usersCollectionRef } from "../../../lib/firestore.colections";
import { addDoc } from "firebase/firestore";
import { auth } from "../../../lib/firebase-config";
import { ConfirmCodeType } from "../Registration/RegistrationPhone";
import { LoginFormType } from "./LoginForm";

export const LoginPhone = (props: LoginFormType) => {
  const { setIsSuccess } = props;
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmCode, setConfirmCode] = useState({} as ConfirmCodeType);

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
      setIsSuccess(false);
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
      setIsSuccess(false);
    }
  };

  return (
    <>
      <hr />
      <div className="mb-3">
        Data for test:
        <div>Phone number +1 650-555-3434</div>
        <div> Verification code: 333333</div>
      </div>
      {!confirmCode.verificationId ? (
        <>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Sign in with phone number </Form.Label>

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
              Sign in
            </Button>
          </div>
        </>
      ) : (
        <>
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
              Sign in
            </Button>
          </div>
        </>
      )}
    </>
  );
};
