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
import { useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";

const CHANGE_PASSWORD_URL = process.env.REACT_APP_API_URL;

const ChangePasswordPopup = (props) => {
  const { open, handleClose, modalClass, data } = props;
  const [password, setPassword] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState(null);

  function toastConfig(toastPosition, time) {
    return {
      position: toastPosition ?? 'top-right',
      duration: time ?? 4000,
    }
  }


  const handleChangePassword = async (e) => {
    e.preventDefault();
    await axios.put(CHANGE_PASSWORD_URL+'/users/change-password/'+data?.user?.id+'/', password, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data?.token?.access}`
          },
          withCredentials: true,
    }).then((res) => {
          console.log(res);
          setUpdated(res?.data);
          setError('');
          toast.success(res?.data.message, toastConfig());
    }).catch((err) => {
          console.error(err.response);
          toast.error(err?.response?.statusText, toastConfig());
          setError(prev => {
            return {
              ...prev,
              error: err?.response?.data
            }
          });
        })
    }
  

  const handleInput = (e) => {
    e.preventDefault();
    let name = e.target.name,
        value = e.target.value;
    setPassword({
      ...password,
      [name]:value,
    })
  }

  const passwordMatchCheck = () => {
    if (password) {
      return password.confirm_password !== password.new_password
    }
    return true;
  }

  return (
    <Modal
      className={modalClass ? modalClass : "common-modal"}
      isOpen={updated ? false : open}
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
        {error?.detail &&
            <p className="text-danger small mb-4 fw-bolder">{error?.detail}</p>
        }
        {error?.details?.map((error, i) => {
          return(
              <div key={i}>
                <p className="text-danger small mb-4 fw-bolder">{error}</p>
              </div>
          )
        })}

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
                {error?.new_password &&
                    <span className="text-danger small mt-2 d-block">
                      {error?.new_password?.map((item, i)=> {
                        return(
                            <div key={i}>
                              <span>{item}</span><br/>
                            </div>
                        )
                      })}
                    </span>
                }
              </FormGroup>
            </Col>
            <Col md={12}>
              <Button type="submit" className="modal-btn mb-3" disabled={passwordMatchCheck()}>
                Update Password
              </Button>
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
  passwordMatchCheck: PropTypes.bool
};

export default ChangePasswordPopup;
