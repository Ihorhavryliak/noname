import { useEffect } from "react";
import { Alert } from "react-bootstrap";

type NotificationType = {
  isSuccess: null | boolean;
  setIsSuccess: (val: null | boolean) => void;
};
const Notification = (props: NotificationType) => {
  const { isSuccess, setIsSuccess } = props;

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(null);
    }, 3000);
  }, [isSuccess]);

  return (
    <>
      {isSuccess && (
        <Alert variant="success" onClick={() => setIsSuccess(!isSuccess)}>
          Success!
        </Alert>
      )}
      {isSuccess === false && (
        <Alert variant="danger" onClick={() => setIsSuccess(!isSuccess)}>
          Error!
        </Alert>
      )}
    </>
  );
};
export default Notification;
