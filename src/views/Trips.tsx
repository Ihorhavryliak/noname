import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { tripsCollectionRef } from "../lib/firestore.colections";
import Wrapper from "../Components/Wrapper/Wrapper";

type TripDataType = {
  data: {
    addressFrom: string;
    addressTo: string;
    date: string;
    id_user: string;
    number_car: string;
    number_passengers: number;
  };
  id: string;
};
const Trips = () => {
  const [isUpdate, setIsUpdate] = useState(null as null | boolean);

  const [tripData, setTripData] = useState([] as TripDataType[]);
console.log(tripData, 'tripData')
  useEffect(() => {
    getDocs(tripsCollectionRef).then((response) => {
      const dates = response.docs.map((m) => ({
        data: m.data(),
        id: m.id,
      }));

      setTripData([...dates] as TripDataType[]);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsUpdate(null);
    }, 3000);
  }, [isUpdate]);

  return (
    <Wrapper title={"Trips"}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>N</th>
            <th>Date / Time</th>
            <th>From (address)</th>
            <th>To (address)</th>
            <th>Number of car</th>
            <th>Number of passengers</th>
          </tr>
        </thead>
        <tbody>
          {tripData.length > 0 &&
            tripData.map((m, i) => {
              return (
                <tr key={m.id}>
                  <td>{i + 1}</td>
               <td>{m.data.date}</td> 
                <td>{m.data.addressFrom}</td>
                      <td>{m.data.addressTo}</td>
                 <td>{m.data.number_car}</td>
                  <td>{m.data.number_passengers}</td> 
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default Trips;
