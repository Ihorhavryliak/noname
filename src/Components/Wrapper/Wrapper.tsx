import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase-config";
import { Button, Col, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export type UsersDataType = {
  data: {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phone: string;
    password: string;
    role: string[];
    city: string;
    trips: string[];
  };
  id: string;
};

type WrapperType = {
  children: JSX.Element;
  title: string;
};

const Wrapper = (props: WrapperType) => {
  const { children, title } = props;
  const navigate = useNavigate();
  const logOut = () => {
    try {
      signOut(auth).then(() => {
        localStorage.removeItem("isAuth");
        return navigate("/login");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row className="m-0">
      <Col xl={2} xxl={2} className="bg-dark mvh-100 ">
        <div className="p-4 text-light text-center">Logo</div>

        <div className="mt-5">
          <NavLink to="/">Edit users</NavLink>
        </div>
        <div className="mt-2">
          <NavLink to="/trips">Trips</NavLink>
        </div>
      </Col>
      <Col xl={10} xxl={10} className="p-0">
        <div className="p-4 bg-light d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M4 6H20V8H4zM4 11H20V13H4zM4 16H20V18H4z" />
              </svg>
            </span>
            <span> {title}</span>
          </div>
          <div>
            <Button
              variant="info"
              className="mr-2"
              onClick={() => navigate("/create-trip")}
            >
              Сreate a trip
            </Button>
            <Button variant="dark" onClick={() => logOut()}>
              logOut
            </Button>
          </div>
        </div>
        <div className="p-4 ">{children}</div>
      </Col>
    </Row>
  );
};
export default Wrapper;
