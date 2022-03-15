import { Badge, Button, Col, Row } from "reactstrap";
import { Icon } from '@iconify/react';
import Images from './../../../static/images';

const ObservationMoreDetails = () => {
    return (
        <>
            <Row>
                <Col md={12}>
                    <Row>
                        <Col md={6}>
                            <h6 className="m-0">Azimuth</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center fw-bold">camera_type</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row>
                        <Col md={6}>
                            <h6 className="m-0">When</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center fw-bold">Nov 23, 2022 <span>5:23:00 pm  <Badge className="bg-black text-white p-1">UTC</Badge></span></p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row>
                        <Col md={6}>
                            <h6 className="m-0">LOCATION</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center fw-bold"><img src={Images.Flag} alt="Flag" className="me-1" /> Edmond, OK, USA</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row>
                        <Col sm={12}>
                            <Button disabled className="w-100 d-flex align-items-center justify-content-center py-2 mb-3">
                                <Icon icon="heroicons-solid:thumb-up" width="25" height="25" className="me-2" /> 
                                Like
                            </Button>
                        </Col>
                        <Col sm={12}>
                            <div className="d-flex align-items-center justify-content-center user-review">
                                <span className="me-3 d-flex" ><Icon icon="heroicons-solid:thumb-up" width="17" height="17" className="me-1" /> 2,250 </span>
                                <span className="me-3 d-flex" ><Icon icon="heroicons-solid:eye" width="17" height="17" className="me-1" /> 100K </span>
                                <span className="d-flex" ><Icon icon="mdi:message" width="17" height="17" className="me-1" /> 5 </span>
                            </div>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <div className="question-box">
                        <h5 className="mb-3">Is this a Gigantic Jet?</h5>
                        <div className="d-flex ">
                            <Button className="gray-btn">No</Button>
                            <Button>Yes</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default ObservationMoreDetails;