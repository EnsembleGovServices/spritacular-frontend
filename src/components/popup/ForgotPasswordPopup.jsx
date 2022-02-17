import {useState} from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import Images from "../../static/images";
import PropTypes from "prop-types";
import LoginPopup from './LoginPopup';

const ForgotPasswordPopup = (props) => {
  const { open, handleClose, modalClass } = props;
  const [isLoginModal, setIsLoginModal] = useState(false);

  const handleLoginModal = () => {
    setIsLoginModal(!isLoginModal);
  };

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
            <img src={Images.Modalcloseicon} alt="close-icon" />
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
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                  />
                </FormGroup>
              </Col>
              <Col sm={12}>
                <FormGroup>
                  <Button className="modal-btn" disabled>
                    Request reset link
                  </Button>
                </FormGroup>
              </Col>
              <Col sm={12}>
                <FormGroup className="text-center modal-bottom-text">
                  <Button
                    // className="nav-link login-btn"
                    onClick={() => handleLoginModal()}
                  >
                    Back To Login
                  </Button>
                  {/* <a href="#"></a> */}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
      
      {isLoginModal && (
          <LoginPopup open={isLoginModal} handleClose={handleLoginModal} />
      )}
    </>
  );
};
ForgotPasswordPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default ForgotPasswordPopup;
