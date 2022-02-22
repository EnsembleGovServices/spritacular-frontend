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
import "../assets/scss/component/camerasettings.scss";
import { useState } from "react";
import Images from "../static/images";

const CameraSettings = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => {
    console.log("tab", tab);
    if (activeTab !== tab) {
      console.log("tab activeTab", tab, activeTab);
      setActiveTab(tab);
    }
  };
  return (
    <>
      <section className="comman-banner">
        <Container>
          <div className="banner-inner"/>
        </Container>
      </section>
      <section className="setting-main">
        <div className="setting-inner">
          <Container>
            <Row>
              <Col md={4}>
                <div className="profile-left-tab">
                  <div className="profile-info">
                    <div className="profile-img">
                      <img src={Images.UserProfile} alt="" />
                    </div>
                    <div className="profile-data text-center">
                      <h5>Carl Nielsen</h5>
                      <p>carlnielsen@email.com</p>
                      <div className="d-flex align-items-center justify-content-center">
                        <img src={Images.UsaFlag} alt="" />
                        <span>Edmon, OK, USA</span>
                      </div>
                    </div>
                  </div>
                  <Nav tabs className="flex-column">
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          toggleTab("1");
                        }}
                      >
                        Update Profile
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          toggleTab("2");
                        }}
                      >
                        Camera Settings
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "3" })}
                        onClick={() => {
                          toggleTab("3");
                        }}
                      >
                        Change Password
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Col>
              <Col md={8}>
                <div className="profile-right-tab">
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <h4>Update Profile</h4>
                        </Col>
                        <Col md="12">
                          <Form>
                            <FormGroup>
                              <Label for="exampleEmail">Name</Label>
                              <Input
                                type="text"
                                name="name"
                                placeholder="Enter Your Name"
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="exampleEmail">Email</Label>
                              <Input
                                type="email"
                                name="email"
                                placeholder="Enter Your Email"
                              />
                            </FormGroup>

                            <FormGroup>
                              <Label for="exampleSelect">Country</Label>
                              <Input type="select" name="select">
                                <option disabled defaultValue>
                                  Please Select Your Country
                                </option>
                                <option>Australia</option>
                                <option>Bahrain</option>
                                <option>Canada</option>
                                <option>Denmark</option>
                              </Input>
                            </FormGroup>
                            <FormGroup className="profile-bottom-btn ">
                              <Button className="save-btn">Save Changes</Button>
                            </FormGroup>
                          </Form>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <h4>Camera Settings</h4>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Col sm="12">
                          <h4>Change Password</h4>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
};
export default CameraSettings;
