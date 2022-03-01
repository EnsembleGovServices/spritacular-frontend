import {Button, Col, Container, Form, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import "../../assets/scss/component/uploadobservationform.scss";
import {useState} from "react";
import ObservationStepImageUpload from "../../components/Observation/ObservationStepImageUpload";
import ObservationLocation from "../../components/Observation/ObservationLocation";
import EquipmentDetails from "../../components/Observation/EquipmentDetails";
import classnames from "classnames";
import ObservationUploadedImg from "../../components/Observation/ObservationUploadedImg";

const AddObservation = () => {
    const [activeTab, setActiveTab] = useState("ObservationImages");

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

  return(
      <>
          <Form className="observation-form upload-observation-form-main">
              <div className="common-top-button-wrapper">
                  <Container>
                      <div className="common-top-button-wrapper-inner">
                          <Button>Cancel</Button>
                          <div className="top-right-btn">
                              <Button>Save as draft</Button>
                              <Button disabled>Submit</Button>
                          </div>
                      </div>
                  </Container>
              </div>

              <section className="upload-observation-form-inner">
                  <Container>
                      <Row>
                          <Col md={3}>
                              <div className="observation-form-left-tab">
                                  <Nav tabs className="flex-column">
                                      <NavItem>
                                          <NavLink
                                              className={activeTab === "ObservationImages" ? 'active' : ''}
                                              onClick={() => {
                                                  toggleTab("ObservationImages");
                                              }}
                                          >
                                              Observation Images
                                          </NavLink>
                                      </NavItem>
                                      <NavItem>
                                          <NavLink
                                              className={classnames({ active: activeTab === "DateTimeLocation" })}
                                              onClick={() => {
                                                  toggleTab("DateTimeLocation");
                                              }}
                                          >
                                              Date, Time & Location
                                          </NavLink>
                                      </NavItem>
                                      <NavItem>
                                          <NavLink
                                              className={classnames({ active: activeTab === "EquipmentDetails" })}
                                              onClick={() => {
                                                  toggleTab("EquipmentDetails");
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
                                      <TabPane tabId="ObservationImages">
                                          <ObservationStepImageUpload />
                                      </TabPane>
                                      <TabPane tabId="DateTimeLocation">
                                          <ObservationLocation />
                                      </TabPane>
                                      <TabPane tabId="EquipmentDetails">
                                          <EquipmentDetails />
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