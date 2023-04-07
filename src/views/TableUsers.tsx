import { db } from "../lib/firebase-config";
import { Alert, Button, Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { doc, getDocs, updateDoc } from "firebase/firestore";
import { usersCollectionRef } from "../lib/firestore.colections";
import Wrapper, { UsersDataType } from "../Components/Wrapper/Wrapper";
import Notification from "../Components/Notification/Notification";

export const TableUsers = () => {
  const [role, setRole] = useState("");
  const [isUpdate, setIsUpdate] = useState(null as null | boolean);

  const [usersData, setUsersData] = useState([] as UsersDataType[]);

  useEffect(() => {
    getDocs(usersCollectionRef).then((response) => {
      const dates = response.docs.map((m) => ({
        data: m.data(),
        id: m.id,
      }));

      setUsersData([...dates] as UsersDataType[]);
    });
  }, []);

  const updateUserData = async (id: string) => {
    try {
      await updateDoc(doc(db, "user", id), { role: [role] }).then(() => {
        setIsUpdate(true);
      });
    } catch (error) {
      console.log(error);
      setIsUpdate(false);
    }
  };

 
  return (
    <Wrapper title={"Edit users"}>
      <>
        <Notification isSuccess={isUpdate} setIsSuccess={setIsUpdate} />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>N</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {usersData.length > 0 &&
              usersData.map((m, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{m.data.firstName}</td>
                    <td>{m.data.lastName}</td>
                    <td>{m.data.email}</td>
                    <td>{m.data.phone}</td>
                    <td>
                      <Form.Select
                        defaultValue={m.data.role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="driver">Driver</option>
                        <option value="passenger">Passenger</option>
                        <option value="dispatcher">Dispatcher</option>
                      </Form.Select>
                    </td>
                    <td>
                      <Button onClick={() => updateUserData(m.id)}>Save</Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </>
    </Wrapper>
  );
};
