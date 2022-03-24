import { Button, Col, Row } from "reactstrap";
import { Icon } from '@iconify/react';

const ObservationMoreEquipementDetails = (props) => {
    const {data} = props;
    return (
        <>
            <Row>
                <Col md={12}>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h6 className="m-0 text-uppercase fw-normal">Camera Type</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold">{data?.camera_type}</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h6 className="m-0 text-uppercase fw-normal">Focal Length</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold">{(data?.focal_length) ? data?.focal_length + ' mm' : ''} </p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h6 className="m-0 text-uppercase fw-normal">Aperture</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold">{data?.aperture}</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h6 className="m-0 text-uppercase fw-normal">ISO</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold">{data?.iso}</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h6 className="m-0 text-uppercase fw-normal">Shutter Speed</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold">{(data?.shutter_speed) ? data?.shutter_speed + '  sec' : ''}</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h6 className="m-0 text-uppercase fw-normal">Frame Rate</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold">{(data?.fps) ? data?.fps + ' FPS' : ''}</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h6 className="m-0 text-uppercase fw-normal">How Do you keep Track of Time</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold">{data?.question_field_one}</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h6 className="m-0 text-uppercase fw-normal">Special Equipment</h6>
                        </Col>
                        <Col md={6}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold">{data?.question_field_two}</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2 mb-4"></div>
                    <Row className="align-items-center mt-3">
                        <Col sm={12}>
                            <Button disabled className="like-btn w-100 d-flex align-items-center justify-content-center py-2 mb-3">
                                <Icon icon="heroicons-solid:thumb-up" width="25" height="25" className="me-2" /> 
                                <span>Vote this observation</span>
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