import {
    Button,
    Col,
    Container,
    Form,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
    FormGroup,
    UncontrolledAlert
} from "reactstrap";
import "../../assets/scss/component/uploadObservationImage.scss";
import {useEffect, useState} from "react";
import useObservations from "../../hooks/useObservations";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import {baseURL, cameraSettingFields, routeUrls} from "../../helpers/url";
import {Tabs} from "../../helpers/observation";

// const ObservationLocation = lazy(()=> import('../../components/Observation/ObservationLocation'))
// const EquipmentDetails = lazy(()=> import('../../components/Observation/EquipmentDetails'))
// const ObservationUploadedImg = lazy(()=> import('../../components/Observation/ObservationUploadedImg'))
// const ObservationImages = lazy(()=> import('../../components/Observation/ObservationImages'))
// const ObservationProgress = lazy(()=> import('../../components/Observation/ObservationProgress'))
// const ObservationAfterImageUpload = lazy(()=> import('../../components/Observation/ObservationAfterImageUpload'))
// const EquipmentDetailsForm = lazy(()=> import('../../components/Observation/EquipmentDetailsForm'))

import ObservationLocation from "../../components/Observation/ObservationLocation";
import EquipmentDetails from "../../components/Observation/EquipmentDetails";
import ObservationUploadedImg from "../../components/Observation/ObservationUploadedImg";
import ObservationImages from "../../components/Observation/ObservationImages";
import ObservationProgress from "../../components/Observation/ObservationProgress";
import ObservationAfterImageUpload from "../../components/Observation/ObservationAfterImageUpload";
import EquipmentDetailsForm from "../../components/Observation/EquipmentDetailsForm";
import {useLocation, useNavigate} from "react-router-dom";
import Loader from "../../components/Shared/Loader";


