import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import Images from "../../static/images";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import axios from "../../api/axios";
import { toast } from "react-hot-toast";
import "../../assets/scss/component/modal.scss";
import useAuth from "../../hooks/useAuth";
import PlacesAutocomplete from '../LocationSearchInput'
import LoginPopup from "./LoginPopup";

const REGISTER_URL = process.env.REACT_APP_API_REGISTER_URL;
const LOGIN_URL = process.env.REACT_APP_API_TOKEN_URL;
const RegisterPopup = (props) => {
  const { setAuth,auth, persist, setPersist } = useAuth();
  const { open, handleRegisterClose, handleOpenLogin,modalClass  } = props;
  const [userRegistration, setUserRegistration] = useState({
    first_name: "",
    last_name: "",
    email: "",
    location: "",
  });
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  

  function toastConfig(toastPosition, time) {
    return {
      position: toastPosition ?? "top-right",
      duration: time ?? 4000,
    };
  }

  // const setLocation = (location) => {
  //   setUserRegistration({
  //     ...userRegistration,
  //     location: location,
  //   })
  // }

  const handleInput = (e) => {
    let name = e.target.name,
      value = e.target.value;
    setUserRegistration({
      ...userRegistration,
      [name]: value,
    });
  };
  const handleCheck = (e) => {
    setUserRegistration({
      ...userRegistration,
      agreeTerms: !!e.target.checked,
    });
  };  

  const createNewUser = async (e) => {
    
    console.log(userRegistration);
    e.preventDefault();
    await axios
      .post(REGISTER_URL, userRegistration)
      .then((response) => {
        if (response.status === 201) {
          setError(null);
          setSuccess({
            status: response.status,
            data: response.data,
          });
          LoginUser();
        } else {
          toast.success(response?.statusText, toastConfig());
        }
      })
      .catch((error) => {
        setSuccess(null);
        if (!error?.response) {
          toast.error("Server error occurred", toastConfig());
        } else {
          setError({
            status: error.response.status,
            message: error.response.statusText,
            data: error.response.data,
          });
          // toast.error(error?.response?.statusText, toastConfig());
        }
        if (error) {
          console.log(error.response);
        }
      });
  };

  const LoginUser = async () => {
    await axios
      .post(LOGIN_URL, {
        email: userRegistration.email,
        password: userRegistration.password,
      })
      .then((response) => {
        setPersist(prev => !prev);
        setAuth(prev => {
          return {
            ...prev,
            token: {
              access: response?.data?.access,
              refresh: response?.data?.refresh
            },
            user: response?.data
          }
        });
        // toast.success(`Welcome, ${response.data.first_name}`, toastConfig());
        setUserRegistration(null);
        localStorage.setItem('refresh', response?.data?.refresh)
      })
      .catch((err) => {
        toast.error("Something went wrong", toastConfig());
      });
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist])

  return <>(
    <Modal
      className={modalClass ? modalClass : "common-modal"}
      isOpen={open}
      toggle={handleRegisterClose}
      backdrop={true}
      keyboard={true}
      centered
    >
      <ModalHeader>
      
        <span>Sign Up</span>
        <Button className="close-icon" onClick={() => handleRegisterClose()}>
          <img src={Images.Modalcloseicon} alt="close-icon" />
        </Button>
      </ModalHeader>
      <ModalBody>
        {success && (
          <p className="text-success small mb-4 fw-bolder">
            Signed up successfully
          </p>
        )}
        <Form onSubmit={createNewUser}>
          <Row>
            <Col sm={6}>
              <FormGroup>
                <Input
                  required
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  value={userRegistration?.first_name ?? ""}
                  onChange={(e) => handleInput(e)}
                  invalid={!!error?.data?.first_name}
                />
                <FormFeedback>{error?.data?.first_name}</FormFeedback>
              </FormGroup>
            </Col>
            
            <Col sm={6} className="">
              <FormGroup>
                <Input
                  required
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  value={userRegistration?.last_name ?? ""}
                  invalid={!!error?.data?.last_name}
                  onChange={(e) => handleInput(e)}
                />
                <FormFeedback>{error?.data?.last_name}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <FormGroup>
                <Input
                  required
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={userRegistration?.email ?? ""}
                  invalid={!!error?.data?.email}
                  onChange={(e) => handleInput(e)}
                />
                <FormFeedback>{error?.data?.email}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Input
                  required
                  type="password"
                  name="password"
                  placeholder="Password"
                  invalid={!!error?.data?.password}
                  onChange={(e) => handleInput(e)}
                />
                <FormFeedback>{error?.data?.password}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Input
                  required
                  type="select"
                  name="location"
                  onChange={(e) => handleInput(e)}
                >
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Pune">Pune</option>
                  <option value="Bombay">Bombay</option>
                </Input>
                {/* <PlacesAutocomplete setLocation = {setLocation}/> */}
                <FormFeedback>Location is required</FormFeedback>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    required
                    type="checkbox"
                    name="agreeTerms"
                    checked={userRegistration?.agreeTerms === true}
                    onChange={(e) => handleCheck(e)}
                  />
                  Creating an account means you agree with our with our{" "}
                  <a href="/">Privacy Policy</a> and <a href="/">Terms.</a>
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Button
            type="submit"
            className="modal-btn"
            disabled={
              userRegistration ? userRegistration?.agreeTerms !== true : false
            }
          >
            Create Account
          </Button>
        </Form>
        <p className="bottom-text">
          Already have an account? <span className="pointer fw-bold" onClick={handleOpenLogin}>Login</span>
        </p>
      </ModalBody>
    </Modal>
  );
  </>
};

RegisterPopup.propTypes = {
  open: PropTypes.bool,
  handleRegisterClose: PropTypes.func,
};

export default RegisterPopup;
