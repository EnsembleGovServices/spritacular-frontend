import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useState } from "react";
import Images from "../../static/images";
import PropTypes from "prop-types";
import ForgotPasswordPopup from "../popup/ForgotPasswordPopup";
import "../../assets/scss/component/modal.scss";

const LoginPopup = (props) => {
  const { open, handleClose, modalClass } = props;
  const [isForgotPasswordModal, setIsForgotPasswordModal] = useState(false);
  const handleForgotPasswordModal = () => {
    setIsForgotPasswordModal(!isForgotPasswordModal);
  };
  return (
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
        <Form>
          <FormGroup>
            <Input type="email" name="email" placeholder="Email address" />
          </FormGroup>
          <FormGroup>
            <Input type="password" name="password" placeholder="Password" />
          </FormGroup>
          <FormText className="forgot-password">
            <Button onClick={() => handleForgotPasswordModal()}>Forgot Password?</Button>
          </FormText>
          <FormGroup>
            <Button className="modal-btn" disabled>
              Login
            </Button>
          </FormGroup>
        </Form>
      </ModalBody>
      {isForgotPasswordModal && (
        <ForgotPasswordPopup
          open={isForgotPasswordModal}
          handleClose={handleForgotPasswordModal}
        />
      )}
    </Modal>
  );
};
LoginPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default LoginPopup;
