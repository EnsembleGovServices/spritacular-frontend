import Login from "../../components/Auth/Login";
import { Container } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import "../../assets/scss/component/modal.scss";
import { routeUrls } from './../../helpers/url';
import ForgotPasswordPopup from "../../components/Popup/ForgotPasswordPopup";
import {useState} from "react";

const LoginPage = () => {
  const { auth, persist } = useAuth();
  const location = useLocation();

  const [ isForgotPasswordModal, setIsForgotPasswordModal ] = useState(false);

  const handleForgotPasswordModal = () => {
    setIsForgotPasswordModal(!isForgotPasswordModal);
  };

  if (auth && persist) {
    return <Navigate to={routeUrls.home} state={{ from: location }} replace />;
  }

  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <Container>
        <div className="common-modal modal-content-page">
          <div className="modal-content ">
            <div className="modal-body">
              <Login  cp={()=> handleForgotPasswordModal()}/>
            </div>
          </div>
        </div>
        {isForgotPasswordModal && (
            <ForgotPasswordPopup
                open={isForgotPasswordModal}
                handleClose={handleForgotPasswordModal}
            />
        )}

      </Container>
    </section>
  );
};
export default LoginPage;