const AddObservation = () => {
    const { auth } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const {
        observationSteps,
        setObservationSteps,
        observationImages,
        setObservationImages,
        observationData,
        setObservationData,
        observationType
    } = useObservations();
    const [activeTab, setActiveTab] = useState(Tabs.ObservationImages);
    const [next, setNext] = useState(false);
    const [isSwitchOn, setSwitchOn] = useState(false);
    const [cameraDetails, setCameraDetails] = useState(cameraSettingFields);
    const [draft, setDraft] = useState(true);
    const [reset, setReset] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || routeUrls.profile;

    var disabledLocation = false;
    for (let index = 0; index < observationData?.map_data?.length; index++) {
        console.log(index);
        if(observationData?.map_data?.[index] && observationData?.map_data?.[index]?.category_map?.category.length > 0 ){
            disabledLocation = true;
        }else{
            disabledLocation = false;
            break;
        }
    }

    var disabledEquipment = false;
    for (let index = 0; index < observationData?.map_data?.length; index++) {
        if(observationData?.map_data?.[index] && observationData?.map_data?.[index]?.azimuth && observationData?.map_data?.[index]?.obs_time && observationData?.map_data?.[index]?.obs_date && observationData?.map_data?.[index]?.timezone){
            disabledEquipment = true;
        }else{
            disabledEquipment = false;
            break;
        }
    }
    console.log(disabledLocation,disabledEquipment,next);
    const disabledLocationTab = (observationData?.image_type !== 3) ?  disabledLocation && next : next;
    const disabledEquipmentTab = disabledLocation && next && disabledEquipment;

    // Toggle Tabs
    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
        window.scrollTo(0, 0);
    };

    const handleInput = (e) => {
        let name = e.target.name,
            value = e.target.value;
        setCameraDetails({
            ...cameraDetails,
            [name]:value,
        });

        setObservationData(prev => {
            return {
                ...prev,
                camera: cameraDetails
            }
        });
    }

    const handleOtherCamera = (e) => {
        let name = e.target.name,
            value = e.target.value;

        setObservationData(prev => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    const handleImageInput = (e,address = null) => {
        let observationArray = {...observationImages};
        if(e === 'address'){
            observationArray.data[observationImages?.selected_image_index]['location'] = address;
            if(observationArray.data[1]){
                observationArray.data[1].category_map['location'] = address;
            }
            if(observationArray.data[2]){
                observationArray.data[2].category_map['location'] = address;
            }
        }else{
            let name = e.target.name,
                value = e.target.value;
            // console.log(e.target.checked,name);


            if(name === 'is_other'){
                observationArray.data[observationImages?.selected_image_index].category_map[name] = e.target.checked;
                if(observationData?.image_type === 3){
                    if(observationArray.data[1]){
                        observationArray.data[1].category_map[name] = e.target.checked;
                    }
                    if(observationArray.data[2]){
                        observationArray.data[2].category_map[name] = e.target.checked;
                    }
                }
            }else{
                if(name === 'is_precise_az'){
                    // console.log('hihi');
                    observationArray.data[observationImages?.selected_image_index][name] = e.target.checked;
                    if(observationData?.image_type === 3){
                        if(observationArray.data[1]){
                           observationArray.data[1]['is_precise_az'] = e.target.checked;
                        }
                        if(observationArray.data[2]){
                            observationArray.data[2]['is_precise_az'] = e.target.checked;
                        }
                    }
                    if(e.target.checked === false){
                        observationArray.data[observationImages?.selected_image_index]['azimuth'] = 'N';
                        if(observationData?.image_type === 3){
                            if(observationArray.data[1]){
                               observationArray.data[1]['azimuth'] = 'N';
                            }
                            if(observationArray.data[2]){
                                observationArray.data[2]['azimuth'] = 'N';
                            }
                        }
                    }
                }
                else{
                    observationArray.data[observationImages?.selected_image_index][name] = value;
                    if(observationData?.image_type === 3){
                        if(observationArray.data[1]){
                            observationArray.data[1][name] = value;
                        }
                        if(observationArray.data[2]){
                            observationArray.data[2][name] = value;
                        }
                    }
                }
                // if(observationData?.image_type === 3){
                //     if(observationArray.data[1]){
                //         observationArray.data[1][name] = (value === 'on') ? true : (value === '' ? false: value);
                //     }
                //     if(observationArray.data[2]){
                //         observationArray.data[2][name] = (value === 'on') ? true : value;
                //     }
                // }
            }
        }
        setObservationImages(observationArray);

    }

    const handlesetDraft = () => {
        let ObservationData = {...observationData};
        ObservationData.isDraft = 1;
        setObservationData(ObservationData);
    }

    const handleSubmit = async (e) => {
        const cloneDeep = require('lodash.clonedeep');
        e.preventDefault();
        setIsLoading(true);
        setDraft(0);

        const formData = new FormData();
        const finalData = cloneDeep(observationData);
        finalData?.map_data?.map((item, index) => {
            delete item["image"];
            formData.append("image_"+index, item.item);
            return true;
        })

        finalData.camera = cameraDetails ? cameraDetails : (auth?.camera ? auth?.camera?.id  : null);
        formData.append("data", JSON.stringify(finalData));


        console.log('finalData', finalData);
        console.log('formData', formData.getAll('data'));

        await axios.post(baseURL.api+'/observation/upload_observation/',formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.token?.access}`
            }
        }).then((response) => {
            setError(null);
            setSuccess({
                data: response?.data,
                status: response?.status,
                message: response?.message
            })
            setIsLoading(false);
            window.scrollTo(0, 0);
            setTimeout(function () {
                handleReset();
            }, 3000)
        }).catch((error) => {
            console.log(error.response);
            setIsLoading(false);
            setError({
                data: error?.response?.data,
                status: error?.response?.status,
                message: error?.message
            })
        })

    }

    const getCameraDetail = async (e) => {

        if(e.target.checked === true){
            await axios.get(baseURL.api+'/users/camera_setting/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.token?.access}`
                }
            }).then((success) => {
                setCameraDetails(success?.data);
            }).catch((error) => {
                console.log(error.response);
            })
        }
        else {
            setCameraDetails(cameraSettingFields);
        }
    }

    const handleContinue = () => {
        setNext(!next);
    }

    const handleReset = (e) => {
        navigate('/observations')
        setReset(true);
        setObservationSteps({
            total: 3,
            active: 1
        })
        setObservationImages([])
        setObservationData(null)
        console.clear();
    }

    const removeItem = (id) => {
        console.log(id);
        let newImage = [];
        observationData?.map_data?.filter(item => item.id !== id).map((item, index) => {
            return newImage.push(item);
        })
        setObservationSteps(prev => {
            return {
                ...prev,
                selected_image_id: newImage?.[0].id,
                selected_image_index: 0,
            }
        });

        setObservationImages(prev => {
            return {
                ...prev,
                selected_image_id: newImage?.[0].id,
                selected_image_index: 0,
                data: newImage
            }
        });

        setObservationData(prev => {
            return {
                ...prev,
                map_data: newImage
            }
        });
    }

    // const handleCameraUpdateUrl = () => {
    //     navigate(from, { replace: true });
    // }

    // Set Progress Bar
    useEffect(() => {
        function setActiveTabForProgressBar() {
            if (activeTab === Tabs.ObservationImages) {
                return 1;
            } else if (activeTab === Tabs.DateTimeLocation) {
                return 2;
            } else  {
                return 3;
            }
        }
        setObservationSteps(prev => {
            return {
                ...prev,
                active: setActiveTabForProgressBar(),
                selected_image_id: observationImages?.selected_image_id,
                selected_image_index:observationImages?.selected_image_index,
                is_draft: draft
            }
        });
    }, [activeTab, draft, observationImages, setObservationSteps]);


    return(
        <div className="position-relative">
            {isLoading &&
                <Loader fixContent={true} />
            }
            {success &&
                <UncontrolledAlert color="success" data-dismiss="alert" dismissible="true" className="text-center">
                    {success?.data?.success}
                </UncontrolledAlert>
            }
            <Form className="observation-form upload-observation-form-main" onSubmit={handleSubmit}>
                <div className="common-top-button-wrapper">
                    <Container>
                        <div className="common-top-button-wrapper-inner">
                            <Button className="gray-outline-btn" onClick={handleReset} disabled={!observationImages?.data}>Cancel</Button>
                            <div className="top-right-btn">
                                <Button className="gray-outline-btn me-2 me-sm-3" onClick={handlesetDraft} disabled={!next}>Save as draft</Button>
                                <Button type="submit" disabled={(!(cameraDetails?.camera_type && cameraDetails?.focal_length && cameraDetails?.aperture)) }>Submit</Button>
                            </div>
                        </div>
                    </Container>
                </div>
                <section className="upload-observation-form-inner">
                    <Container>
                        <Row>
                            <Col md={3}>

                                <ObservationProgress step={observationSteps}/>

                                <div className="observation-form-left-tab">
                                    <Nav tabs className="flex-column">
                                        <NavItem>
                                            <NavLink
                                                className={activeTab === Tabs.ObservationImages ? 'active' : ''}
                                                onClick={() => {
                                                    if (observationData?.map_data?.[0]?.category_map?.category && next) {
                                                        toggleTab(Tabs.ObservationImages);
                                                    }
                                                }}
                                            >
                                                Observation Images
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={`${activeTab === Tabs.DateTimeLocation ? 'active' : ''} ${disabledLocationTab ? '' : 'disabled'}`}
                                                onClick={() => {
                                                    if(disabledLocationTab){
                                                        toggleTab(Tabs.DateTimeLocation);
                                                    }
                                                }}
                                            >
                                                Date, Time & Location
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={`${activeTab === Tabs.EquipmentDetails ? 'active' : ''} ${disabledEquipmentTab ? '' : 'disabled'}`}
                                                onClick={() => {
                                                    if(disabledEquipmentTab){
                                                        toggleTab(Tabs.EquipmentDetails);
                                                    }
                                                }}
                                            >
                                                Equipment Details
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>
                            </Col>
                            <Col md={observationImages?.data?.length > 0 && next && !(activeTab === Tabs.EquipmentDetails) ? 7 : 9}>
                                <div className="observation-form-right-tab">
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId={Tabs.ObservationImages}>
                                            {next ?
                                                <ObservationAfterImageUpload remove={removeItem} obvType={observationType} error={error} toggleTab={toggleTab} disableNext={disabledLocationTab} handleImageInput = {handleImageInput} />
                                                :
                                                <ObservationImages proceedNext={()=> handleContinue()}/>
                                            }
                                        </TabPane>
                                        <TabPane tabId={Tabs.DateTimeLocation} className="observation_location">
                                            <ObservationLocation obvType={observationType} step={observationSteps} error={error}  toggleTab={toggleTab} handleImageInput={handleImageInput} disableNext={disabledEquipmentTab}/>
                                        </TabPane>
                                        <TabPane tabId={Tabs.EquipmentDetails} className="observation_equipment">
                                            <FormGroup className="d-flex align-items-center position-relative">
                                                <div className="custom-switch">
                                                    <input
                                                        id="checkbox0"
                                                        type="checkbox"
                                                        className="hidden"
                                                        disabled={!auth?.camera}
                                                        onChange = {(e)=> {setSwitchOn(!isSwitchOn);getCameraDetail(e).then(r => r);}}
                                                    />
                                                    <label
                                                        className="switchbox"
                                                        htmlFor="checkbox0"
                                                    />
                                                    <span>
                                                    I used the same camera, camera settings, and lens listed in my profile
                                                </span>
                                                </div>
                                            </FormGroup>
                                            {!auth?.camera &&
                                                <span className="block text-danger small">
                                                    You don't have <b>camera setting</b> saved in your profile.
                                                    To enable this feature, you need to update it in your profile setting.
                                                </span>
                                            }
                                            {isSwitchOn ?
                                                <EquipmentDetails step={observationSteps} error={error} handleInput={handleInput} toggleTab={toggleTab} cameraDetails={auth?.camera}/>
                                                :
                                                <EquipmentDetailsForm step={observationSteps} error={error} handleInput={handleInput} toggleTab={toggleTab} cameraDetails={cameraDetails}  handleOtherCamera={handleOtherCamera} getCameraDetail={getCameraDetail}/>
                                            }
                                        </TabPane>
                                    </TabContent>
                                </div>
                            </Col>
                            {(observationImages?.data && next && ((!(activeTab === Tabs.EquipmentDetails) && !(activeTab === Tabs.DateTimeLocation)) || (!(activeTab === Tabs.DateTimeLocation)) && observationData?.image_type !== 3)) &&
                                <Col md={2}>
                                    <ObservationUploadedImg obvType={observationType} step={observationSteps} error={error} />
                                </Col>
                            }
                        </Row>
                    </Container>
                </section>
            </Form>
        </div>
    )
}
export default AddObservation;