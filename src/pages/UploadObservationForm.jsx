import {
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import classnames from "classnames";
import { useState } from "react";
import "../assets/scss/component/uploadobservationform.scss";
import Images from "../static/images";
import { Icon } from "@iconify/react";
import EquipmentForm from "../components/Observation/EquipmentForm";
import ObservationLocation from "../components/Observation/ObservationLocation";
import ObservationImages from "../components/Observation/ObservationImages";
import ObservationStepImageUpload from "../components/Observation/ObservationStepImageUpload";


const UploadObservationsForm = () => {
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <>
      <section className="upload-observation-form-main">
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
        <div className="upload-observation-form-inner">
          <Container>
            <Row>
              <Col md={3}>
                <div className="observation-form-left-tab">
                  <Nav tabs className="flex-column">
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          toggleTab("1");
                        }}
                      >
                        Observation Images
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          toggleTab("2");
                        }}
                      >
                        Date, Time & Location
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "3" })}
                        onClick={() => {
                          toggleTab("3");
                        }}
                      >
                        Equipment Details
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Col>
              {/* <Col md={9}>
                <UploadObservationsForm />
              </Col> */}
              <Col md={7}>
                <div className="observation-form-right-tab">
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <ObservationStepImageUpload />
                    </TabPane>
                    <TabPane tabId="2">
                      <ObservationLocation />
                    </TabPane>
                    <TabPane tabId="3">
                      <EquipmentForm />
                    </TabPane>
                  </TabContent>
                </div>
              </Col>
              <Col md={2}>
                <img
                  src={Images.ObservationImageOne}
                  alt="Bluejet"
                />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
};

export default UploadObservationsForm;
