import {Button, Form, FormGroup, FormText, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import Images from "../../static/images";
import PropTypes from "prop-types";

const LoginPopup = (props) => {
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
                Login
                <Button className="close-icon" onClick={()=> handleClose()}>
                    <img src={Images.Modalcloseicon} alt="close-icon" />
                </Button>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                      <Input type="email" name="email" placeholder="Email address" />
                    </FormGroup>
                    <FormGroup>
                      <Input type="password" name="password" placeholder="Password" />
                    </FormGroup>
                    <FormText className="forgot-password">
                      <a href="/">Forgot Password?</a>
                    </FormText>
                    <FormGroup>
                      <Button className="modal-btn" disabled>
                        Login
                      </Button>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>
    )
}
LoginPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func
};

export default LoginPopup;