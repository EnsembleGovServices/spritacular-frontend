import { Col, Row } from "reactstrap";
import ObservationLikeViewCounter from "./ObservationLikeViewCounter";
import useObservationsData from "../../../hooks/useObservationsData";

const ObservationMoreEquipementDetails = (props) => {
    const {data, obvCommentCount} = props;
    const { observationListData } = useObservationsData();
    return (
        <>
            <Row>
                <Col md={12}>
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <h6 className="m-0 text-uppercase fw-normal">Camera Type</h6>
                        </Col>
                        <Col sm={6}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold">{data?.camera_type}</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <h6 className="m-0 text-uppercase fw-normal">Focal Length</h6>
                        </Col>
                        <Col sm={6}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold">{(data?.focal_length) ? data?.focal_length + ' mm' : ''} </p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <h6 className="m-0 text-uppercase fw-normal">Aperture</h6>
                        </Col>
                        <Col sm={6}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold">{data?.aperture}</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <h6 className="m-0 text-uppercase fw-normal">ISO</h6>
                        </Col>
                        <Col sm={6}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold">{data?.iso}</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <h6 className="m-0 text-uppercase fw-normal">Shutter Speed</h6>
                        </Col>
                        <Col sm={6}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold">{(data?.shutter_speed) ? data?.shutter_speed + '  sec' : ''}</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <h6 className="m-0 text-uppercase fw-normal">Frame Rate</h6>
                        </Col>
                        <Col sm={6}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold">{(data?.fps) ? data?.fps + ' FPS' : ''}</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <h6 className="m-0 text-uppercase fw-normal">How Do you keep Track of Time</h6>
                        </Col>
                        <Col sm={6}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold">{data?.question_field_one}</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <h6 className="m-0 text-uppercase fw-normal">Special Equipment</h6>
                        </Col>
                        <Col sm={6}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold">{data?.question_field_two}</p>
                        </Col>
                    </Row>
                    <div className="border-line my-2 mb-4"></div>
                    <Row className="align-items-center mt-3">
                        <Col sm={12}>
                            <ObservationLikeViewCounter likeView={observationListData?.active?.like_watch_count_data} commentCount={obvCommentCount} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default ObservationMoreEquipementDetails;