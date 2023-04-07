import { Button } from "react-bootstrap";
import { signInWithPopup } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, providerGoogle } from "../../../lib/firebase-config";
import { usersCollectionRef } from "../../../lib/firestore.colections";
import { LoginFormType } from "../Login/LoginForm";

export const RegistrationGoogle = (props: LoginFormType) => {
  const { setIsSuccess } = props;
  const navigate = useNavigate();
  const onSignUpGoogle = async () => {
    try {
      await signInWithPopup(auth, providerGoogle).then((response) => {
        console.log(response, "signInWithEmailAndPassword");
        localStorage.setItem("isAuth", "true");
        addDoc(usersCollectionRef, {
          email: response.user.email,
          firstName: response.user.displayName,
          role: ["passenger"],
          uid: response.user.uid,
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
      <Button onClick={() => onSignUpGoogle()} variant="primary" type="submit">
        Sign up with google
      </Button>
    </div>
  );
};
