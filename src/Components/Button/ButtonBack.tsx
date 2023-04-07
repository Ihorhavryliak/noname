import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ButtonBack = () => {
  const navigate = useNavigate();
  return (
    <Button variant="light" onClick={() => navigate("/")}>
      Back
    </Button>
  );
};
export default ButtonBack;
