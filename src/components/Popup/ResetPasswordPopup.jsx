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
import ShowErrorPopup from "./ShowErrorPopup";



  
  const ResetPasswordPopup = (props) => {
    const { open, modalClass } = props;
    const [isOpenModal,setIsOpenModal] = useState(false);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [error, setError] = useState('');
    const handleCloseModal = () => {
        navigate('/')
        setIsOpenModal(false);
    }
    useEffect( () => {
        axios.post(baseURL.api+'/users/password_reset/validate_token/', {'token': token})
        .then((response) => {
            // console.log(response);
            setIsOpenModal(true);
            
            })
        .catch((error) => {
            setIsOpenModal(false);
            console.log(error);
            if (!error?.response) {
              setError('server error occurred');
                console.log('server error occurred')
            }
            else {
              setError(error?.response?.statusText);
                console.log(error?.response?.statusText)
            }
        })
    },[token]);

    

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
              New Password
              <Button className="close-icon" onClick={handleCloseModal}>
                <img src={Images.Modalcloseicon} alt="close-icon" />
              </Button>
            </ModalHeader>
            <ModalBody>
              <ResetPassword token={token} />
            </ModalBody>
          </Modal>
          }
          {error &&
          <ShowErrorPopup modalClass={modalClass} errorDisplay={error}/>
          }
          
        </>
    );
  };
  ResetPasswordPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    cp: PropTypes.func,
  };
  
  export default ResetPasswordPopup;