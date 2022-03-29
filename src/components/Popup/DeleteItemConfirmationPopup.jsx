import {Button, Modal, ModalBody} from "reactstrap";
import PropTypes from "prop-types";

const DeleteItemConfirmationPopup = (props) => {
    const {open, handleClose} = props;
    return(
        <>
            <Modal
                isOpen={open}
                centered
                toggle={handleClose}
                backdrop={true}
                keyboard={false}
            >
                <ModalBody className="text-center py-5">
                    <h1>Are you sure ?</h1>
                    <p>If you perform this action, we will only keep your first observation. If you wish to add more observation, you will need to enable this again & then you can add more.</p>
                    <Button type="danger" className="mb-2 bg-dark border-dark">
                        Yes, delete the rest of observation
                    </Button>
                    <Button onClick={() => handleClose()}>
                        No, I will continue on this.
                    </Button>
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