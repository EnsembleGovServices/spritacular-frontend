import {Button, Col, Container, Form, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import "../../assets/scss/component/uploadobservationform.scss";
import {useEffect, useState} from "react";
import {Tabs} from "../../helpers/observation";
import ObservationUploadImg from "../../components/Observation/ObservationUploadImg";
import ObservationLocation from "../../components/Observation/ObservationLocation";
import EquipmentDetails from "../../components/Observation/EquipmentDetails";
import ObservationUploadedImg from "../../components/Observation/ObservationUploadedImg";
import ObservationImages from "../../components/Observation/ObservationImages";
import ObservationProgress from "../../components/Observation/ObservationProgress";

const AddObservation = () => {
    const [activeTab, setActiveTab] = useState("ObservationImages");
    const [step, setStep] = useState({
        total: 3,
        active: 1
    });


    // Toggle Tabs
    const toggleTab = (tab) => {
        console.log(activeTab);
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

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
        setStep(prev => {
            return {
                ...prev,
                active: setActiveTabForProgressBar()
            }
        });

    }, [activeTab]);


    return(
        <>
          <Form className="observation-form upload-observation-form-main">
              <div className="common-top-button-wrapper">
                  <Container>
                      <div className="common-top-button-wrapper-inner">
                          <Button>Cancel</Button>
                          <div className="top-right-btn">
                              <Button>Save as draft</Button>
                              <Button type="submit" >Submit</Button>
                          </div>
                      </div>
                  </Container>
              </div>

              <section className="upload-observation-form-inner">
                  <Container>
                      <Row>
                          <Col md={3}>
                              <ObservationProgress step={step}/>
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
                          <Col md={7}>
                              <div className="observation-form-right-tab">
                                  <TabContent activeTab={activeTab}>
                                      <TabPane tabId={Tabs.ObservationImages}>
                                          <ObservationUploadImg />

                                          <div className="upload-multiple-observation">
                                              <ObservationImages toggleTab = {toggleTab}/>
                                          </div>
                                      </TabPane>
                                      <TabPane tabId={Tabs.DateTimeLocation}>
                                          <ObservationLocation  toggleTab = {toggleTab}/>
                                      </TabPane>
                                      <TabPane tabId={Tabs.EquipmentDetails}>
                                          <EquipmentDetails toggleTab = {toggleTab}/>
                                      </TabPane>
                                  </TabContent>
                              </div>
                          </Col>
                          <Col md={2}>
                            <ObservationUploadedImg />
                          </Col>
                      </Row>
                  </Container>
              </section>
          </Form>
      </>
  )
}
export default AddObservation;