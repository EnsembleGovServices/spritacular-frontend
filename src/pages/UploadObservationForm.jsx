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
  Alert,
  Label,
  Input,
} from "reactstrap";
import classnames from "classnames";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import "../assets/scss/component/uploadobservationform.scss";
import { Icon } from "@iconify/react";
import Images from "../static/images";
const UploadObservationsForm = () => {
  const { auth } = useAuth();
  const [updateUser, setUpdatedUser] = useState();
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = (tab) => {
    // console.log("tab", tab);
    if (activeTab !== tab) {
      // console.log("tab activeTab", tab, activeTab);
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
              <Col md={4}>
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
              <Col md={8}>
                <div className="observation-form-right-tab">
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <div className="upload-observation-main">
                            <div className="upload-ob-inner">
                              <Form>
                                <FormGroup>
                                  <Label for="UploadFile">
                                    <div className="upload-info">
                                      <img
                                        src={Images.UploadPlaceholder}
                                        alt="UploadPlaceholder"
                                      />
                                      <p>
                                        Drag and drop images or click to upload
                                      </p>
                                      <span>Max. Image Size: 5MB</span>
                                      <ul>
                                        <li>
                                          Common Image File Formats (JPEG or
                                          JPG, PNG, TIFF)
                                        </li>
                                      </ul>
                                    </div>
                                  </Label>
                                  <Input
                                    type="file"
                                    name="file"
                                    id="UploadFile"
                                  />
                                </FormGroup>
                              </Form>
                            </div>
                          </div>
                          {/*<Button disabled className="cnt-btn">Continue</Button>*/}
                          <div className="upload-multiple-observation">
                            <Form>
                              <Row>
                                <Col sm="12">
                                  <FormGroup className="d-flex align-items-center">
                                    <input
                                      id="checkbox"
                                      type="checkbox"
                                      class="checkbox hidden"
                                    />
                                    <label
                                      class="switchbox"
                                      for="checkbox"
                                    ></label>
                                    <span>
                                      Multiple Observations (limit to 3)
                                    </span>
                                  </FormGroup>
                                </Col>
                                <Col sm="12">
                                  <FormGroup className="mb-1">
                                    <p className="fw-bold">
                                      Please choose the appropriate category
                                    </p>
                                  </FormGroup>
                                </Col>
                                <Col sm="6">
                                  <FormGroup>
                                    <div className="checkbox-wrapper">
                                      <div class="inputGroup">
                                        <input
                                          id="option1"
                                          name="option1"
                                          type="checkbox"
                                        />
                                        <label for="option1">
                                            Option One</label>
                                      </div>
                                    </div>
                                  </FormGroup>
                                </Col>
                                <Col sm="6">
                                  <FormGroup>
                                    <div className="checkbox-wrapper">
                                      <div class="inputGroup">
                                        <input
                                          id="option1"
                                          name="option1"
                                          type="checkbox"
                                        />
                                        <label for="option1">
                                            Option One</label>
                                      </div>
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <h4>Camera Settings</h4>
                        </Col>
                      </Row>
                      <Form>
                        <Row>
                          <Col md="12">Camera Seeting</Col>
                        </Row>

                        <FormGroup className="profile-bottom-btn ">
                          <Button className="discard-btn">Discard</Button>
                          <Button className="save-btn">Save Changes</Button>
                        </FormGroup>
                      </Form>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Col sm="12">
                          <h4>Change Password</h4>
                        </Col>
                        <Col md="12">Change Password</Col>
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

export default UploadObservationsForm;
