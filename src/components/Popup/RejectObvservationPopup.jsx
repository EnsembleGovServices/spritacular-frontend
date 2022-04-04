import {Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap";

const RejectObvservationPopup = (props) => {
    const { openRejectModal, handleCloseRejectObs } = props;
  return(
      <>
          <Modal isOpen={openRejectModal} centered backdrop={true} keyboard={true} toggle={handleCloseRejectObs} className='reject-modal'>
              <ModalHeader toggle={handleCloseRejectObs}>
                  Reject Observation
              </ModalHeader>
              <ModalBody className="p-3">
                  <Label className='text-uppercase mb-2' >Reason for Rejection</Label>
                  <Row>
                      <Col>
                          <FormGroup check>
                              <Label check className='mb-0' >
                                  <Input
                                      required
                                      type="checkbox"
                                      name="no-proper-image"
                                  />
                                  Inappropriate Image
                              </Label>
                          </FormGroup>
                      </Col>
                      <Col>
                          <FormGroup check>
                              <Label check className='mb-0' >
                                  <Input
                                      required
                                      type="checkbox"
                                      name="other"
                                  />
                                  Other
                              </Label>
                          </FormGroup>
                      </Col>
                  </Row>
                  <FormGroup className='mt-4 mb-4'>
                      <Label className='text-uppercase mb-2' >Additional Comments</Label>
                      <Input type='textarea' placeholder='Write..' rows='3' style={{resize: 'none'}}/>
                  </FormGroup>
                  <Button className="me-2 gray-outline-btn " onClick={() => handleCloseRejectObs()}>Cancel</Button>
                  <Button className="">Submit</Button>
              </ModalBody>
          </Modal>
      </>
  )
}
export default RejectObvservationPopup;