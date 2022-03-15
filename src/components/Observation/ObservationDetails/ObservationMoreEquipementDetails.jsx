import { Button, Col, Row } from "reactstrap";
import { Icon } from '@iconify/react';

const ObservationMoreEquipementDetails = () => {
    return (
        <>
            <Row>
                <Col md={12}>
                    <Row>
                        <Col md={6}>
                            <h6 className="m-0 text-uppercase fw-normal">Camera Type</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center fw-bold">Canon</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row>
                        <Col md={6}>
                            <h6 className="m-0 text-uppercase fw-normal">Focal Length</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center fw-bold">35 mm</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row>
                        <Col md={6}>
                            <h6 className="m-0 text-uppercase fw-normal">Aperture</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center fw-bold">f/1.4</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row>
                        <Col md={6}>
                            <h6 className="m-0 text-uppercase fw-normal">ISO</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center fw-bold">100</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row>
                        <Col md={6}>
                            <h6 className="m-0 text-uppercase fw-normal">Shutter Speed</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center fw-bold">1/15 sec</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row>
                        <Col md={6}>
                            <h6 className="m-0 text-uppercase fw-normal">Frame Rate</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center fw-bold">24 FPS</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row>
                        <Col md={6}>
                            <h6 className="m-0 text-uppercase fw-normal">How Do you keep Track of Time</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center fw-bold">Camera Type</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row>
                        <Col md={6}>
                            <h6 className="m-0 text-uppercase fw-normal">Special Equipment</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center fw-bold">Polarizing Filter</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2 mb-4"></div>
                    <Row>
                        <Col sm={12}>
                            <Button disabled className="w-100 d-flex align-items-center justify-content-center py-2 mb-3">
                                <Icon icon="heroicons-solid:thumb-up" width="25" height="25" className="me-2" /> 
                                Vote this observation
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
                </Col>
            </Row>
        </>
    )
}

export default ObservationMoreEquipementDetails;