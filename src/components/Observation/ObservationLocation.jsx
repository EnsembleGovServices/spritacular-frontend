import "../../assets/scss/component/observationLocation.scss";
import {
    Button,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    FormGroup,
    Input,
    Label,
    Row
} from "reactstrap";
import {useEffect, useRef, useState} from 'react';
import useObservations from "../../hooks/useObservations";
import MapWrapper from '../MapWrapper';
import ReactCountryFlags from '../ReactCountryFlag';
import Images from "../../static/images";
import {directionValue, Tabs} from "../../helpers/observation";
import {timezone} from "../../helpers/timezone";
import ObservationCategory from "./ObservationCategory";
import {Icon} from '@iconify/react';


const ObservationLocation = (props) => {
    const { toggleTab,handleImageInput, error, step, obvType,disableNext } = props;
    const fref = useRef()
    const [address1,setAddress] = useState({
        address: '',
        city: '',
        area: '',
        state: '',
        country: '',
        short_address: '',
        mapPosition: {
            lat: null,
            lng: null
        },
        markerPosition: {
            lat: null,
            lng: null
        }
    });
    const [initialAddress,setInitialAddress] = useState({
        country: '',
        short_address: '',
       lat:null,
       lng:null
    });
    const [isLoaded,setIsLoaded] = useState(false);
    const {observationImages, setObservationImages,observationData} = useObservations();
    const [isActiveDire, setActiveDire] = useState(null);
    const [angleDegree, setAngleDegree] = useState(0);
    const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
    const [searchTimeZone, setSearchTimeZone] = useState("");
    const [sameAsMap, setSameAsMap] = useState(false);
    const [sameAsDateTime, setSameAsDateTime] = useState(false);

    useEffect(()=> {
        
        if(observationImages?.data && observationImages?.data[observationImages?.selected_image_index]?.sameAsFirstMap === false){
            fref.current.handleChangeLatLng(observationImages?.data[observationImages?.selected_image_index]?.latitude , observationImages?.data[observationImages?.selected_image_index]?.longitude);
        }
      
    },[observationImages?.data?.[observationImages?.selected_image_index],observationImages?.selected_image_index]);

    useEffect(()=> {
        // setSameAsMap(false);
        // setSameAsDateTime(false);
        if(observationImages?.data && observationImages?.selected_image_index !== 0){
            handleCopyData(observationImages?.data[observationImages?.selected_image_index]?.sameAsFirstMap,['latitude','longitude','location','country_code']);
            handleCopyData(observationImages?.data[observationImages?.selected_image_index]?.sameAsFirstDate,['obs_date','obs_time','timezone']);
        }

    },[observationImages?.selected_image_index]);

    const handleValue = (flag,value) => {
        if(!flag){
            console.log(value);
            let address = {...address1};
            address.country_code = value[0];
            address.short_address = value[1];
            setInitialAddress({
                country: value[0],
                address:value[1],
                lat: Number((observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.latitude: null),
                lng :Number((observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.longitude: null)
            })
            setAddress(address);
            if(observationImages?.data){
                let observationAddress = {...observationImages};
                if(observationAddress?.data){
                    observationAddress.data[observationAddress.selected_image_index]['location'] = value[1];
                    observationAddress.data[observationAddress.selected_image_index]['country_code'] = value[0];
    
                    if(observationData?.image_type === 3){
                        if(observationAddress.data[1]){
                            observationAddress.data[1]['location'] = value[1];
                            observationAddress.data[1]['country_code'] = value[0];
                        }
                        if(observationAddress.data[2]){
                            observationAddress.data[2]['location'] = value[1];
                            observationAddress.data[2]['country_code'] = value[0];
                        }
                    }
                    setObservationImages(observationAddress);
                }
            }
        }
        else{
            setAddress(value);
            if(observationImages?.data){
                let observationAddress = {...observationImages};
                if(observationAddress?.data){
                    observationAddress.data[observationAddress.selected_image_index]['latitude'] = value.markerPosition.lat;
                    observationAddress.data[observationAddress.selected_image_index]['longitude'] = value.markerPosition.lng;
                    observationAddress.data[observationAddress.selected_image_index]['location'] = value.short_address;
                    observationAddress.data[observationAddress.selected_image_index]['country_code'] = value.country;
    
                    if(observationData?.image_type === 3){
                        if(observationAddress.data[1]){
                            observationAddress.data[1]['latitude'] = value.markerPosition.lat;
                            observationAddress.data[1]['longitude'] = value.markerPosition.lng;
                            observationAddress.data[1]['location'] = value.short_address;
                            observationAddress.data[1]['country_code'] = value.country;
                        }
                        if(observationAddress.data[2]){
                            observationAddress.data[2]['latitude'] = value.markerPosition.lat;
                            observationAddress.data[2]['longitude'] = value.markerPosition.lng;
                            observationAddress.data[2]['location'] = value.short_address;
                            observationAddress.data[2]['country_code'] = value.country;
                        }
                    }
                    setObservationImages(observationAddress);
                }
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

            if(observationData?.image_type === 3){
                if(observationAddress.data[1]){
                    observationAddress.data[1]['location'] = address1?.short_address;
                    observationAddress.data[1]['country_code'] = address1?.country;
                }
                if(observationAddress.data[2]){
                    observationAddress.data[2]['location'] = address1?.short_address;
                    observationAddress.data[2]['country_code'] = address1?.country;
                }
            }
            setObservationImages(observationAddress);
        }
    },[address1]);
    useEffect(() => {
        let observationAddress = {...observationImages};        
        if(observationAddress?.data){
            let addressState = {...address1};
            // observationAddress.data[observationAddress.selected_image_index]['location'] = address1?.short_address;
            // observationAddress.data[observationAddress.selected_image_index]['country_code'] = address1?.country;

            if(observationData?.image_type === 3){
                if(observationAddress.data[1]){
                    observationAddress.data[1]['location'] = observationAddress.data[0]['location'];
                    observationAddress.data[1]['country_code'] = observationAddress.data[0]['country_code'];
                }
                if(observationAddress.data[2]){
                    observationAddress.data[2]['location'] = observationAddress.data[0]['location'];
                    observationAddress.data[2]['country_code'] = observationAddress.data[0]['country_code'];
                }
            }
            setObservationImages(observationAddress);
        }
    },[observationData?.image_type]);
    console.log(observationImages,address1);
    const selectDirection = (index) => {
        const directionWrapper = document.querySelector('.compass-wrapper');
        const directionId = document.getElementById(`directionValue${index}`);
        let getAngleName = directionId.getAttribute("data-name");

        if(isActiveDire === index){
            directionWrapper.classList.remove("active-arrow");
        }else{
            directionWrapper.classList.add("active-arrow");
            setActiveDire(index);
            

            if (observationImages?.data[observationImages?.selected_image_index]?.is_precise_azimuth === 0) {
                observationArray.data[observationImages?.selected_image_index]['azimuth'] = getAngleName;

                if(observationData?.image_type === 3){
                    if(observationArray.data[1]){
                        observationArray.data[1]['azimuth'] = getAngleName;
                    }
                    if(observationArray.data[2]){
                        observationArray.data[2]['azimuth'] = getAngleName;
                    }
                }
            }
        }
    }
    const handleCopyData = (e,keys) => {
        if(observationImages){

            let observationMap = {...observationImages};
            if(keys.includes('location','latitude','longitude','country_code')){
                setSameAsMap(e);
                observationMap.data[observationImages?.selected_image_index].sameAsFirstMap = e;
            }
            if(keys.includes('obs_time','obs_date','timezone')){
                setSameAsDateTime(e);
                observationMap.data[observationImages?.selected_image_index].sameAsFirstDate = e;
            }
            setObservationImages(observationMap);
            let copyImages = {...observationImages};
            keys.map((k) => {
                if(e){
                    copyImages.data[copyImages?.selected_image_index][k] = copyImages.data[0][k];
                    // copyImages.data[copyImages?.selected_image_index]['location'] = copyImages.data[0]['location'];
                    // copyImages.data[copyImages?.selected_image_index]['country_code'] = copyImages.data[0]['country_code'];
                }else{
                    copyImages.data[copyImages?.selected_image_index][k] = (k === 'obs_time' || k === 'obs_date') ? null : '';
                    if(keys.includes('location','latitude','longitude')){
                        copyImages.data[copyImages?.selected_image_index]['latitude'] = initialAddress.lat;
                        copyImages.data[copyImages?.selected_image_index]['longitude'] = initialAddress.lng;
                        copyImages.data[copyImages?.selected_image_index]['location'] = initialAddress.short_address;
                        copyImages.data[copyImages?.selected_image_index]['country_code'] = initialAddress.country;
                    }
                }
                return false;
            });
            setObservationImages(copyImages);
        }
    }

    const findTimeZone = (e) => {
        let value = e.target.value.toLowerCase();
        setSearchTimeZone(value);
    }

    useEffect(()=> {
        if (isTimezoneOpen === false) {
            setSearchTimeZone("");
        }
    }, [isTimezoneOpen])

    const errorData = error ? Object.values(error?.data) : {};
    return (
        <>
            <Col md="12">
                <FormGroup>
                    <Row>
                        <Col xxl={7} className="order-2 order-xxl-1">
                            <h6>Where did you make the observation? <span className="required">Required</span></h6>
                        </Col>
                        {observationImages?.selected_image_index !== 0 && observationData?.image_type === 2 && 
                            <Col xxl={5} className="order-1 order-xxl-2 mb-2 mb-xxl-0">
                                <FormGroup>
                                    <Label check className="mb-0 justify-content-end">
                                        <Input
                                            type="checkbox"
                                            name="Same as the first image"
                                            checked={observationImages?.data[observationImages?.selected_image_index]?.sameAsFirstMap}
                                            onChange={(e) => handleCopyData(e.target.checked,['latitude','longitude','location','country_code'])}
                                            className="me-2 mt-0"
                                        />
                                        Same as the first image
                                    </Label>
                                </FormGroup>
                            </Col>
                        }
                    </Row>
                    {
                    (
                        (observationImages?.data && observationImages?.data[observationImages?.selected_image_index]?.sameAsFirstMap === false ) 
                        || observationImages?.selected_image_index === 0 ) ?
                        <div className="location_map">
                            <MapWrapper
                                google={props.google}
                                center={{ lat: Number((observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.latitude: address1?.markerPosition?.lat), lng: Number((observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.longitude: address1?.markerPosition?.lng) }}
                                height="100%"
                                containerPosition={"relative"}
                                mapRadius="10px"
                                zoom={15}
                                handleState={handleValue}
                                isLoaded={isLoaded}
                                mapContainer="map-search-container"
                                searchInputClass="search-input-class"
                                ref={fref}
                            /> 
                        </div>
                        :

                        <div  className="border same-data_row">
                            <Row>
                                <Col lg={6}>
                                    <Row className="flex-nowrap">
                                        <div className="border-end w-auto">
                                            <FormGroup className="form-group d-flex align-items-center">
                                                <Label className="form-label text-uppercase mb-0 me-2" htmlFor="LAT">LAT</Label>
                                                <span className="fw-bold text-truncate data-value">{(observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.latitude : address1?.markerPosition?.lat
                                                }</span>
                                            </FormGroup>
                                        </div>
                                        <div className="w-auto">
                                            <FormGroup className="form-group d-flex align-items-center">
                                                <Label className="form-label text-uppercase mb-0 me-2" htmlFor="LON">LON</Label>
                                                <span className="fw-bold text-truncate data-value">{(observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.longitude :address1?.markerPosition?.lng}</span>
                                            </FormGroup>
                                        </div>
                                    </Row>
                                </Col>
                                <Col lg={6}>
                                    <div className="selected-address d-block d-lg-flex align-items-center justify-content-start justify-content-lg-end mt-2 mt-lg-0">
                                        <ReactCountryFlags country={(observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.country_code: address1?.country_code} />
                                        <span>{(observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.location : ''}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        }
                </FormGroup>
            </Col>
            {
            (
                // sameAsMap === false
                ( observationImages?.data &&  observationImages?.data[observationImages?.selected_image_index]?.sameAsFirstMap === false)
              || observationImages?.selected_image_index === 0) &&
                <Col md={12} className="mb-5">
                    <h6>If you know the precise coordinates of your observation location, please enter below</h6>
                    <Row>
                        <Col md={6} lg={4}>
                            <FormGroup className="d-flex">
                                <Label className="form-label text-uppercase me-1" htmlFor="LAT" sm={2} >LAT</Label>
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
                            <FormGroup className="d-flex">
                                <Label className="form-label text-uppercase me-1" htmlFor="LON" sm={2} >LON</Label>
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
                                <span>{(observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.location : ''}</span>
                            </div>
                        </Col>
                    </Row>
                </Col>
            }
            {observationData?.image_type === 3 &&
            <Row className="mb-4">
                <ObservationCategory obvType={obvType} error={error} />
            </Row>
            }
            
            <Col md={12} className="mb-5">
                <Row>
                    <Col xxl={7} className="order-2 order-xxl-1">
                        <h6>Please enter date and time for your observation <span className="required">Required</span></h6>
                    </Col>
                    {observationImages?.selected_image_index !== 0 && observationData?.image_type === 2 && <Col xxl={5} className="order-1 order-xxl-2 mb-2 mb-xxl-0">
                        <FormGroup>
                            <Label check className="mb-0 justify-content-end">
                                <Input
                                    type="checkbox"
                                    name="Same as the first image"
                                    checked={sameAsDateTime}
                                    onChange={(e) => handleCopyData(e.target.checked,['obs_date','obs_time','timezone'])}
                                    className="me-2 mt-0"
                                />
                                Same as the first image
                            </Label>
                        </FormGroup>
                    </Col>}
                </Row>
                {
                // (sameAsDateTime === false
                    (observationImages?.data && observationImages?.data[observationImages?.selected_image_index]?.sameAsFirstDate === false  
                    || observationImages?.selected_image_index === 0)  ?
                    <Row>
                        <Col md={6} lg={4}>
                            <FormGroup>
                                <Label className="text-uppercase" htmlFor="Date">Date</Label>
                                <Input
                                    id="Date"
                                    type="date"
                                    name="obs_date"
                                    value={(observationImages?.data) ? (observationImages?.data[observationImages?.selected_image_index]?.obs_date === null ? 'dd/mm/yyyy' : observationImages?.data[observationImages?.selected_image_index]?.obs_date) : 'dd/mm/yyyy'}
                                    className="w-100"
                                    placeholder="12/20/2021"
                                    onChange={(e)=>handleImageInput(e)}
                                />
                                {error && errorData?.map((item, index) => {
                                    if (step?.selected_image_index === index) {
                                        return(
                                            <span key={index} className="text-danger small">{item?.obs_date}</span>
                                        )
                                    }
                                    return true;
                                })}
                            </FormGroup>
                        </Col>
                        <Col md={6} lg={4}>
                            <FormGroup>
                                <Label className="text-uppercase" htmlFor="Time">Time</Label>
                                <Input
                                    id="Time"
                                    type="time"
                                    name="obs_time"
                                    value={observationImages?.data ? (observationImages?.data[observationImages?.selected_image_index]?.obs_time === null ? '--:--' : observationImages?.data[observationImages?.selected_image_index]?.obs_time) : ''}
                                    className="w-100"
                                    placeholder="10:21:00 am"
                                    onChange={(e)=>handleImageInput(e)}
                                />
                                {error && errorData?.map((item, index) => {
                                    if (step?.selected_image_index === index) {
                                        return(
                                            <span key={index} className="text-danger small">{item?.obs_time}</span>
                                        )
                                    }
                                    return true;
                                })}
                            </FormGroup>
                        </Col>
                        <Col md={6} lg={4}>
                            <FormGroup>
                                <Label className="text-uppercase" htmlFor="TIME ZONE">TIME ZONE</Label>
                                <Dropdown className="dropdown-with-search" toggle={() => setIsTimezoneOpen(!isTimezoneOpen)} isOpen={isTimezoneOpen}>
                                    <DropdownToggle className="px-3 shadow-none border-0 text-black fw-normal text-start d-flex justify-content-between align-items-center w-100">
                                        {/*<span className="text-truncate">{(observationImages?.data) ? `${observationImages?.data[observationImages?.selected_image_index]?.timezone.substring(0, 16)+'...'}` : ''}</span>*/}
                                        <span className="text-truncate">{(observationImages?.data) ? `${observationImages?.data[observationImages?.selected_image_index]?.timezone}` : ''}</span>
                                        <Icon icon="fe:arrow-down" className="down-arrow ms-1"/>
                                    </DropdownToggle>
                                    <DropdownMenu className="py-0 shadow">
                                        <DropdownItem header className="mb-0 position-sticky start-0 top-0 end-0 p-2 bg-white"><Input type="text" className="p-2" onChange={(e)=> findTimeZone(e)} placeholder="Search Timezone" /></DropdownItem>
                                        {timezone?.filter(item => {
                                            return item.toLowerCase().indexOf(searchTimeZone.toLowerCase()) !== -1;
                                        }).map((item, index) => {
                                            return <DropdownItem  name="timezone" className="px-2 fw-normal" key={index} value={item} onClick={(e)=>handleImageInput(e)}>{item}</DropdownItem>
                                        })}
                                    </DropdownMenu>
                                </Dropdown>
                                {error && errorData?.map((item, index) => {
                                    if (step?.selected_image_index === index) {
                                        return(
                                            <span key={index} className="text-danger small">{item?.timezone}</span>
                                        )
                                    }
                                    return true;
                                })}
                            </FormGroup>
                        </Col>
                    </Row>
                    :
                    <div  className="border same-data_row">
                        <Row>
                            <Col lg={6}>
                                <Row className="flex-nowrap">
                                    <div className="border-end w-auto">
                                        <FormGroup className="form-group d-flex align-items-center">
                                            <Label className="form-label text-uppercase mb-0 me-2" htmlFor="Date">Date</Label>
                                            <span className="fw-bold text-truncate data-value">{(observationImages?.data) ? (observationImages?.data[observationImages?.selected_image_index]?.obs_date === null ? 'dd/mm/yyyy' : observationImages?.data[observationImages?.selected_image_index]?.obs_date) : 'dd/mm/yyyy'}</span>
                                        </FormGroup>
                                    </div>
                                    <div className="w-auto">
                                        <FormGroup className="form-group d-flex align-items-center">
                                            <Label className="form-label text-uppercase mb-0 me-2" htmlFor="Time">Time</Label>
                                            <span className="fw-bold text-truncate data-value">{observationImages?.data ? (observationImages?.data[observationImages?.selected_image_index]?.obs_time === null ? '--:--' : observationImages?.data[observationImages?.selected_image_index]?.obs_time) : ''}</span>
                                        </FormGroup>
                                    </div>
                                </Row>
                            </Col>
                            <Col lg={6}>
                                <div className="selected-address mt-2 mt-lg-0 text-end d-block">
                                    <span className="opacity-75">{(observationImages?.data) ? `${observationImages?.data[observationImages?.selected_image_index]?.timezone}` : ''}</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                }
            </Col>
            <Col md={12} className="mb-5">
                <h6>How accurate is your timing?</h6>
                <FormGroup>
                    <Label className="text-uppercase" htmlFor="Date">Uncertainty in Time</Label>
                    <Input
                        id="Date"
                        type="text"
                        name="time_accuracy"
                        value={(observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.time_accuracy:''}
                        placeholder="e.g. +/- 3 sec  or  +/- 1 min"
                        className="w-100"
                        onChange={(e)=>handleImageInput(e)}
                    />
                </FormGroup>
            </Col>
            <Col md={12} className="mb-5">

                {error && errorData?.map((item, index) => {
                    if (step?.selected_image_index === index) {
                        return(
                            <span key={index} className="text-danger small">{item?.azimuth}</span>
                        )
                    }
                    return true;
                })}
                <FormGroup className="d-flex align-items-center position-relative mb-4 pb-3">
                    <div className="custom-switch">
                        <input
                            id="checkbox2"
                            type="checkbox"
                            name="is_precise_azimuth"
                            checked={(observationImages?.data) ? observationImages?.data[observationImages?.selected_image_index]?.is_precise_azimuth :''}
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

                {(observationImages?.data && observationImages?.data[observationImages?.selected_image_index]?.is_precise_azimuth === 0) ?
                    <FormGroup>
                        <Label className="justify-content-center mb-3 text-uppercase">Look Direction</Label>
                        <div className="compass-wrapper">
                            {
                                directionValue?.map((direction, index)=>{
                                    return(
                                        <Button
                                            className={`${direction.name}-direction ${observationArray.data[observationImages?.selected_image_index]['azimuth'] === direction.name ? 'active_direction' : ''}`}
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
                        <Label htmlFor="Azimuth">Azimuth Angle</Label>
                        <Input
                            id="Azimuth"
                            type="number"
                            min={0}
                            max={360}
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
                    <Button className="" onClick={() => toggleTab(Tabs.EquipmentDetails)} disabled ={!disableNext}>Continue</Button>
                </FormGroup>
            </Col>
        </>
    )
}

export default ObservationLocation;