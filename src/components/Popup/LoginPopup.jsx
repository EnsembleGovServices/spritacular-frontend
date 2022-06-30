import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import {useState} from "react";
import PropTypes from "prop-types";

import Login from "../Auth/Login";
import ForgotPasswordPopup from "./ForgotPasswordPopup";
import { cdn } from "../../helpers/url";

const LoginPopup = (props) => {
  const { open, handleClose, modalClass } = props;
  const [ isForgotPasswordModal, setIsForgotPasswordModal ] = useState(false);
  const [ loginPopup, setLoginPopup ] = useState(true);

  // To show/hide modal
  const handleForgotPasswordModal = () => {
    setIsForgotPasswordModal(!isForgotPasswordModal);
    setLoginPopup(!loginPopup);
  };

  return (
      <>
        {loginPopup === true && <Modal
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
              <img src={`${cdn.url}/close-icon.svg`} alt="close-icon" />
            </Button>
          </ModalHeader>
          <ModalBody>
            <Login cp={()=> handleForgotPasswordModal()} />
          </ModalBody>
        </Modal>}
        {isForgotPasswordModal && (
            <ForgotPasswordPopup
                open={isForgotPasswordModal}
                handleClose={handleForgotPasswordModal}
            />
        )}

      </>
  );
};
LoginPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  cp: PropTypes.func,
};

export default LoginPopup;