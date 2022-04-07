import {Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, UncontrolledAlert} from "reactstrap";
import {useRef, useState} from "react";
import axios from "../../api/axios";
import {baseURL} from "../../helpers/url";
import PropTypes from "prop-types";

const RejectObservationPopUp = (props) => {
    const { openRejectModal, handleCloseRejectObs, data, user, token, approveReject } = props;
    const superuser = user?.is_superuser;
    const [reject, setReject] = useState({
        inappropriate_image: false,
        other: false,
        additional_comment: ''
    });
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const inappropriate_image = useRef(null);
    const other = useRef(null);

    const handleCheck = (e) => {
        setReject({
            ...reject,
            inappropriate_image: inappropriate_image?.current?.checked ? 1 : 0,
            other: other?.current?.checked ? 1 : 0,
        });
    }
    const handleInput = (e) => {
        setReject({
            ...reject,
            additional_comment: e.target.value
        });
    }
    const rejectionData = {
        name: "REJECT",
        reason: reject
    };
    const submitRejection = async () => {
        setError('');
        setSuccess('');
        if (superuser) {
            await axios.post(`${baseURL.api}/observation/verify_observation/${data?.id}/`, rejectionData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response)=> {
                    console.log(response);
                    approveReject('verified', true);
                    setSuccess({
                        message: response?.data?.success
                    })
                })
                .catch(error => {
                    console.log(error);
                    setError({
                        notAllowed: error?.response?.data?.detail
                    })
                })
        }
    }
    const handleRejectObservation = (e) => {
        e.preventDefault();
        submitRejection().then(r => r);
    }

    return(
        <Modal isOpen={openRejectModal} centered backdrop={true} keyboard={true} toggle={handleCloseRejectObs} className='reject-modal'>
            <ModalHeader toggle={handleCloseRejectObs}>
                Reject Observation
            </ModalHeader>
            <ModalBody className="p-3">
                <form onSubmit={handleRejectObservation}>
                    {success && success?.message &&
                        <UncontrolledAlert color="success" data-dismiss="alert" dismissible="true" className="text-left">
                            {success?.message}
                        </UncontrolledAlert>
                    }
                    <Label className='text-uppercase mb-2' >Reason for Rejection</Label>
                    {error?.notAllowed &&
                        <UncontrolledAlert color="danger" data-dismiss="alert" dismissible="true" className="text-left">
                            {error?.notAllowed}
                        </UncontrolledAlert>
                    }
                    <Row>
                        <Col sm={6}>
                            <FormGroup check>
                                <Label check className='mb-0' >
                                    <input
                                        ref={inappropriate_image}
                                        className="form-check-input"
                                        type="checkbox"
                                        name="inappropriate_image"
                                        checked={reject?.inappropriate_image === 1}
                                        onChange={(e) => handleCheck(e)}
                                    />
                                    Inappropriate Image
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup check>
                                <Label check className='mb-0' >
                                    <input
                                        ref={other}
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={reject?.other === 1}
                                        name="other"
                                        onChange={(e) => handleCheck(e)}
                                    />
                                    Other
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col sm={12}>
                            <FormGroup className='mt-4 mb-4'>
                                <Label className='text-uppercase mb-2' >Additional Comments</Label>
                                <Input
                                    type='textarea'
                                    name="additional_comment"
                                    placeholder='Write..' rows='3'
                                    value={reject?.additional_comment ?? ""}
                                    style={{resize: 'none'}}
                                    onChange={(e)=> handleInput(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={12}>
                            <Button className="me-2 gray-outline-btn " onClick={() => handleCloseRejectObs()}>Cancel</Button>
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </Col>
                    </Row>
                </form>
            </ModalBody>
        </Modal>
    )
}


RejectObservationPopUp.propTypes = {
    approveReject: PropTypes.func,
};

export default RejectObservationPopUp;