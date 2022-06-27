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
import { Link } from "react-router-dom";
import { routeUrls } from './../../helpers/url';
import ReactCountryFlags from "../ReactCountryFlag";

const UserProfilePopup = (props) => {
  const [user, setUser] = useState(props);
  const { open, handleClose, modalClass, data } = props;
  const [error, setError] = useState(null);

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
                <ImageUpload user={data?.user} token={data?.token?.access} isProfilePopup={true} setPopupError={setError} popupError={error} />
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
                <ReactCountryFlags country={user?.country_code} />
                <p>{user?.location}</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
          {error?.size &&
            <span className="px-1 text-danger text-center d-block small mt-1">{error?.size}</span>
          }
          {error?.invalidImage &&
            <span className="px-1 text-danger text-center d-block small mt-1">{error?.invalidImage}</span>
          }
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup className="text-center mt-2">
              <Link
                to={routeUrls.profile}
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
