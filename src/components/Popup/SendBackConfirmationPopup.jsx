import {Modal, ModalBody} from "reactstrap";
import PropTypes from "prop-types";
import {baseURL, cdn} from "../../helpers/url";
import axios from "../../api/axios";
import {useState} from "react";
import {Icon} from '@iconify/react';

const SendBackConfirmationPopup = (props) => {
    const initialState = {isSent: false, message: ""}
    const {token, open, handleClose, id, handleDetailPopup, handleSendBackEvent} = props;
    const [success, setSuccess] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const handleSendBack = async (id, e) => {
        setLoading(true);
        e.preventDefault();
        await axios.put(`${baseURL.api}/observation/observation_push_back/${id}/`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            // console.log('response', response);
            setSuccess((prev) => {
                return {
                    ...prev,
                    isSent: true,
                    message: response.data.success
                }
            })
        }).catch(() => {
            // console.log('error', error)
        }).finally(() => {
            setLoading(false);
            // console.log('finished sending back');
            setTimeout(() => {
                handleClose(id)
            }, 1500);
            setTimeout(() => {
                setSuccess(initialState);
                handleSendBackEvent(true);
            }, 1800)
            setTimeout(() => {
                handleDetailPopup(open);
            }, 2000)
        })
    }

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
                        {success.isSent ? <div className="success">
                            <span className="icon">
                                <Icon icon="iconoir:check-circled-outline"/>
                            </span>
                            <h5>{success.message}</h5>
                        </div> : <div>
                            <h2 className="mb-3">Are you sure ?</h2>
                            <p className="text mb-4">Do you want to send back this observation to the user ?</p>
                            <button onClick={(e) => handleSendBack(id, e)} type="button"
                                    className="me-2 btn btn-primary text-white px-5">
                                {loading ? 'Sending back...' : 'Yes'}
                            </button>
                            <button type="button" className="px-5 btn btn-dark"
                                    onClick={() => handleClose(id)}>No
                            </button>
                        </div>}
                    </div>
                </ModalBody>
            </Modal>

        </>
    )
}

SendBackConfirmationPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleSendBackEvent: PropTypes.func
};

export default SendBackConfirmationPopup;