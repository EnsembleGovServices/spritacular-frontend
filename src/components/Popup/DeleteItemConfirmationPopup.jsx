import {Modal, ModalBody} from "reactstrap";
import PropTypes from "prop-types";
import {cdn} from "../../helpers/url";

const DeleteItemConfirmationPopup = (props) => {
    const {open, handleClose, handleConfirmation} = props;
    return (
        <>
            <Modal
                isOpen={open}
                centered
                backdrop={true}
                keyboard={false}
                size="lg"
                className="delete-confirm_modal"
            >
                <ModalBody className="text-center">
                    <div className="content">
                        <h2 className="mb-3">Are you sure ?</h2>
                        <div className="d-inline-block mx-auto remove-img w-100">
                            <img src={`${cdn.url}/remove-data.svg`} alt="Remove data"/>
                        </div>
                        <p className="mb-5 opacity-75">If you perform this action, we will only keep your first
                            observation. If you wish to add more observation, you will need to enable this again & then
                            you can add more.</p>
                        <button type="button" className="me-2 btn btn-dark px-5"
                                onClick={() => handleConfirmation()}>Yes
                        </button>
                        <button type="button" className="px-5 btn btn-primary"
                                onClick={() => handleClose()}>No
                        </button>
                    </div>
                </ModalBody>
            </Modal>

        </>
    )
}

DeleteItemConfirmationPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func
};

export default DeleteItemConfirmationPopup;