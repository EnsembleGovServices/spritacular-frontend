import {
    Button,
    Modal,
    ModalBody,
    Row,
    Col,
    Alert,
    ModalHeader,
  } from "reactstrap";
  import {useEffect, useState} from "react";
  import Images from "../../static/images";
  import PropTypes from "prop-types";
  
  import Login from "../Auth/Login";
  import ForgotPasswordPopup from "./ForgotPasswordPopup";
import ResetPassword from "../Auth/ResetPassword";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from "../../api/axios";
import {baseURL} from "../../helpers/url";



  
  const ShowErrorPopup = (props) => {
    const { modalClass, errorDisplay } = props;
    const [isOpenModal,setIsOpenModal] = useState(true);
    const navigate = useNavigate();    
    const [error, setError] = useState('');
    const handleCloseModal = () => {
        navigate('/')
        setIsOpenModal(false);
    }
    
    return (
        <>
          { <Modal
              className={modalClass ? modalClass : "common-modal"}
              isOpen={isOpenModal}
            //   toggle={handleClose}
              centered
              backdrop={true}
              keyboard={false}
          >
            <ModalHeader>
              <Button className="close-icon" onClick={handleCloseModal}>
                <img src={Images.Modalcloseicon} alt="close-icon" />
              </Button>
            </ModalHeader>
            <ModalBody>
          {!error &&
            <Alert color="danger">
                  {errorDisplay}
            </Alert>
          }
            </ModalBody>
          </Modal>
          }
        </>
    );
  };
  ShowErrorPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    cp: PropTypes.func,
  };
  
  export default ShowErrorPopup;