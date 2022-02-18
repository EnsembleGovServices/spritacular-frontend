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
import "../../assets/scss/component/modal.scss";
import {useState} from "react";
import axios from "../../api/server";

const CHANGE_PASSWORD_URL = process.env.REACT_APP_API_URL;

const ChangePasswordPopup = (props) => {
  const { open, handleClose, modalClass, user } = props;

  const [password, setPassword] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChangePassword = async (e) => {
    e.preventDefault();
        await axios.put(CHANGE_PASSWORD_URL+'/users/change-password/'+user?.id+'/', password, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.access}`
          }
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
  }

  const handleInput = (e) => {
    e.preventDefault();
    let name = e.target.name,
        value = e.target.value;
    setPassword({
      ...password,
      [name]:value
    })
  }
  
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
        <Form onSubmit={handleChangePassword}>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Input
                  type="password"
                  name="old_password"
                  placeholder="Old Password"
                  required
                  onChange={(e)=>handleInput(e)}
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Input
                  type="password"
                  name="new_password"
                  placeholder="New Password"
                  required
                  onChange={(e)=>handleInput(e)}
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm New Password"
                  required
                  onChange={(e)=>handleInput(e)}
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup className="mb-0">
                <Button type="submit" className="modal-btn">
                  Update Password
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
