import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  FormFeedback,
  Row,
  Alert
} from "reactstrap";
import {useState} from "react";
import PropTypes from "prop-types";
import "../../assets/scss/component/modal.scss";
import axios from "../../api/axios";
import {baseURL, cdn} from "../../helpers/url";

const ForgotPasswordPopup = (props) => {
  const { open, handleClose, modalClass } = props;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState('');
  const handleInput = (e) => {
    e.preventDefault();
        setEmail(e.target.value);
}
  const handleResetPasswordLink = async (e) => {
    e.preventDefault();
    await axios.post(baseURL.api+'/users/password_reset/',{'email': email})
        .then((response) => {
          setSuccess('Password reset link sent successfully');
          setTimeout(() =>{
            handleClose();
          },3000)
        })
        .catch((error) => {
          setError(error.response);
            if (!error?.response) {
              process.env.NODE_ENV === "development" && console.log('Forgot password: server error occurred')
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
          Forgot Your Password
          <Button className="close-icon" onClick={() => handleClose()}>
            <img src={`${cdn.url}/close-icon.svg`} alt="close-icon" />
          </Button>
          <p>
            Please enter the email address you'd like your password reset
            information sent to{" "}
          </p>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col sm={12}>
              {success &&
                  <Alert color="success">
                    {success}
                  </Alert>
              }
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter email address" 
                    onChange={(e)=>handleInput(e)}
                    invalid={!!error?.data?.email}
                  />
                <FormFeedback>{error?.data?.email}</FormFeedback>
                </FormGroup>
              </Col>
              <Col sm={12}>
                <FormGroup>
                  <Button className="modal-btn" onClick={handleResetPasswordLink}>
                    Request reset link
                  </Button>
                </FormGroup>
              </Col>
              <Col sm={12}>
                <FormGroup className="text-center modal-bottom-text">
                  <Button onClick={() => handleClose()}> Back To Login </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
ForgotPasswordPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default ForgotPasswordPopup;
