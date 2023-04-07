import { Button } from "react-bootstrap";
import { signInWithPopup } from "firebase/auth";
import { auth, providerFacebook } from "../../../lib/firebase-config";
import { useNavigate } from "react-router-dom";
import { usersCollectionRef } from "../../../lib/firestore.colections";
import { addDoc } from "firebase/firestore";
import { LoginFormType } from "./LoginForm";

export const LoginFacebook = (props: LoginFormType) => {
  const { setIsSuccess } = props;
  const navigate = useNavigate();
  const onLoginFacebook = async () => {
    try {
      await signInWithPopup(auth, providerFacebook).then((response) => {
        console.log(response, "signInWithEmailAndPassword");
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
    <div className="mt-2">
      <Button onClick={() => onLoginFacebook()} variant="primary" type="submit">
        Sign in with Facebook
      </Button>
    </div>
  );
};
