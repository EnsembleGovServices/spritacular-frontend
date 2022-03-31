import {
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import {Suspense, lazy, useEffect} from 'react';
import classnames from "classnames";
import {useState} from "react";
import useAuth from "../hooks/useAuth";
import "../assets/scss/component/camerasettings.scss";
import ImageUpload from "../components/Upload/ImageUpload";
import axios from "../api/axios";
import {baseURL, cameraSettingFields} from "../helpers/url";
import ReactCountryFlags from "../components/ReactCountryFlag";

const UpdateProfile = lazy(()=> import('../components/Account/UpdateProfile'))
const CameraSetting = lazy(()=> import('../components/Account/CameraSetting'))
const ChangePassword = lazy(()=> import('../components/Account/ChangePassword'))


const Profile = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState(auth?.user);
  const [activeTab, setActiveTab] = useState("1");
  const [cameraDetails, setCameraDetails] = useState(cameraSettingFields);
  const [isDetailExist, setIsDetailExist] = useState(false);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      if(tab === '2'){
        fetchCameraDetails().then(r => r);
      }
      setActiveTab(tab);
    }
  };
  const fetchCameraDetails = async () => {
    await axios.get(baseURL.api+'/users/camera_setting/', {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.token?.access}`
      }
      }).then((success) => {
              setIsDetailExist(true);
          setCameraDetails(success.data);
      }).catch((error) => {
          console.log(error.response);
      })
  }

  useEffect(()=> {
    setUser(auth?.user);
  }, [auth])

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
                      <ImageUpload user={user} token={auth?.token?.access}/>
                    </div>
                    <div className="profile-data text-center">
                      <h5>{user.first_name} {user?.last_name}</h5>
                      <p>{user?.email}</p>
                      <div className="d-flex align-items-center justify-content-center">
                        <ReactCountryFlags country={user?.country_code} />
                        <span>{user?.location}</span>
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
                          <Suspense fallback={<div>Loading...</div>}>
                            <UpdateProfile user={auth} />
                          </Suspense>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <h4>Camera Settings</h4>
                        </Col>
                        <Col md="12">
                          <Suspense fallback={<div>Loading...</div>}>
                            <CameraSetting cameraDetails={cameraDetails} user={auth} isDetailExist={isDetailExist}/>
                          </Suspense>
                        </Col>
                      </Row>
                     
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Col sm="12">
                          <h4>Change Password</h4>
                        </Col>
                        <Col md="12">
                          <Suspense fallback={<div>Loading...</div>}>
                            <ChangePassword user={auth} />
                          </Suspense>
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
export default Profile;
