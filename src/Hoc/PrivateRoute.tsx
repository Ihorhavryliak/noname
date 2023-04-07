import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../lib/firebase-config";
import { getDataLocal } from "../utils/GetLocalStorageData";

export const PrivateRoute = ({ element }: PrivateRouteType) => {
/*   const [userData, setUserData] = useState([] as User[]);

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
  }, []); */
  
  if (!getDataLocal("isAuth") || getDataLocal("isAuth") === "false") {
    return <Navigate to="/login" />;
  }

  return element;
};

type PrivateRouteType = {
  element: JSX.Element;
};
