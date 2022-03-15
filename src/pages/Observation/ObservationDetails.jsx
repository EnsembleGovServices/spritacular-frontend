import { useState } from "react";
import { Badge, Button, Col, Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import Images from './../../static/images';
import { imageDetails } from "../../helpers/observation";
import LazyLoad from "../../components/Upload/LazyLoad";
import "../../assets/scss/component/observationDetails.scss";
import ObservationMoreDetails from "../../components/Observation/ObservationDetails/ObservationMoreDetails";
import ObservationMoreEquipementDetails from "../../components/Observation/ObservationDetails/ObservationMoreEquipementDetails";

const ObservationDetails = (props) =>{
    const {modalClass, open, handleClose} = props;
    const [activeTab, setActiveImageTab] = useState(imageDetails.Details);
    // Toggle Tabs
    const toggleImageDetailsTab = (tab) => {
        if (activeTab !== tab) {
            setActiveImageTab(tab);
        }
    };
    return (
        <>
            <Modal 
                className={modalClass ? modalClass : ''}
                isOpen={open}
                backdrop={true}
                keyboard={false}
                scrollable
                size="xl"
                toggle={handleClose}
            >
                <ModalHeader>
                    <Button className="close-icon bg-transparent rounded-0 border-0 shadow-none" onClick={() => handleClose()}>
                        <img src={Images.Modalcloseicon} alt="close-icon" />
                    </Button>
                    Gigantic Jet <Badge className="text-uppercase">Unverified</Badge>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={6}>
                            <LazyLoad src={Images.card4} alt="card details" imageClass="mb-2" ></LazyLoad>
                            <Row>
                                <Col xs={6} className="justify-content-start d-flex align-items-center">
                                    <div className="d-flex card-user_details align-items-center overflow-hidden">
                                        <i className="profile-icon rounded-circle"><img src={Images.Profile} alt="Profile" className="rounded-circle" /></i>
                                        {/* User sort name  */}
                                        {/* <i className="profile-text rounded-circle bg-black text-white">JD</i> */}
                                        <h6 className="pe-2 mb-0 text-truncate">John Due</h6>
                                    </div>
                                </Col>
                                <Col xs={6} className="justify-content-end d-flex align-items-center">
                                    <i className="observation_type rounded-circle bg-white"><img src={Images.GiganticJet} alt="Sprite" className="rounded-circle" /></i>
                                    <h6 className="pe-2 mb-0 text-truncate">Gigantic Jet</h6>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6}>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={activeTab === imageDetails.Details ? 'active' : ''}
                                        onClick={() => {
                                            toggleImageDetailsTab(imageDetails.Details);
                                        }}
                                    >
                                        Details
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={activeTab === imageDetails.Equipment ? 'active' : ''}
                                        onClick={() => {
                                            toggleImageDetailsTab(imageDetails.Equipment);
                                        }}
                                    >
                                        Equipment
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={activeTab === imageDetails.Comments ? 'active' : ''}
                                        onClick={() => {
                                            toggleImageDetailsTab(imageDetails.Comments);
                                        }}
                                    >
                                        Comments
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId={imageDetails.Details}>
                                    <ObservationMoreDetails />
                                </TabPane>
                                <TabPane tabId={imageDetails.Equipment}>
                                    <ObservationMoreEquipementDetails />
                                </TabPane>
                                <TabPane tabId={imageDetails.Comments}>
                                    imageComments.Comments
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </>
    )
}
export default ObservationDetails;