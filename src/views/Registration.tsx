import { Container, Row } from "react-bootstrap";
import { RegistrationFacebook } from "../Components/view/Registration/RegistrationFacebook";
import { RegistrationForm } from "../Components/view/Registration/RegistrationForm";
import { RegistrationPhone } from "../Components/view/Registration/RegistrationPhone";
import { RegistrationGoogle } from "../Components/view/Registration/RegistrationGoogle";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Notification from "../Components/Notification/Notification";

const Registration = () => {
  const [isSuccess, setIsSuccess] = useState(null as null | boolean);

  return (
    <Container>
      <Row className="justify-content-center align-items-center vh-100">
        <div>
          <h1>Sign up</h1>
          <Notification setIsSuccess={setIsSuccess} isSuccess={isSuccess} />
          <RegistrationForm setIsSuccess={setIsSuccess} />
          <RegistrationGoogle setIsSuccess={setIsSuccess} />
          <RegistrationFacebook setIsSuccess={setIsSuccess} />
          <RegistrationPhone setIsSuccess={setIsSuccess} />
          <div className="mt-3">
            Have an account?
            <span className="ml-2">
              <NavLink to="/login">Sign in here</NavLink>
            </span>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Registration;
