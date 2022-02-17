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

const ForgotPasswordPopup = (props) => {
  const { open, handleClose, modalClass } = props;

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
                <a href="#" onClick={() => handleClose()}>Back To Login</a>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};
ForgotPasswordPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default ForgotPasswordPopup;
