import { Col, FormGroup, Input, Label, Row, Button } from "reactstrap";
import Images from "../../static/images";

const ObservationLocation = () => {
    return (
        <>
            <Col md="12">
                <FormGroup>
                    <h6>Where did you make the observation?</h6>
                    <Input
                        type="search"
                        name="name"
                        placeholder="Edmon, OK, USA"
                    />
                </FormGroup>
            </Col>
            <Col md="12">
                <FormGroup>
                    <h6>If you know the precise coordinates of your observation location, please enter below</h6>
                    <Row>
                        <Col md={4}>
                            <Label htmlFor="LAT">LAT</Label>
                            <Input
                                id="LAT"
                                type="search"
                                name="LAT"
                                placeholder="Edmon, OK, USA"
                            />
                        </Col>
                        <Col md={4}>
                            <Label htmlFor="LAT">LON</Label>
                            <Input
                                id="LON"
                                type="search"
                                name="LON"
                                placeholder="Edmon, OK, USA"
                            />
                        </Col>
                        <Col md={4}>
                            <div>
                                <img src={Images.Flag} alt="USA Flag"/> Edmon, OK, USA
                            </div>
                        </Col>
                    </Row>
                </FormGroup>
            </Col>
            <Col md="12">
                <FormGroup>
                    <h6>Please enter date and time for your observation</h6>
                    <Row>
                        <Col md={4}>
                            <Label htmlFor="Date">Date</Label>
                            <Input
                                id="Date"
                                type="date"
                                name="Date"
                                placeholder="12/20/2021" 
                            />
                        </Col>
                        <Col md={4}>
                            <Label htmlFor="Time">Time</Label>
                            <Input
                                id="Time"
                                type="time"
                                name="Time"
                                placeholder="10:21:00 am"
                            />
                        </Col>
                        <Col md={4}>
                            <Label htmlFor="TIME ZONE">TIME ZONE</Label>
                            <Input type="select" name="select">
                                <option disabled defaultValue>
                                CT
                                </option>
                                <option>CT</option>
                                <option>CT</option>
                                <option>CT</option>
                                <option>CT</option>
                            </Input>
                        </Col>
                    </Row>
                </FormGroup>
            </Col>
            <Col md="12">
                <FormGroup>
                    <h6>How accurate is your timing?</h6>
                        <Label htmlFor="Date">Uncertainty in Time</Label>
                        <Input
                            id="Date"
                            type="text"
                            name="Date"
                            placeholder="e.g. +/- 3 sec  or  +/- 1 min" 
                        />
                </FormGroup>
            </Col>
            <Col md="12">
                <FormGroup>
                    <h6>Please choose azimuth (look direction) of your observation <p className="required">Required</p></h6>
                    <FormGroup className="d-flex align-items-center">
                        <input
                            id="checkbox"
                            type="checkbox"
                            className="checkbox hidden"
                        />
                        <label
                            className="switchbox"
                            htmlFor="checkbox"
                        />
                        <span>I know the precise azimuth angle in degrees</span>
                    </FormGroup>
                    <FormGroup>
                        <Label>Look Direction</Label>
                        <div className="border circle-rounded"></div>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="Date">Azimuth Angle</Label>
                        <Input
                            id="Date"
                            type="text"
                            name="Date"
                            placeholder="120°" 
                        />
                    </FormGroup>
                </FormGroup>
                <FormGroup className="profile-bottom-btn ">
                    <Button className="discard-btn me-2">Back</Button>
                    <Button className="save-btn">Continue</Button>
                </FormGroup>
            </Col>
        </>
    )
}

export default ObservationLocation;