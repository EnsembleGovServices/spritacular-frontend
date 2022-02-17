import {
  Button,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import Images from "../../static/images";
import PropTypes from "prop-types";

const UserProfilePopup = (props) => {
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
        Thank you!
        <Button className="close-icon" onClick={() => handleClose()}>
          <img src={Images.Modalcloseicon} alt="close-icon" />
        </Button>
        <p>Welcome to the Spritacular Team</p>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col md={5}>
              <FormGroup className="custome-file-upload">
                <div className="file-upload-inner">
                  <Label for="profile-update">
                    Upload your profile picture
                  </Label>
                  <Input type="file" name="file" id="profile-update" />
                </div>
              </FormGroup>
            </Col>
            <Col md={7}>
              <div className="user-info">
                <p>90e87d797c5b</p>
                <h4>Carl Nielsen</h4>
                <FormText>carlnielsen@email.com</FormText>
                <div className="user-country d-flex align-items-center">
                  <img src={Images.UsaFlag} alt="Usa-Flag" />
                  <p>Edmon, OK, USA</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup className="text-center">
                <Button className="bg-modal-btn">Continue</Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};
UserProfilePopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default UserProfilePopup;
