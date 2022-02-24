import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { Suspense, lazy } from 'react';
import {useState} from "react";
import Images from "../../static/images";
import PropTypes from "prop-types";

import Login from "../Auth/Login";

const ForgotPasswordPopup = lazy(()=> import('.//ForgotPasswordPopup'));

const LoginPopup = (props) => {
  const { open, handleClose, modalClass } = props;
  const [ isForgotPasswordModal, setIsForgotPasswordModal ] = useState(false);


  const handleForgotPasswordModal = () => {
    setIsForgotPasswordModal(!isForgotPasswordModal);
  };


  return (
    <>
      <Modal
          className={modalClass ? modalClass : "common-modal"}
          isOpen={open}
          toggle={handleClose}
          centered
          backdrop={true}
          keyboard={false}
      >
        <ModalHeader>
          Login
          <Button className="close-icon" onClick={() => handleClose()}>
            <img src={Images.Modalcloseicon} alt="close-icon" />
          </Button>
        </ModalHeader>
        <ModalBody>
            <Login />
        </ModalBody>
      </Modal>
      {isForgotPasswordModal && (
          <Suspense fallback={<div>Loading...</div>}>
            <ForgotPasswordPopup
                open={isForgotPasswordModal}
                handleClose={handleForgotPasswordModal}
            />
          </Suspense>
      )}

    </>
  );
};
LoginPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default LoginPopup;
