import { Col, FormGroup, Input, Label, Row, Button } from "reactstrap";
import Images from "../../static/images";
import {useState, useEffect,useRef} from 'react';
import Autocomplete from 'react-google-autocomplete';
import {Tabs} from "../../helpers/observation";
import "../../assets/scss/component/observationLocation.scss";
import useObservations from "../../hooks/useObservations";
import  MapWrapper from '../MapWrapper';
import ReactCountryFlags from '../ReactCountryFlag';


const ObservationLocation = (props) => {
    const { toggleTab,handleImageInput } = props;
    const fref = useRef()
    const [address1,setAddress] = useState({
        address: '204, Mote Mangal Karyalay Rd, Bhavani Peth, Shobhapur, Kasba Peth, Pune, Maharashtra 411011, India',
        city: '',
        area: '',
        state: '',
        country: 'IN',
        short_address: 'Maharashtra, India',
        mapPosition: {
            lat: 18.5204,
            lng: 73.8567
        },
        markerPosition: {
            lat: 18.5204,
            lng: 73.8567
        }
    });
    const [isLoaded,setIsLoaded] = useState(false);
    const {observationImages, setObservationImages,observationData} = useObservations();
    const [isActiveDire, setActiveDire] = useState(null);
    const [directionAngle, setDirectionAngle] = useState(0);
    const [angleDegree, setAngleDegree] = useState(false);

    const directionValue = [
        {name: 'N', angle: 360, default : true},
        {name: 'NE', angle: 45, default : false},
        {name: 'E', angle: 90, default : false},
        {name: 'SE', angle: 135, default : false},
        {name: 'S', angle: 180, default : false},
        {name: 'SW', angle: 235, default : false},
        {name: 'W', angle: 270, default : false},
        {name: 'NW', angle: 315, default : false},
    ]

    const handleValue = (value) => {
        console.log(value.short_address);
        setAddress(value);
        if(observationImages?.data){
            let observationAddress = {...observationImages};
            if(observationAddress?.data){
                observationAddress.data[observationAddress.selected_image_index]['latitude'] = value.markerPosition.lat;
                observationAddress.data[observationAddress.selected_image_index]['longitude'] = value.markerPosition.lng;
                observationAddress.data[observationAddress.selected_image_index]['location'] = value.short_address;
                observationAddress.data[observationAddress.selected_image_index]['country_code'] = value.country;
                setObservationImages(observationAddress);
            }
        }
    }
    const observationArray = {...observationImages};
    
    const handleChangeLat = (e) => {
        handleImageInput(e);
        let name = e.target.name,
             value = Number(e.target.value);
             let addressState = {...address1};
             addressState.mapPosition.lat = value;
             addressState.markerPosition.lat = value;
             setAddress(addressState);
            //  let imageArray = {...observationImages};
            //  imageArray.images[0].lat = value;
            //  setObservationImages(imageArray);
            //  setTimeout(()=> {
                 setIsLoaded(true);
            //  },3000);
            fref.current.handleChangeLatLng(e.target.value,address1.markerPosition.lng);
    }
    const handleChangeLng = (e) => {
        handleImageInput(e);
        let name = e.target.name,
             value = Number(e.target.value);
             let addressState = {...address1};
             addressState.mapPosition.lng = value;
             addressState.markerPosition.lng = value;
        setAddress(addressState);
        setIsLoaded(true);
        fref.current.handleChangeLatLng(address1.markerPosition.lat,e.target.value);
    }
    useEffect(() => {
        let observationAddress = {...observationImages};        
        if(observationAddress?.data){
            let addressState = {...address1};
            observationAddress.data[observationAddress.selected_image_index]['location'] = address1?.short_address;
            observationAddress.data[observationAddress.selected_image_index]['country_code'] = address1?.country;
            setObservationImages(observationAddress);
        }
    },[address1]);
    const selectDirection = (index) => {
        const directionWrapper = document.querySelector('.compass-wrapper');
        const directionId = document.getElementById(`directionValue${index}`);
        let getAngleValue = directionId.getAttribute("data-angle"),
            getAngleName = directionId.getAttribute("data-name");

        if(isActiveDire === index){
            directionWrapper.classList.remove("active-arrow");
        }else{
            directionWrapper.classList.add("active-arrow");
            setActiveDire(index);
            setDirectionAngle(getAngleValue);
            

            if (observationImages?.data[observationImages?.selected_image_index]?.is_precise_az === false) {
                observationArray.data[observationImages?.selected_image_index]['azimuth'] = getAngleName;
            }
        }
    }
    const handleCopyData = (e,keys) => {
        console.log(keys);
        let copyImages = {...observationImages};
        keys.map((k) => {
        if(e.target.checked){
            copyImages.data[copyImages?.selected_image_index][k] = copyImages.data[0][k];
        }else{
            copyImages.data[copyImages?.selected_image_index][k] = (k === 'obs_time' || k === 'obs_date') ? null : '';
        }
        });
            setObservationImages(copyImages);
    }

    return (
        <>
            <Col md="12">
                <FormGroup row>
                    <Row>
                        <Col lg={7} className="order-2 order-lg-1">
                            <h6>Where did you make the observation?</h6>
                        </Col>
                        {observationImages?.selected_image_index !== 0 && observationData?.image_type === 2 && <Col lg={5} className="order-1 order-lg-2 mb-2 mb-lg-0">
                            <FormGroup check>
                                <Label check className="mb-0">
                                    <Input
                                        type="checkbox"
                                        name="Same as the first image"
                                        onChange={(e) => handleCopyData(e,['latitude','longitude'])}
                                    />
                                    Same as the first image
                                </Label>
                            </FormGroup>
                        </Col>}
                    </Row>
                     <MapWrapper
                        google={props.google}
                        center={{ lat: Number((observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.latitude: address1?.markerPosition?.lat), lng: Number((observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.longitude: address1?.markerPosition?.lng) }}
                        height="400px"
                        containerPosition={"relative"}
                        mapRadius="10px"
                        zoom={15}
                        handleState={handleValue}
                        isLoaded={isLoaded}
                        mapContainer="map-search-container"
                        searchInputClass="search-input-class"
                        ref={fref}
                    /> 
                </FormGroup>
            </Col>
            <Col md={12} className="mb-5">
                <h6>If you know the precise coordinates of your observation location, please enter below</h6>
                <Row>
                    <Col md={6} lg={4}>
                        <FormGroup row>
                            <Label className="form-label" htmlFor="LAT" sm={2} >LAT</Label>
                            <Col sm={10}>
                                <Input
                                    // value={address1?.markerPosition?.lat}
                                    value={(observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.latitude : address1?.markerPosition?.lat}
                                    id="LAT"
                                    type="number"
                                    name="latitude"
                                    placeholder="Edmon, OK, USA"
                                    onChange={(e)=> {handleImageInput(e); handleChangeLat(e);}}
                                />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col md={6} lg={4}>
                        <FormGroup row>
                            <Label className="form-label" htmlFor="LAT" sm={2} >LON</Label>
                            <Col sm={10}>
                                <Input
                                    // value={address1?.markerPosition?.lng}
                                    value={(observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.longitude :address1?.markerPosition?.lng}
                                    id="LON"
                                    type="number"
                                    name="longitude"
                                    placeholder="Edmon, OK, USA"
                                    onChange={(e)=> {handleImageInput(e); handleChangeLng(e);}}
                                />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col md={6} lg={4}>
                        <div className="selected-address pb-0 pb-lg-3 d-flex align-items-center justify-content-start justify-content-lg-end">
                        <ReactCountryFlags country={(observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.country_code: null} />
                            {/* <img src={Images.Flag} alt="USA Flag"/>  */}
                            <span>{(observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.location : ''}</span>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col md={12} className="mb-5">
                <Row>
                    <Col lg={7} className="order-2 order-lg-1">
                        <h6>Please enter date and time for your observation</h6>
                    </Col>
                    {observationImages?.selected_image_index !== 0 && observationData?.image_type === 2 && <Col lg={5} className="order-1 order-lg-2 mb-2 mb-lg-0">
                        <FormGroup check>
                            <Label check className="mb-0">
                                <Input
                                    type="checkbox"
                                    name="Same as the first image"
                                    onChange={(e) => handleCopyData(e,['obs_date','obs_time','timezone'])}
                                />
                                Same as the first image
                            </Label>
                        </FormGroup>
                    </Col>}
                </Row>
                <Row>
                    <Col md={6} lg={4}>
                        <FormGroup>
                            <Label htmlFor="Date">Date</Label>
                            <Input
                                id="Date"
                                type="date"
                                name="obs_date"
                                value={(observationImages?.data) ? (observationImages?.data[observationImages?.selected_image_index]?.obs_date === null ? 'dd/mm/yyyy' : observationImages?.data[observationImages?.selected_image_index]?.obs_date) : 'dd/mm/yyyy'}
                                className="w-100"
                                placeholder="12/20/2021"
                                onChange={(e)=>handleImageInput(e)}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6} lg={4}>
                        <FormGroup>
                            <Label htmlFor="Time">Time</Label>
                            <Input
                                id="Time"
                                type="time"
                                name="obs_time"
                                value={observationImages?.data ? (observationImages?.data[observationImages?.selected_image_index]?.obs_time === null ? '--:--' : observationImages?.data[observationImages?.selected_image_index]?.obs_time) : ''}
                                className="w-100"
                                placeholder="10:21:00 am"
                                onChange={(e)=>handleImageInput(e)}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6} lg={4}>
                        <FormGroup>
                            <Label htmlFor="TIME ZONE">TIME ZONE</Label>
                            <Input type="select" name="timezone" className="w-100"
                            value={(observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.timezone:''}
                             onChange={(e)=>handleImageInput(e)}>
                                <option disabled defaultValue>
                                CT
                                </option>
                                <option>CT</option>
                                <option>ET</option>
                                <option>CTS</option>
                                <option>CT</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
            </Col>
            <Col md={12} className="mb-5">
                <h6>How accurate is your timing?</h6>
                {/*<FormGroup>*/}
                {/*    <Label htmlFor="Date">Uncertainty in Time</Label>*/}
                {/*    <Input*/}
                {/*        id="Date"*/}
                {/*        type="text"*/}
                {/*        name="uncertainity_time"*/}
                {/*        value={(observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.uncertainity_time:''}*/}
                {/*        placeholder="e.g. +/- 3 sec  or  +/- 1 min" */}
                {/*        className="w-100"*/}
                {/*        onChange={(e)=>handleImageInput(e)}*/}
                {/*    />*/}
                {/*</FormGroup>*/}
            </Col>
            <Col md={12} className="mb-5">
                <h6>Please choose azimuth (look direction) of your observation <p className="required">Required</p></h6>
                <FormGroup className="d-flex align-items-center position-relative mb-4 pb-3">
                    <div className="custom-switch">
                        <input
                            id="checkbox2"
                            type="checkbox"
                            name="is_precise_az"
                            checked={(observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.is_precise_az :''}
                            className="hidden"
                            onChange={(e)=>handleImageInput(e)}
                            onClick={()=> setAngleDegree(!angleDegree)}
                        />
                        <label
                            className="switchbox"
                            htmlFor="checkbox2"
                        />
                        <span>I know the precise azimuth angle in degrees</span>
                    </div>
                </FormGroup>
                {( (observationImages?.data) && observationImages?.data[observationImages?.selected_image_index]?.is_precise_az === false) ? 
                    <FormGroup>
                        <Label className="justify-content-center mb-3">Look Direction</Label>
                        <div className="compass-wrapper">
                            {
                                directionValue?.map((direction, index)=>{
                                    return(
                                        <Button 
                                            className={`${direction.name}-direction ${(direction.default === true) && isActiveDire === null ? 'active_direction' : ''}${ isActiveDire === index ? ( observationArray.data[observationImages?.selected_image_index]['azimuth'] === "" ? 'active_direction' : '') : '' }${observationArray.data[observationImages?.selected_image_index]['azimuth'] === direction.name ? 'active_direction' : ''}`}
                                            onClick={()=> selectDirection(index)}
                                            key={index}
                                            id= {`directionValue${index}`}
                                            data-angle={direction.angle}
                                            data-name={direction.name}
                                        >{direction.name}</Button>
                                    )
                                })
                            }
                            <div className="center-dot rounded-circle" />
                            <div className="rotate-arrow-wrap">
                                <div className="rotate-arrow-inner" style={{ "--directionAngle": directionValue.filter((item) => item.name === observationArray.data[observationImages?.selected_image_index]['azimuth']).map((dirData) => {
                                    return dirData.angle;
                                }) + 'deg' }}>
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
                            name="azimuth"
                            value={(observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.azimuth:''}
                            placeholder="120°" 
                            className="degree-input"
                            onChange={(e)=>handleImageInput(e)}
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