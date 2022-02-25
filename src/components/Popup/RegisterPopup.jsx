import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import Images from "../../static/images";
import PropTypes from "prop-types";
import "../../assets/scss/component/modal.scss";
import Register from "../Auth/Register";

const RegisterPopup = (props) => {
  const { open, handleClose, modalClass } = props;
  return (
    <Modal
      className={modalClass ? modalClass : "common-modal"}
      isOpen={open}
      toggle={handleClose}
      backdrop={true}
      keyboard={true}
      centered
    >
      <ModalHeader>
        <span>Sign Up</span>
        <Button className="close-icon" onClick={() => handleClose()}>
          <img src={Images.Modalcloseicon} alt="close-icon" />
        </Button>
      </ModalHeader>
      <ModalBody>
        <Register />
      </ModalBody>
    </Modal>
  );
};

RegisterPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default RegisterPopup;
