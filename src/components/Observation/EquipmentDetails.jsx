import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap"

const EquipmentDetails = () =>{
    return (
        <>
        <Row>
            <Col sm="12">
                <FormGroup className="d-flex align-items-center position-relative">
                    <input
                        id="checkbox0"
                        type="checkbox"
                        className="custom-switch hidden"
                    />
                    <label
                        className="switchbox"
                        htmlFor="checkbox0"
                    />
                    <span>
                        I used the same camera, camera settings, and lens listed in my profile
                    </span>
                </FormGroup>
            </Col>
            <Col sm="12">
                <FormGroup check>
                <Label check>
                    <Input
                        required
                        type="checkbox"
                        name="Pull data from my profile"
                    />
                    Pull data from my profile
                </Label>
                </FormGroup>
            </Col>
            <Col md="12">
                    <FormGroup>
                        <h6>Camera Type</h6>
                        <Input type="select" name="select">
                        <option disabled defaultValue>
                            Please Select Your Camera Type
                        </option>
                        <option>Canon</option>
                        <option>Nikon</option>
                        <option>Sony</option>
                        <option>Panasonic</option>
                        </Input>
                    </FormGroup>
                    <div className="border-line"/>
            </Col>
            <Col md="12">
            <FormGroup>
                <h6>Lens Information</h6>
            </FormGroup>
            </Col>
            <Col md="6">
            <FormGroup>
                <label>Focal Length</label>
                <Input
                type="text"
                name="name"
                placeholder="35 mm"
                />
            </FormGroup>
            </Col>
            <Col md="6">
                <FormGroup>
                    <label>Aperture</label>
                    <Input
                    type="text"
                    name="name"
                    placeholder="35 mm"
                    />
                </FormGroup>
            </Col>
            <Col md="12">
            <div className="border-line"/>
            <FormGroup>
                <h6>Camera Settings</h6>
            </FormGroup>
            </Col>
            <Col md="6">
            <FormGroup>
                <label>ISO</label>
                <Input
                type="text"
                name="name"
                placeholder="100"
                />
            </FormGroup>
            </Col>
            <Col md="6">
            <FormGroup>
                <label>Shutter Speed (exposure time)</label>
                <Input
                type="text"
                name="name"
                placeholder="1/15"
                />
            </FormGroup>
            </Col>
            <Col md="6">
            <FormGroup>
                <label>Frame Rate (frames per second)</label>
                <Input type="text" name="name" placeholder="24" />
            </FormGroup>
            </Col>
            <Col md="12">
                <div className="border-line"></div>
                <FormGroup>
                    <h6>How do you generally keep track of time?</h6>
                    <Input
                    type="text"
                    name="name"
                    placeholder="e.g. GPS, Camera Time, Computer Time"
                    />
                </FormGroup>
            </Col>
            <Col md="12">
                <div className="border-line"></div>
                <FormGroup>
                    <h6>
                    Do you use any special equipment attached to
                    your camera (such as a filter)?
                    </h6>
                    <Input
                    type="text"
                    name="name"
                    placeholder="e.g. Polarizing Filter, ND Filter, etc"
                    />
                </FormGroup>
            </Col>
            <Col md="12">
                <div className="border-line"></div>
                <FormGroup>
                    <h6>Elevation angle of your camera in degrees</h6>
                    <Input
                    type="text"
                    name="name"
                    placeholder="e.g. 20"
                    />
                </FormGroup>
            </Col>
            <Col md="12">
                <div className="border-line"></div>
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
                    <h6>Lorem ipsum dolor sit amet consectetur adipiscing elit sed sed lobortis magna</h6>
                    <Input
                        type="textarea"
                        name="textarea"
                        placeholder="Please describe the story of your capture."
                    />
                </FormGroup>
            </Col>
            <Col md={12}>
                <Button>Back</Button>
            </Col>
        </Row>
        </>
    )
}

export default EquipmentDetails;