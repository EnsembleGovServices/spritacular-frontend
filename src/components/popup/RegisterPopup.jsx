import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import Images from "../../static/images";
import PropTypes from "prop-types";

const RegisterPopup = (props) => {
    const {open, handleClose, modalClass} = props;

    return(
        <Modal
            className={modalClass ? modalClass : 'common-modal'}
            isOpen={open}
            toggle={handleClose}
            centered
            backdrop={true}
            keyboard={false}
        >
            <ModalHeader>
                Sign up
                <Button className="close-icon" onClick={()=> handleClose()}>
                    <img src={Images.Modalcloseicon} alt="close-icon" />
                </Button>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="First Name"
                                    placeholder="First name"
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={6} className="">
                            <FormGroup>
                                <Input type="text" name="Last name" placeholder="Last name" />
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Input type="email" name="email" placeholder="Email address" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password" placeholder="Password" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="select" name="select" id="exampleSelect">
                            <option>Location</option>
                            <option>Ahmedabad</option>
                            <option>Pune</option>
                            <option>Bombay</option>
                        </Input>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" /> Creating an account means you agree
                            with our with our <a href="/">Privacy Policy</a> and{" "}
                            <a href="/">Terms.</a>
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Button className="modal-btn" disabled>
                            Create Account
                        </Button>
                    </FormGroup>
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