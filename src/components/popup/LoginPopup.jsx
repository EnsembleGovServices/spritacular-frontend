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
import {useState} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

import Images from "../../static/images";
import PropTypes from "prop-types";
import ForgotPasswordPopup from "../popup/ForgotPasswordPopup";

import {toast} from "react-hot-toast";

const LOGIN_URL = process.env.REACT_APP_API_TOKEN_URL;

const LoginPopup = (props) => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState('');

  const { open, handleClose, modalClass } = props;
  const [ isForgotPasswordModal, setIsForgotPasswordModal ] = useState(false);


  const handleForgotPasswordModal = () => {
    setIsForgotPasswordModal(!isForgotPasswordModal);
  };

  function toastConfig(toastPosition, time) {
    return {
      position: toastPosition ?? 'top-right',
      duration: time ?? 4000,
    }
  }

  const handleInput = (e) => {
    e.preventDefault();
    let name = e.target.name,
        value = e.target.value;
    setUser({
      ...user,
      [name]:value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios.post(LOGIN_URL, user)
        .then((response) => {
          setError('');
          setAuth({
            token: {
              access: response?.data?.access,
              refresh: response?.data?.refresh,
            },
            user: response?.data
          })

          navigate(from, { replace: true });
          toast.success('Logged in successfully', toastConfig());
          localStorage.setItem('refresh', response?.data?.refresh)
        })
        .catch((error) => {
          if (!error?.response) {
            toast.error('Server error occurred', toastConfig());
          }
          else if (error?.response) {
            toast.error(error?.response?.statusText, toastConfig());
            setError({
              'status': error.response.status,
              'message': error.response.statusText,
              'data': error.response.data
            });
          }
          else if (error?.response?.status === 401) {
            toast.error('Unauthorized', toastConfig());
          }
          else {
            toast.error(error?.response?.statusText, toastConfig());
          }
        })
  }

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
          {error?.data &&
              <p className="text-danger small mb-4 fw-bolder">{error?.data?.detail}</p>
          }
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  autoComplete="off"
                  required
                  onChange={(e)=>handleInput(e)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={(e)=>handleInput(e)}
              />
            </FormGroup>
            <FormText className="forgot-password">
              <Button onClick={() => handleForgotPasswordModal()}>Forgot Password?</Button>
            </FormText>
            <FormGroup>
              <Button type="submit" className="modal-btn" disabled={!(user?.email && user?.password)}>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
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
};

export default LoginPopup;
