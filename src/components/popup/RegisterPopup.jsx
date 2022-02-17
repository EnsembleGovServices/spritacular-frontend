import {
    Button,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from "reactstrap";
import Images from "../../static/images";
import PropTypes from "prop-types";
import {useState} from "react";
import axios from "../../api/server";
import {toast} from "react-hot-toast";
import "../../assets/scss/component/modal.scss";

const REGISTER_URL = '/users/register/';
const RegisterPopup = (props) => {
    const {open, handleClose, modalClass} = props;

    const [userRegistration, setUserRegistration] = useState({
        first_name: "",
        last_name: "",
        email: "",
        location: "",
    });
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

    function toastConfig(toastPosition, time) {
        return {
            position: toastPosition ?? 'top-right',
            duration: time ?? 4000,
        }
    }

    const handleInput = (e) => {
        let name = e.target.name,
            value = e.target.value;
        setUserRegistration({
            ...userRegistration,
            [name]:value
        });
    }

    const handleCheck = (e) => {
        setUserRegistration({
            ...userRegistration,
            'agreeTerms': !!e.target.checked
        });
    }

    const createNewUser = async (e) => {
        e.preventDefault();
        await axios.post(REGISTER_URL, userRegistration)
            .then((response)=> {
                if (response.status === 201) {
                    setUserRegistration(null)
                    setError(null)
                    setSuccess({
                        'status': response.status,
                        'data': response.data
                    });
                    toast.success(response?.statusText, toastConfig());
                } else {
                    toast.success(response?.statusText, toastConfig());
                }
            })
            .catch((error)=> {
                setSuccess(null)
                if(!error?.response) {
                    toast.error('Server error occurred', toastConfig());
                } else {
                    setError({
                        'status': error.response.status,
                        'message': error.response.statusText,
                        'data': error.response.data
                    })
                    toast.error(error?.response?.statusText, toastConfig());
                }
                if (error) {
                    console.log(error.response)
                }
            })
    }


    return(
        <Modal
            className={modalClass ? modalClass : 'common-modal'}
            isOpen={open}
            toggle={handleClose}
            backdrop={true}
            keyboard={true}
            centered
        >
            <ModalHeader>
                <span>Sign Up</span>
                <Button className="close-icon" onClick={()=> handleClose()}>
                    <img src={Images.Modalcloseicon} alt="close-icon" />
                </Button>
            </ModalHeader>
            <ModalBody>
                {success &&
                    <p className="text-success small mb-4 fw-bolder">Signed up successfully</p>
                }
                <Form onSubmit={createNewUser}>
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <Input
                                    required
                                    type="text"
                                    name="first_name"
                                    placeholder="First name"
                                    value={userRegistration?.first_name ?? ''}
                                    onChange={(e)=>handleInput(e)}
                                    invalid={!!error?.data?.first_name}
                                />
                                <FormFeedback>
                                    {error?.data?.first_name}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col sm={6} className="">
                            <FormGroup>
                                <Input
                                    required
                                    type="text"
                                    name="last_name"
                                    placeholder="Last name"
                                    value={userRegistration?.last_name ?? ''}
                                    invalid={!!error?.data?.last_name}
                                    onChange={(e)=>handleInput(e)} />
                                <FormFeedback>
                                    {error?.data?.last_name}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <FormGroup>
                                <Input
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    value={userRegistration?.email ?? ''}
                                    invalid={!!error?.data?.email}
                                    onChange={(e)=>handleInput(e)} />
                                <FormFeedback>
                                    {error?.data?.email}
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    required
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    invalid={!!error?.data?.password}
                                    onChange={(e)=>handleInput(e)} />
                                <FormFeedback>
                                    {error?.data?.password}
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    required
                                    type="select"
                                    name="location"
                                    onChange={(e)=>handleInput(e)}
                                >
                                    <option value="Ahmedabad">Ahmedabad</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Bombay">Bombay</option>
                                </Input>
                                <FormFeedback>
                                    Location is required
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        required
                                        type="checkbox"
                                        name="agreeTerms"
                                        checked={userRegistration?.agreeTerms === true}
                                        onChange={(e)=>handleCheck(e)}
                                    />
                                    Creating an account means you agree
                                    with our with our <a href="/">Privacy Policy</a> and{" "}
                                    <a href="/">Terms.</a>
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button type="submit" className="modal-btn" disabled={userRegistration ? (userRegistration?.agreeTerms !== true) : false}>
                        Create Account
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

RegisterPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func
};

export default RegisterPopup;