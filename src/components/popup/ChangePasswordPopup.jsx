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
import "../../assets/scss/component/modal.scss";

const ChangePasswordPopup = (props) => {
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
      <ModalHeader className="text-center justify-content-center">
        Change Password
        <Button className="close-icon" onClick={() => handleClose()}>
          <img src={Images.Modalcloseicon} alt="close-icon" />
        </Button>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleLogin}>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  placeholder="Current Password"
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  placeholder="New Password"
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  placeholder="Confirm New Password"
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup className="mb-0">
                <Button type="submit" className="modal-btn" disabled>
                  Login
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};
ChangePasswordPopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default ChangePasswordPopup;
