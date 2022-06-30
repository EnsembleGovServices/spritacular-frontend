import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ResetPassword from "../Auth/ResetPassword";
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "../../api/axios";
import { baseURL, cdn } from "../../helpers/url";
import ShowErrorPopup from "./ShowErrorPopup";

const ResetPasswordPopup = (props) => {
  const { modalClass } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // To close modal
  const handleCloseModal = () => {
    navigate('/')
    setIsOpenModal(false);
  }
  
  // To 
  useEffect(() => {
    axios.post(baseURL.api + '/users/password_reset/validate_token/', { 'token': token })
      .then((response) => {
        setSuccess(response);
        setIsOpenModal(true);
      })
      .catch((error) => {
        setIsOpenModal(false);
        if (!error?.response) {
          setError('server error occurred');
        }
        else {
          setError(error?.response?.statusText);
        }
      })
  }, [token]);

  console.log(success);

  return (
    <>
      {success &&
        <Modal
          className={modalClass ? modalClass : "common-modal"}
          isOpen={isOpenModal}
          centered
          backdrop={true}
          keyboard={false}
        >
          <ModalHeader>
            New Password
            <Button className="close-icon" onClick={handleCloseModal}>
              <img src={`${cdn.url}/close-icon.svg`} alt="close-icon" />
            </Button>
          </ModalHeader>
          <ModalBody>
            <ResetPassword token={token} />
          </ModalBody>
        </Modal>
      }
      {error &&
        <ShowErrorPopup modalClass={modalClass} errorDisplay={error} />
      }

    </>
  );
};

ResetPasswordPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  cp: PropTypes.func,
};

export default ResetPasswordPopup;