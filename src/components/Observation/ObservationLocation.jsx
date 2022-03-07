import { Col, FormGroup, Input, Label, Row, Button } from "reactstrap";
import Images from "../../static/images";
import { lazy, useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import {Tabs} from "../../helpers/observation";
import "../../assets/scss/component/observationLocation.scss";

const MapWrapper = lazy(()=> import('../MapWrapper'))

const ObservationLocation = (props) => {
    const { toggleTab } = props;
    const [address,setAddress] = useState();
    const [lat,setLat] = useState(18.5204);
    const [lng,setLng] = useState(73.8567);
    // const [updateMap,setUpdateMap] = useState({
    //     lat:18.5204,
    //     lng:73.8567
    // });
    const [updateMap,setUpdateMap] = useState(false);
    const [isActiveDire, setActiveDire] = useState(null);
    const [directionAngle, setDirectionAngle] = useState(0);
    const [angleDegree, setAngleDegree] = useState(false);

    const directionValue = [
        {name: 'N', angle: 360},
        {name: 'NE', angle: 45},
        {name: 'E', angle: 90},
        {name: 'SE', angle: 135},
        {name: 'S', angle: 180},
        {name: 'SW', angle: 235},
        {name: 'W', angle: 270},
        {name: 'NW', angle: 315}
    ]

    const handleValue = (value) => {
        setAddress(value);
    }
    const handleChangeLat = (e) => {
        setLat(e.target.value);
        setUpdateMap({...updateMap,'lat': e.target.value});
        setUpdateMap(true);
    }
    const handleChangeLng = (e) => {
        setLng(e.target.value);
        setUpdateMap({...updateMap,'lng' : e.target.value});
        setUpdateMap(true);
    }
    // console.log(lat);
    const selectDirection = (index) => {
        const directionWrapper = document.querySelector('.compass-wrapper');
        
        const directionId = document.getElementById(`directionValue${index}`);
        let getAngleValue = directionId.getAttribute("data-angle");

        if(isActiveDire === index){
            directionWrapper.classList.remove("active-arrow");
        }else{
            directionWrapper.classList.add("active-arrow");
            setActiveDire(index);
            setDirectionAngle(getAngleValue);
        }
    }
    return (
        <>
            <Col md="12">
            <FormGroup row>
                <Row>
                    <Col lg={7} className="order-2 order-lg-1">
                        <h6>Where did you make the observation?</h6>
                    </Col>
                    <Col lg={5} className="order-1 order-lg-2 mb-2 mb-lg-0">
                        <FormGroup check>
                            <Label check className="mb-0">
                                <Input
                                    required
                                    type="checkbox"
                                    name="Same as the first image"
                                />
                                Same as the first image
                            </Label>
                        </FormGroup>
                    </Col>
                </Row>
                   {/* <MapWrapper
					google={props.google}
					center={{lat: lat, lng: lng}}
					height='300px'
					zoom={15}
                    handleState={handleValue}                    
				 />  */}
                    {/* <Input
                        type="search"
                        name="name"
                        placeholder="Edmon, OK, USA"
                    /> */}
                    </FormGroup>
            </Col>
            <Col md={12} className="mb-5">
                <h6>If you know the precise coordinates of your observation location, please enter below</h6>
                <Row>
                    <Col md={6} lg={4}>
                        <FormGroup row>
                            <Label htmlFor="LAT" sm={2} >LAT</Label>
                            <Col sm={10}>
                                <Input
                                    value={address?.markerPosition?.lat}
                                    id="LAT"
                                    type="textbox"
                                    name="LAT"
                                    placeholder="Edmon, OK, USA"
                                    onChange={handleChangeLat}
                                />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col md={6} lg={4}>
                        <FormGroup row>
                            <Label htmlFor="LAT" sm={2} >LON</Label>
                            <Col sm={10}>
                                <Input
                                    value={address?.markerPosition?.lng}
                                    id="LON"
                                    type="search"
                                    name="LON"
                                    placeholder="Edmon, OK, USA"
                                    onChange={handleChangeLng}
                                />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col md={6} lg={4}>
                        <div className="selected-address pb-0 pb-lg-3 d-flex align-items-center justify-content-start justify-content-lg-end">
                            <img src={Images.Flag} alt="USA Flag"/> 
                            Edmon, OK, USA
                            {address?.address}
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col md={12} className="mb-5">
                <Row>
                    <Col lg={7} className="order-2 order-lg-1">
                        <h6>Please enter date and time for your observation</h6>
                    </Col>
                    <Col lg={5} className="order-1 order-lg-2 mb-2 mb-lg-0">
                        <FormGroup check>
                            <Label check className="mb-0">
                                <Input
                                    required
                                    type="checkbox"
                                    name="Same as the first image"
                                />
                                Same as the first image
                            </Label>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} lg={4}>
                        <FormGroup>
                            <Label htmlFor="Date">Date</Label>
                            <Input
                                id="Date"
                                type="date"
                                name="Date"
                                className="w-100"
                                placeholder="12/20/2021" 
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6} lg={4}>
                        <FormGroup>
                            <Label htmlFor="Time">Time</Label>
                            <Input
                                id="Time"
                                type="time"
                                name="Time"
                                className="w-100"
                                placeholder="10:21:00 am"
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6} lg={4}>
                        <FormGroup>
                            <Label htmlFor="TIME ZONE">TIME ZONE</Label>
                            <Input type="select" name="select" className="w-100">
                                <option disabled defaultValue>
                                CT
                                </option>
                                <option>CT</option>
                                <option>CT</option>
                                <option>CT</option>
                                <option>CT</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
            </Col>
            <Col md={12} className="mb-5">
                <h6>How accurate is your timing?</h6>
                <FormGroup>
                    <Label htmlFor="Date">Uncertainty in Time</Label>
                    <Input
                        id="Date"
                        type="text"
                        name="Date"
                        placeholder="e.g. +/- 3 sec  or  +/- 1 min" 
                        className="w-100"
                    />
                </FormGroup>
            </Col>
            <Col md={12} className="mb-5">
                <h6>Please choose azimuth (look direction) of your observation <p className="required">Required</p></h6>
                <FormGroup className="d-flex align-items-center position-relative mb-4 pb-3">
                    <div className="custom-switch">
                        <input
                            id="checkbox2"
                            type="checkbox"
                            className="hidden"
                            onClick={()=> setAngleDegree(!angleDegree)}
                        />
                        <label
                            className="switchbox"
                            htmlFor="checkbox2"
                        />
                        <span>I know the precise azimuth angle in degrees</span>
                    </div>
                </FormGroup>
                {!angleDegree ? 
                    <FormGroup>
                        <Label className="justify-content-center mb-3">Look Direction</Label>
                        <div className="compass-wrapper">
                            {
                                directionValue?.map((direction, index)=>{
                                    return(
                                        <Button 
                                            className={`${direction.name}-direction ${
                                                isActiveDire === index ? "active_direction" : null}`
                                            }
                                            onClick={()=> selectDirection(index)}
                                            key={index}
                                            id= {`directionValue${index}`}
                                            data-angle ={direction.angle}
                                        >{direction.name}</Button>
                                    )
                                })
                            }
                            <div className="center-dot rounded-circle"></div>
                            <div className="rotate-arrow-wrap">
                                <div className="rotate-arrow-inner" style={{ "--directionAngle": directionAngle + 'deg' }}>
                                    <div className="rotate-arrow main"><img src={Images.compassArrow} alt="Compass Arrow" /> </div>
                                    <div className="rotate-arrow hidden"><img src={Images.compassArrow} alt="Compass Arrow" /> </div>
                                </div>
                            </div>
                        </div>
                    </FormGroup>
                : 
                    <FormGroup>
                        <Label htmlFor="Date">Azimuth Angle</Label>
                        <Input
                            id="Date"
                            type="text"
                            name="Date"
                            placeholder="120°" 
                            className="degree-input"
                        />
                    </FormGroup>
                }
                <FormGroup className="mt-5">
                    <Button className="gray-outline-btn me-2" onClick={() => toggleTab(Tabs.ObservationImages)}>Back</Button>
                    <Button className="" onClick={() => toggleTab(Tabs.EquipmentDetails)}>Continue</Button>
                </FormGroup>
            </Col>
        </>
    )
}

export default ObservationLocation;