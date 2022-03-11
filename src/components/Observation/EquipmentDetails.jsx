import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap"
import {Tabs} from "../../helpers/observation";
import "../../assets/scss/component/observationEquipment.scss";
import { useEffect } from "react";

const EquipmentDetails = (props) =>{
    const {toggleTab,cameraDetails } = props;
    console.log(cameraDetails);
    return (
        <>
        <Row>
            <Col md={12}>
                <Row>
                    <Col md={6}>
                        <h6 className="m-0">Camera Type<span className="required">Required</span></h6>
                    </Col>
                    <Col md={6}>
                        <p className="mb-0 h-100 d-flex align-items-center">{cameraDetails?.camera_type}</p>
                    </Col>
                </Row>
                <div className="border-line my-2"></div>
                <Row>
                    <Col md={6}>
                        <h6 className="m-0">Focal Length<span className="required">Required</span></h6>
                    </Col>
                    <Col md={6}>
                        <p className="mb-0 h-100 d-flex align-items-center">{cameraDetails?.focal_length}</p>
                    </Col>
                </Row>
                <div className="border-line my-2"></div>
                <Row>
                    <Col md={6}>
                        <h6 className="m-0">Aperture<span className="required">Required</span></h6>
                    </Col>
                    <Col md={6}>
                        <p className="mb-0 h-100 d-flex align-items-center">{cameraDetails?.aperture}</p>
                    </Col>
                </Row>
                <div className="border-line my-2"></div>
                <Row>
                    <Col md={6}>
                        <h6 className="m-0">ISO</h6>
                    </Col>
                    <Col md={6}>
                        <p className="mb-0 h-100 d-flex align-items-center">{cameraDetails?.iso}</p>
                    </Col>
                </Row>
                <div className="border-line my-2"></div>
                <Row>
                    <Col md={6}>
                        <h6 className="m-0">Shutter Speed</h6>
                    </Col>
                    <Col md={6}>
                        <p className="mb-0 h-100 d-flex align-items-center">{cameraDetails?.shutter_speed}</p>
                    </Col>
                </Row>
                <div className="border-line my-2"></div>
                <Row>
                    <Col md={6}>
                        <h6 className="m-0">Frame Rate</h6>
                    </Col>
                    <Col md={6}>
                        <p className="mb-0 h-100 d-flex align-items-center">{cameraDetails?.fps}</p>
                    </Col>
                </Row>
                <div className="border-line my-2"></div>
                <Row>
                    <Col md={6}>
                        <h6 className="m-0">How do you generally keep track of time?</h6>
                    </Col>
                    <Col md={6}>
                        <p className="mb-0 h-100 d-flex align-items-center">{cameraDetails?.question_field_one}</p>
                    </Col>
                </Row>
                <div className="border-line my-2"></div>
                <Row>
                    <Col md={6}>
                        <h6 className="m-0">Do you use any special equipment attached to your camera (such as a filter)?</h6>
                    </Col>
                    <Col md={6}>
                        <p className="mb-0 h-100 d-flex align-items-center">{cameraDetails?.question_field_two}</p>
                    </Col>
                </Row>
                <div className="border-line my-2 mb-4"></div>
            </Col>
            <Col md={12}>
                <FormGroup>
                    <h6>Elevation angle of your camera in degrees</h6>
                    <Input
                    type="text"
                    name="name"
                    placeholder="e.g. 20"
                    />
                </FormGroup>
            </Col>
            <Col md={12}>

                {/* <div className="border-line"></div> */}
                <FormGroup>
                    <h6>Link to the video of this event</h6>
                    <Input
                    type="text"
                    name="name"
                    placeholder="e.g. https://www.youtube.com/watch?v=PjZ2Y2nn000"
                    />
                </FormGroup>
            </Col>
            <Col md={12}>
                <FormGroup>
                    <h6>Please share the story of your capture</h6>
                    <div className="border-line my-2"></div>
                    <Input
                        type="textarea"
                        name="textarea"
                        placeholder="We would love to hear more about your experience."
                    />
                </FormGroup>
            </Col>
            <Col md={12}>
                <Button className="gray-outline-btn"  onClick={() =>toggleTab(Tabs.DateTimeLocation)}>Back</Button>
            </Col>
        </Row>
        </>
    )
}

export default EquipmentDetails;