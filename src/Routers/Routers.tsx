import { Route, Routes } from "react-router-dom";
import Login from "../views/Login";
import Registration from "../views/Registration";
import { TableUsers } from "../views/TableUsers";
import { PrivateRoute } from "../Hoc/PrivateRoute";
import { TripCreate } from "../views/TripCreate";
import Trip from "../views/Trips";

const Routers = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<PrivateRoute element={<TableUsers />} />} />
        <Route
          path="create-trip"
          element={<PrivateRoute element={<TripCreate />} />}
        />
        <Route path="trips" element={<PrivateRoute element={<Trip />} />} />

        <Route path="login" element={<Login />} />
        <Route path="sigh-up" element={<Registration />} />
      </Route>
    </Routes>
  );
};
export default Routers;
