import { Button, Form } from "react-bootstrap";
import Wrapper from "../Components/Wrapper/Wrapper";
import { useNavigate } from "react-router-dom";
import { addDoc, getDocs } from "firebase/firestore";
import { tripsCollectionRef } from "../lib/firestore.colections";
import React, { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase-config";
import Notification from "../Components/Notification/Notification";
import ButtonBack from "../Components/Button/ButtonBack";

export const TripCreate = () => {
  const navigate = useNavigate();
  const [numberCar, setNumberCar] = useState("");
  const [numberPassengers, setNumberPassengers] = useState("");
  const [addressFrom, setAddressFrom] = useState("");
  const [addressTo, setAddressTo] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isSuccess, setIsSuccess] = useState(null as null | boolean);
  const [userData, setUserData] = useState([] as User[]);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (currentUser) => {
      const user = currentUser as User;
      if (user) {
        setUserData([user]);
        localStorage.setItem("isAuth", "true");
      } else {
        setUserData([]);
        localStorage.setItem("isAuth", "false");
      }
    });

    return () => listen();
  }, []);

  const createTrip = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    debugger;
    const dateNew = date + " " + time;
    try {
      await addDoc(tripsCollectionRef, {
        addressFrom: addressFrom,
        addressTo: addressTo,
        date: dateNew,
        id_user: userData[0].uid,
        number_car: numberCar,
        number_passengers: +numberPassengers,
      }).then((response) => {
        setNumberCar("");
        setNumberPassengers("");
        setAddressFrom("");
        setAddressTo("");
        setTime("");
        setDate("");
        setIsSuccess(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper title={"Create trip"}>
      <div>
        <ButtonBack />
        <Notification isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
        <div className="mt-3">
          <Form onSubmit={(e) => createTrip(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Number of car</Form.Label>
              <Form.Control
                value={numberCar}
                onChange={(e) => setNumberCar(e.target.value)}
                type="text"
                placeholder="Number of car"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Number of passengers</Form.Label>
              <Form.Control
                value={numberPassengers}
                onChange={(e) => setNumberPassengers(e.target.value)}
                type="number"
                placeholder="Number of passengers"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>From (address)</Form.Label>
              <Form.Control
                value={addressFrom}
                onChange={(e) => setAddressFrom(e.target.value)}
                type="text"
                placeholder="Address"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>To (address)</Form.Label>
              <Form.Control
                value={addressTo}
                onChange={(e) => setAddressTo(e.target.value)}
                type="text"
                placeholder="Address"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                value={time}
                onChange={(e) => setTime(e.target.value)}
                type="time"
                placeholder="Time"
              />
            </Form.Group>

            <div className="text-right mt-4">
              <Button variant="primary" type="submit">
                Create trip
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};
