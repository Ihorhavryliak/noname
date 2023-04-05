import React from "react";
import { Route, Routes } from 'react-router-dom'
import Login from "../views/Login";

const Routers = () => {
  return (
    <Routes>
       <Route path="/">
     {/*   <Route index element={<Login />} /> */}
     <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
};
export default Routers;
