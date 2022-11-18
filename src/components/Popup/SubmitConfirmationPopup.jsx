import {Modal, ModalBody} from "reactstrap";
import PropTypes from "prop-types";

const SubmitConfirmationPopup = (props) => {
    const {open, handleClose, handleSubmit} = props;


    return (
        <>
            <Modal
                isOpen={open}
                centered
                backdrop={true}
                keyboard={false}
                size="md"
                className="send-confirm_modal"
            >
                <ModalBody className="text-center">
                    <div className="content">
                        <div className="success">
                            <h2 className="mb-3">Are you sure ?</h2>
                            <p className="text mb-4">Do you want to submit this observation ?</p>
                            <button type="submit" onClick={(e) => handleSubmit(e)}
                                    className="me-2 btn btn-primary text-white px-5">
                                Yes
                            </button>
                            <button type="button"
                                    onClick={(e) => handleClose(e)}
                                    className="me-2 btn btn-dark text-white px-5">
                                No
                            </button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

        </>
    )
}

SubmitConfirmationPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func
};

export default SubmitConfirmationPopup;