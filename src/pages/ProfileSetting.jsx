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
  Input, Alert, FormFeedback,
} from "reactstrap";
import classnames from "classnames";
import "../assets/scss/component/camerasettings.scss";
import {useEffect, useState} from "react";
import Images from "../static/images";
import useAuth from "../hooks/useAuth";
import {baseURL} from "../Layouts/Master";
import axios from "../api/axios";
import {toast} from "react-hot-toast";


const ProfileSetting = () => {
  const { auth } = useAuth();
  const [updateUser, setUpdatedUser] = useState()
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [errorPassword, setErrorPassword] = useState();

  const [password, setPassword] = useState(null);

  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => {
    // console.log("tab", tab);
    if (activeTab !== tab) {
      // console.log("tab activeTab", tab, activeTab);
      setActiveTab(tab);
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    let name = e.target.name,
        value = e.target.value;
    setUpdatedUser({
      ...updateUser,
      [name]:value
    })
  }

  useEffect(()=> {
    setUpdatedUser(auth?.user)
  }, [auth?.user])


  function toastConfig(toastPosition, time) {
    return {
      position: toastPosition ?? 'top-right',
      duration: time ?? 4000,
    }
  }


  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    await axios.patch(baseURL.api+'/users/user_profile/'+auth?.user?.id+'/', {
      first_name: updateUser?.first_name,
      last_name: updateUser?.last_name,
      email: updateUser?.email,
      location: updateUser?.location
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token?.access}`
      },
      withCredentials: true,
    }).then((success) => {
      console.log(success);
      setSuccess(success)
    }).catch((error) => {
      console.log(error.response);
      setError(error.response)
    })
  }



  const CHANGE_PASSWORD_URL = process.env.REACT_APP_API_URL;


  const passwordMatchCheck = () => {
    if (password) {
      return password.confirm_password !== password.new_password
    }
    return true;
  }

  const handleChangePassword = async (e) => {
    setErrorPassword('')
    e.preventDefault();
    await axios.put(CHANGE_PASSWORD_URL+'/users/change-password/'+auth?.user?.id+'/', password, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token?.access}`
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      setErrorPassword('');
      toast.success(res?.data.message, toastConfig());
    }).catch((err) => {
      console.error(err.response);
      toast.error(err?.response?.statusText, toastConfig());
      setErrorPassword(err?.response);
    })
  }

  const handlePasswordInput = (e) => {
    e.preventDefault();
    let name = e.target.name,
        value = e.target.value;
    setPassword({
      ...password,
      [name]:value,
    })
  }


  return (
    <>
      <section className="comman-banner">
        <Container>
          <div className="banner-inner" />
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
                      <img className="img-fluid" src={baseURL.base+auth?.user?.profile_image} alt={auth?.user?.first_name} />
                    </div>
                    <div className="profile-data text-center">
                      <h5>{auth?.user?.first_name} {auth?.user?.last_name}</h5>
                      <p>{auth?.user?.email}</p>
                      <div className="d-flex align-items-center justify-content-center">
                        <img src={Images.UsaFlag} alt="" />
                        <span>{auth?.user?.location}</span>
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

                        {success && success?.status === 200 &&
                            <Col sm="12">
                              <Alert variant="success">
                                Profile updated successfully
                              </Alert>
                            </Col>
                        }

                        <Col md="12">
                          <Form onSubmit={handleProfileUpdate}>
                            <FormGroup>
                              <Label for="first_name">First Name</Label>
                              <Input
                                type="text"
                                name="first_name"
                                value={updateUser?.first_name ?? ""}
                                onChange={(e)=>handleInput(e)}
                                invalid={!!error?.data?.first_name}
                                placeholder="First Name"
                              />
                              <FormFeedback>{error?.data?.first_name}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <Label for="last_name">Last Name</Label>
                              <Input
                                  type="text"
                                  name="last_name"
                                  placeholder="Last Name"
                                  value={updateUser?.last_name ?? ""}
                                  invalid={!!error?.data?.last_name}
                                  onChange={(e)=>handleInput(e)}
                              />
                              <FormFeedback>{error?.data?.last_name}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <Label for="email">Email</Label>
                              <Input
                                type="email"
                                name="email"
                                placeholder="Enter Your Email"
                                value={updateUser?.email ?? ""}
                                invalid={!!error?.data?.email}
                                onChange={(e)=>handleInput(e)}
                              />
                              <FormFeedback>{error?.data?.email}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                              <Label for="location">Location</Label>
                              <Input type="select" name="location" onChange={(e)=>handleInput(e)}>
                                <option disabled defaultValue>
                                  Please Select Your Country
                                </option>
                                <option value="Australia">Australia</option>
                                <option value="Bahrain">Bahrain</option>
                                <option value="Canada">Canada</option>
                                <option value="Denmark">Denmark</option>
                              </Input>
                            </FormGroup>
                            <FormGroup className="profile-bottom-btn ">
                              <Button type="submit" className="save-btn">Save Changes</Button>
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
                      <Form>
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <h6>Camera Type</h6>
                              <Input type="select" name="select">
                                <option disabled defaultValue>
                                  Please Select Your Camera Type
                                </option>
                                <option>Canon</option>
                                <option>Nikon</option>
                                <option>Sony</option>
                                <option>Panasonic</option>
                              </Input>
                            </FormGroup>
                            <div className="border-line"/>
                          </Col>
                          <Col md="12">
                            <FormGroup>
                              <h6>Lens Information</h6>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Focal Length</label>
                              <Input
                                type="text"
                                name="name"
                                placeholder="35 mm"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Aperture</label>
                              <Input
                                type="text"
                                name="name"
                                placeholder="35 mm"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <div className="border-line"/>
                            <FormGroup>
                              <h6>Camera Settings</h6>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>ISO</label>
                              <Input
                                type="text"
                                name="name"
                                placeholder="100"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Shutter Speed (exposure time)</label>
                              <Input
                                type="text"
                                name="name"
                                placeholder="1/15"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label>Frame Rate (frames per second)</label>
                              <Input type="text" name="name" placeholder="24" />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <div className="border-line"></div>
                            <FormGroup>
                              <h6>How do you generally keep track of time?</h6>
                              <Input
                                type="text"
                                name="name"
                                placeholder="Camera Time"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="12">
                            <div className="border-line"></div>
                            <FormGroup>
                              <h6>
                                Do you use any special equipment attached to
                                your camera (such as a filter)?
                              </h6>
                              <Input
                                type="text"
                                name="name"
                                placeholder="Polarizing Filter"
                              />
                            </FormGroup>
                          </Col>
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
                        <Col md="12">
                          <Form onSubmit={handleChangePassword}>
                            <FormGroup>
                              <Label for="password">Old Password</Label>
                              <Input
                                type="password"
                                name="old_password"
                                placeholder="Enter Your Old Password"
                                onChange={(e)=>handlePasswordInput(e)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="mew_password">New Password</Label>
                              <Input
                                type="password"
                                name="new_password"
                                placeholder="Enter Your New Password"
                                onChange={(e)=>handlePasswordInput(e)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="confirm_password">
                                Confirm New Password
                              </Label>
                              <Input
                                type="password"
                                name="confirm_password"
                                placeholder="Enter Your Confirm New Password"
                                onChange={(e)=>handlePasswordInput(e)}
                              />
                            </FormGroup>
                            {errorPassword?.data?.details.map((item, index) => {
                              return(
                                  <div key={index}>
                                    <span className="text-danger small">{item}</span> <br/>
                                  </div>
                              )
                            })
                            }
                            <FormGroup className="profile-bottom-btn ">
                              <Button type="submit" className="save-btn" disabled={passwordMatchCheck()}>Save Changes</Button>
                            </FormGroup>
                          </Form>
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
export default ProfileSetting;
