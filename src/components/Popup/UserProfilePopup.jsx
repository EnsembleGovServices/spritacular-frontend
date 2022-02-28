import {
  Button,
  Col,
  FormGroup,
  FormText,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import Images from "../../static/images";
import PropTypes from "prop-types";
import "../../assets/scss/component/modal.scss";
import ImageUpload from "../Upload/ImageUpload";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const UserProfilePopup = (props) => {
  const [user, setUser] = useState(props);
  const { open, handleClose, modalClass, data } = props;

  useEffect(() => {
    setUser(data?.user);
  }, [data]);

  return (
    <Modal
      className={modalClass ? modalClass : "common-modal"}
      isOpen={open}
      centered
      backdrop={true}
      keyboard={false}
    >
      <ModalHeader className="text-center justify-content-center">
        Thank you!
        <Button className="close-icon" onClick={() => handleClose()}>
          <img src={Images.Modalcloseicon} alt="close-icon" />
        </Button>
        <p>Welcome to the Community! It is great to have you here.</p>
      </ModalHeader>
      <ModalBody>
        <Row className="align-items-center">
          <Col md={5}>
            <FormGroup className="custom-file-upload">
              <div className="file-upload-inners">
                <ImageUpload user={data?.user} token={data?.token?.access} />
              </div>
            </FormGroup>
          </Col>
          <Col md={7}>
            <div className="user-info">
              <p>90e87d797c5b</p>
              <h4>
                {user?.first_name} {user?.last_name}
              </h4>
              <FormText>{user?.email}</FormText>
              <div className="user-country d-flex align-items-center">
                <img src={Images.UsaFlag} alt="Usa-Flag" />
                <p>{user?.location}</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup className="text-center mt-4">
              <Link
                to="/profile"
                onClick={() => handleClose()}
                className="btn btn-secondary bg-modal-btn d-inline-block mt-2"
              >
                Continue
              </Link>
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};
UserProfilePopup.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default UserProfilePopup;
