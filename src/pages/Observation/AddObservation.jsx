import {Button, Col, Container, Form, Nav, NavItem, NavLink, Row, TabContent, TabPane, FormGroup} from "reactstrap";
import "../../assets/scss/component/uploadObservationImage.scss";
import {useEffect, useState} from "react";
import {Tabs} from "../../helpers/observation";
import useObservations from "../../hooks/useObservations";
import {baseURL, cameraSettingFields} from "../../helpers/url";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

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

const AddObservation = () => {
    const { auth } = useAuth();

    const {observationSteps, setObservationSteps, observationImages ,setObservationImages,observationData, setObservationData,observationCategory} = useObservations();
    const [activeTab, setActiveTab] = useState(Tabs.ObservationImages);
    const [next, setNext] = useState(false);
    const [isSwitchOn, setSwitchOn] = useState(false);
    const [cameraDetails, setCameraDetails] = useState(cameraSettingFields);
    const [draft, setDraft] = useState(true);

    // Toggle Tabs
    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    const handleInput = (e) => {
        let name = e.target.name,
            value = e.target.value;
            setCameraDetails({
            ...cameraDetails,
            [name]:value,
        })
    }
    const handleImageInput = (e) => {

        let name = e.target.name,
            value = e.target.value;
            console.log(value,name);
            let observationArray = {...observationImages};
            
            if(name == 'is_other'){
                observationArray.data[observationImages?.selected_image_index].category_map[name] = (value === 'on') ? true : value;
                console.log(observationArray.data[observationImages?.selected_image_index].category_map[name]);
            }else{
                observationArray.data[observationImages?.selected_image_index][name] = (value === 'on') ? true : value;
            }
            setObservationImages(observationArray);
        
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        let map_data = {...observationImages?.data};
        let ObservationData = {...observationData};
        ObservationData.map_data = map_data;
        ObservationData.camera = cameraDetails;
        ObservationData.isDraft = 0;
        ObservationData.map_data[observationImages?.selected_image_index].category_map.category = observationCategory?.category;

        setObservationData(ObservationData);
        // console.log(observationImages);
    }
    
    console.log(observationData);

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
        <>
          <Form className="observation-form upload-observation-form-main" onSubmit={handleSubmit}>
              <div className="common-top-button-wrapper">
                  <Container>
                      <div className="common-top-button-wrapper-inner">
                          <Button className="gray-outline-btn">Cancel</Button>
                          <div className="top-right-btn">
                              <Button className="gray-outline-btn" onClick={ ()=> setDraft(!draft)}>Save as draft</Button>
                              <Button type="submit" >Submit</Button>
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
                                                  toggleTab(Tabs.ObservationImages);
                                              }}
                                          >
                                              Observation Images
                                          </NavLink>
                                      </NavItem>
                                      <NavItem>
                                          <NavLink
                                              className={activeTab === Tabs.DateTimeLocation ? 'active' : ''}
                                              onClick={() => {
                                                  toggleTab(Tabs.DateTimeLocation);
                                              }}
                                          >
                                              Date, Time & Location
                                          </NavLink>
                                      </NavItem>
                                      <NavItem>
                                          <NavLink
                                              className={activeTab === Tabs.EquipmentDetails ? 'active' : ''}
                                              onClick={() => {
                                                  toggleTab(Tabs.EquipmentDetails);
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
                                            // <Suspense fallback={''} >
                                                <ObservationAfterImageUpload toggleTab={toggleTab} handleImageInput = {handleImageInput} />
                                            // </Suspense>
                                        : 
                                            // <Suspense fallback={''} >
                                                <ObservationImages proceedNext={()=> handleContinue()}/>
                                            // </Suspense>
                                        }
                                      </TabPane>
                                      <TabPane tabId={Tabs.DateTimeLocation} className="observation_location">
                                        {/* <Suspense fallback={''} > */}
                                            <ObservationLocation  toggleTab={toggleTab} handleImageInput={handleImageInput}/>
                                        {/* </Suspense> */}
                                      </TabPane>
                                      <TabPane tabId={Tabs.EquipmentDetails} className="observation_equipment">
                                        <FormGroup className="d-flex align-items-center position-relative">
                                            <div className="custom-switch mb-5">
                                                <input
                                                    id="checkbox0"
                                                    type="checkbox"
                                                    className="hidden"
                                                    onChange = {(e)=> {setSwitchOn(!isSwitchOn);getCameraDetail(e);}}
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
                                        {isSwitchOn ? 
                                        // <Suspense fallback={''} >
                                            <EquipmentDetails handleInput={handleInput} toggleTab={toggleTab} cameraDetails={cameraDetails}/>
                                        // </Suspense>
                                        : 
                                        // <Suspense fallback={''} >
                                            <EquipmentDetailsForm handleInput={handleInput} toggleTab={toggleTab} cameraDetails={cameraDetails} getCameraDetail={getCameraDetail}/>
                                        // </Suspense>
                                        }
                                      </TabPane>
                                  </TabContent>
                              </div>
                          </Col>
                          {observationImages?.data && next && !(activeTab === Tabs.EquipmentDetails) &&
                              <Col md={2}>
                                    {/* <Suspense fallback={''} > */}
                                      <ObservationUploadedImg />
                                    {/* </Suspense> */}
                              </Col>
                          }
                      </Row>
                  </Container>
              </section>
          </Form>
          </>
  )
}
export default AddObservation;