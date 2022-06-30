import {
  Button,
  Modal,
  ModalBody,
  Alert,
  ModalHeader,
} from "reactstrap";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { cdn } from "../../helpers/url";

const ShowErrorPopup = (props) => {
  const { modalClass, errorDisplay } = props;
  const [isOpenModal, setIsOpenModal] = useState(true);
  const navigate = useNavigate();
  const [error] = useState('');
  const handleCloseModal = () => {
    navigate('/')
    setIsOpenModal(false);
  }

  return (
    <>
      {<Modal
        className={modalClass ? modalClass : "common-modal"}
        isOpen={isOpenModal}
        centered
        backdrop={true}
        keyboard={false}
      >
        <ModalHeader>
          <Button className="close-icon" onClick={handleCloseModal}>
            <img src={`${cdn.url}/close-icon.svg`} alt="close-icon" />
          </Button>
        </ModalHeader>
        <ModalBody>
          {!error &&
            <Alert color="danger">
              {errorDisplay}
            </Alert>
          }
        </ModalBody>
      </Modal>
      }
    </>
  );
};

ShowErrorPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  cp: PropTypes.func,
};

export default ShowErrorPopup;