import { Button } from "react-bootstrap";
import { signInWithPopup } from "firebase/auth";
import { auth, providerFacebook } from "../../../lib/firebase-config";
import { addDoc } from "firebase/firestore";
import { usersCollectionRef } from "../../../lib/firestore.colections";
import { useNavigate } from "react-router-dom";
import { LoginFormType } from "../Login/LoginForm";

export const RegistrationFacebook = (props: LoginFormType) => {
  const { setIsSuccess } = props;
  const navigate = useNavigate();
  const onSignUpFacebook = async () => {
    try {
      await signInWithPopup(auth, providerFacebook).then((response) => {
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
    <div className="mt-2">
      <Button
        onClick={() => onSignUpFacebook()}
        variant="primary"
        type="submit"
      >
        Sign up with Facebook
      </Button>
    </div>
  );
};
