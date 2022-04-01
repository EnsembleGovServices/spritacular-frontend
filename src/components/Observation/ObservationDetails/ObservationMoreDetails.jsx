import { Badge, Button, Col, Row } from "reactstrap";
import { Icon } from '@iconify/react';
import ReactCountryFlags from "../../../components/ReactCountryFlag";
import moment from 'moment';
import {getdirectionDegree} from "../../../helpers/observation";


const ObservationMoreDetails = (props) => {
    const {data, obvCommentCount} = props;
    return (
        <div className="more-details">
            <Row>
                <Col md={12}>
                    <Row className="align-items-center">
                        <Col sm={3}>
                            <h6 className="m-0 text-uppercase fw-normal">Azimuth</h6>
                        </Col>
                        <Col sm={9} className="text-end">
                            <p className="selected_direction rounded-circle mb-0 d-inline-flex align-items-center justify-content-center fw-bold">
                                <span>{data?.images[0]?.azimuth}</span>
                                <i style={{'--selected-angle': `${getdirectionDegree(data?.images[0]?.azimuth)}deg` }} className="direction_arrow d-flex align-items-center justify-content-center position-absolute left-0 right-0 top-0 bottom-0"></i>
                            </p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row className="align-items-center">
                        <Col sm={3}>
                            <h6 className="m-0 text-uppercase fw-normal">When</h6>
                        </Col>
                        <Col sm={9}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold text-end position-relative">{(data?.images[0]?.obs_date_time_as_per_utc) ? moment.utc(moment(data?.images[0]?.obs_date_time_as_per_utc).utc()).format("MMM DD, YYYY"): null}  
                                <span className="d-flex align-items-center justify-content-end fw-normal ms-1"> {(data?.images[0]?.obs_date_time_as_per_utc) ? moment.utc(moment(data?.images[0]?.obs_date_time_as_per_utc).utc()).format("hh:mm:ss A"): null}  
                                    <Badge className="bg-black text-white p-1 fw-normal ms-1">{(data?.images[0]?.obs_date_time_as_per_utc) ?'UTC': null}</Badge>
                                </span>
                            </p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row className="align-items-center">
                        <Col sm={3}>
                            <h6 className="m-0 text-uppercase fw-normal">LOCATION</h6>
                        </Col>
                        <Col sm={9}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold text-end">
                            <ReactCountryFlags country= {data?.images[0]?.country_code} />
                                <span className="ms-1">{data?.images[0]?.location}</span></p>
                        </Col>
                    </Row>
                    <div className="border-line my-2 mb-4"></div>
                    <Row>
                        <Col sm={12}>
                            <Button disabled className="like-btn w-100 d-flex align-items-center justify-content-center py-2 mb-3">
                                <Icon icon="heroicons-solid:thumb-up" width="25" height="25" className="me-2" /> 
                                <span>Like</span>
                            </Button>
                        </Col>
                        <Col sm={12}>
                            <div className="d-flex align-items-center justify-content-center user-review">
                                <span className="me-3 d-flex" ><Icon icon="heroicons-solid:thumb-up" width="17" height="17" className="me-1" /> 2,250 </span>
                                <span className="me-3 d-flex" ><Icon icon="heroicons-solid:eye" width="17" height="17" className="me-1" /> 100K </span>
                                <span className="d-flex" ><Icon icon="mdi:message" width="17" height="17" className="me-1" /> {obvCommentCount} </span>
                            </div>
                        </Col>
                    </Row>
                    <div className="border-line my-4"></div>
                    <div className="question-box mt-3 d-inline-block w-100">
                        <h5 className="mb-3 fw-normal text-black">Is this a {data?.category_data[0]}?</h5>
                        <div className="d-flex">
                            <Button className="gray-outline-btn me-2 px-3">No</Button>
                            <Button className="px-3">Yes</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ObservationMoreDetails;