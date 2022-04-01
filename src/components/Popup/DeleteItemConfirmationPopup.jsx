import {Button, Modal, ModalBody} from "reactstrap";
import PropTypes from "prop-types";
import Images from './../../static/images';

const DeleteItemConfirmationPopup = (props) => {
    const {open, handleClose} = props;
    return(
        <>
            <Modal
                isOpen={open}
                centered
                toggle={handleClose}
                backdrop={true}
                keyboard={true}
                className="delete-confirm_modal"
            >
                <ModalBody className="text-center p-3">
                    <h2 className="mb-3">Are you sure ?</h2>
                    <i className="d-inline-block mx-auto remove-img w-100"><img src={Images.RemoveData} alt="Remove data" /></i>
                    <p className="mb-5 opacity-75">If you perform this action, we will only keep your first observation. If you wish to add more observation, you will need to enable this again & then you can add more.</p>
                    <Button className="me-2 gray-outline-btn px-4">Yes</Button>
                    <Button className="px-4" onClick={() => handleClose()}>No</Button>
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