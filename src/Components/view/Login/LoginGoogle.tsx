import { Button } from "react-bootstrap";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc } from "firebase/firestore";
import { auth, providerGoogle } from "../../../lib/firebase-config";
import { usersCollectionRef } from "../../../lib/firestore.colections";
import { LoginFormType } from "./LoginForm";

export const LoginGoogle = (props: LoginFormType) => {
  const { setIsSuccess } = props;
  const navigate = useNavigate();
  const onLoginGoogle = async () => {
    try {
      await signInWithPopup(auth, providerGoogle).then((response) => {
        localStorage.setItem("isAuth", "true");
        addDoc(usersCollectionRef, {
          email: response.user.email,
          firstName: response.user.displayName,
        });
        return navigate("/");
      });
    } catch (error) {
      console.log(error);
      localStorage.setItem("isAuth", "false");
      setIsSuccess(false);
    }
  };

  return (
    <div className="mt-2 test">
      <Button onClick={() => onLoginGoogle()} variant="primary" type="submit">
        Sign in with google
      </Button>
    </div>
  );
};
