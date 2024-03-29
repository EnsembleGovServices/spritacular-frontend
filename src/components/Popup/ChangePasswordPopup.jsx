import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import PropTypes from "prop-types";
import "../../assets/scss/component/modal.scss";
import { Suspense, lazy } from 'react';
import { cdn } from "../../helpers/url";

const ChangePassword = lazy(()=> import('../Account/ChangePassword'))

const ChangePasswordPopup = (props) => {
  const { open, handleClose, modalClass, data } = props;

  return (
    <Modal
      className={modalClass ? modalClass : "common-modal"}
      isOpen={open}
      toggle={handleClose}
      centered
      backdrop={true}
      keyboard={false}
    >
      <ModalHeader className="text-center justify-content-center">
        Change Password
        <Button className="close-icon" onClick={() => handleClose()}>
          <img src={`${cdn.url}/close-icon.svg`} alt="close-icon" />
        </Button>
      </ModalHeader>
      <ModalBody>
        <Suspense fallback={<div>Loading...</div>}>
          <ChangePassword user={data} />
        </Suspense>
      </ModalBody>
    </Modal>
  );
};
ChangePasswordPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default ChangePasswordPopup;
