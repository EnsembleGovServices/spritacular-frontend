import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import PropTypes from "prop-types";
import "../../assets/scss/component/modal.scss";
import Register from "../Auth/Register";
import { cdn } from "../../helpers/url";

const RegisterPopup = (props) => {
  const {open, handleClose, handleLoginModal, modalClass} = props;

  return (
      <Modal
          className={`common-modal ${modalClass ? modalClass : ''}`}
          isOpen={open}
          toggle={handleClose}
          backdrop={true}
          keyboard={true}
          centered
      >
        <ModalHeader>
          <span>Sign Up</span>
          <Button className="close-icon" onClick={() => handleClose()}>
            <img src={`${cdn.url}/close-icon.svg`} alt="close-icon"/>
          </Button>
        </ModalHeader>
        <ModalBody>
          <Register handleLogin={handleLoginModal}/>
        </ModalBody>
      </Modal>
  );
};

RegisterPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default RegisterPopup;
