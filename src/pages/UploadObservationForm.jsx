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
                                      className="checkbox hidden"
                                    />
                                    <label
                                      className="switchbox"
                                      for="checkbox"
                                    />
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
                                <Col sm="12">
                                  <div className="observation-image">
                                    <img
                                      src={Images.ObservationImageOne}
                                      alt="Bluejet"
                                    />
                                  </div>
                                </Col>
                                <Col sm="6">
                                  <FormGroup>
                                    <div className="checkbox-wrapper">
                                      <div className="inputGroup">
                                        <input
                                          id="sprite"
                                          name="option1"
                                          type="checkbox"
                                        />
                                        <label for="sprite">
                                          <img
                                            src={Images.SpriteOb}
                                            alt="Sprite"
                                          />
                                          Sprite
                                        </label>
                                      </div>
                                    </div>
                                  </FormGroup>
                                </Col>
                                <Col sm="6">
                                  <FormGroup>
                                    <div className="checkbox-wrapper">
                                      <div className="inputGroup">
                                        <input
                                          id="blue-jet"
                                          name="BlueJet"
                                          type="checkbox"
                                        />
                                        <label for="blue-jet">
                                          <img
                                            src={Images.Bluejet}
                                            alt="Bluejet"
                                          />
                                          Blue Jet
                                        </label>
                                      </div>
                                    </div>
                                  </FormGroup>
                                </Col>
                                <Col sm="6">
                                  <FormGroup>
                                    <div className="checkbox-wrapper">
                                      <div className="inputGroup">
                                        <input
                                          id="elve"
                                          name="Elve"
                                          type="checkbox"
                                        />
                                        <label for="elve">
                                          <img src={Images.Elev} alt="Elve" />
                                          Elve
                                        </label>
                                      </div>
                                    </div>
                                  </FormGroup>
                                </Col>
                                <Col sm="6">
                                  <FormGroup>
                                    <div className="checkbox-wrapper">
                                      <div className="inputGroup">
                                        <input
                                          id="halo"
                                          name="Halo"
                                          type="checkbox"
                                        />
                                        <label for="halo">
                                          <img src={Images.Halo} alt=" Halo" />
                                          Halo
                                        </label>
                                      </div>
                                    </div>
                                  </FormGroup>
                                </Col>
                                <Col sm="6">
                                  <FormGroup>
                                    <div className="checkbox-wrapper">
                                      <div className="inputGroup">
                                        <input
                                          id="gigantic-jet"
                                          name="Gigantic Jet"
                                          type="checkbox"
                                        />
                                        <label for="gigantic-jet">
                                          <img
                                            src={Images.GiganticJet}
                                            alt="Sprite"
                                          />
                                          Gigantic Jet
                                        </label>
                                      </div>
                                    </div>
                                  </FormGroup>
                                </Col>
                                <Col sm="6">
                                  <FormGroup>
                                    <div className="checkbox-wrapper">
                                      <div className="inputGroup">
                                        <input
                                          id="secondary-jet"
                                          name="Secondary Jet"
                                          type="checkbox"
                                        />
                                        <label for="secondary-jet">
                                          <img
                                            src={Images.SecondaryJet}
                                            alt="Secondary Jet"
                                          />
                                          Secondary Jet
                                        </label>
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
