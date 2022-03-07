import {Button, Col, Container, Form, Nav, NavItem, NavLink, Row, TabContent, TabPane, FormGroup} from "reactstrap";
import "../../assets/scss/component/uploadObservationImage.scss";
import {useEffect, useState} from "react";
import {Tabs} from "../../helpers/observation";

import ObservationLocation from "../../components/Observation/ObservationLocation";
import EquipmentDetails from "../../components/Observation/EquipmentDetails";
import ObservationUploadedImg from "../../components/Observation/ObservationUploadedImg";
import ObservationImages from "../../components/Observation/ObservationImages";
import ObservationProgress from "../../components/Observation/ObservationProgress";
import useObservations from "../../hooks/useObservations";
import ObservationAfterImageUpload from "../../components/Observation/ObservationAfterImageUpload";
import EquipmentDetailsForm from "../../components/Observation/EquipmentDetailsForm";

const AddObservation = () => {
    const {observationSteps, setObservationSteps, observationImages} = useObservations();
    const [activeTab, setActiveTab] = useState(Tabs.ObservationImages);
    const [next, setNext] = useState(false);
    const [isSwitchOn, setSwitchOn] = useState(false);

    // Toggle Tabs
    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

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
                active: setActiveTabForProgressBar()
            }
        });
    }, [activeTab, observationImages, setObservationSteps]);

    return(
          <Form className="observation-form upload-observation-form-main">
              <div className="common-top-button-wrapper">
                  <Container>
                      <div className="common-top-button-wrapper-inner">
                          <Button className="gray-outline-btn">Cancel</Button>
                          <div className="top-right-btn">
                              <Button className="gray-outline-btn">Save as draft</Button>
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
                          <Col md={observationImages?.images?.length > 0 && next && !(activeTab === Tabs.EquipmentDetails) ? 7 : 9}>
                              <div className="observation-form-right-tab">
                                  <TabContent activeTab={activeTab}>
                                      <TabPane tabId={Tabs.ObservationImages}>
                                          {next ? <ObservationAfterImageUpload toggleTab={toggleTab} /> : <ObservationImages proceedNext={()=> handleContinue()}/>}
                                      </TabPane>
                                      <TabPane tabId={Tabs.DateTimeLocation} className="observation_location">
                                          <ObservationLocation  toggleTab={toggleTab}/>
                                      </TabPane>
                                      <TabPane tabId={Tabs.EquipmentDetails} className="observation_equipment">
                                        <FormGroup className="d-flex align-items-center position-relative">
                                            <div className="custom-switch mb-5">
                                                <input
                                                    id="checkbox0"
                                                    type="checkbox"
                                                    className="hidden"
                                                    onChange = {(e)=>setSwitchOn(!isSwitchOn)}
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
                                        {isSwitchOn ? <EquipmentDetails toggleTab={toggleTab}/> : <EquipmentDetailsForm toggleTab={toggleTab}/>}
                                      </TabPane>
                                  </TabContent>
                              </div>
                          </Col>
                          {observationImages?.images && next && !(activeTab === Tabs.EquipmentDetails) &&
                              <Col md={2}>
                                  <ObservationUploadedImg />
                              </Col>
                          }
                      </Row>
                  </Container>
              </section>
          </Form>
  )
}
export default AddObservation;