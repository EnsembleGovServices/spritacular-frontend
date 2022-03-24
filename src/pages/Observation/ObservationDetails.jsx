import { useState } from "react";
import { Badge, Button, Col, Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import Images from './../../static/images';
import { imageDetails } from "../../helpers/observation";
import LazyLoad from "../../components/Upload/LazyLoad";
import "../../assets/scss/component/observationDetails.scss";
import ObservationMoreDetails from "../../components/Observation/ObservationDetails/ObservationMoreDetails";
import ObservationMoreEquipementDetails from "../../components/Observation/ObservationDetails/ObservationMoreEquipementDetails";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getCategoryImage } from "../../helpers";

const ObservationDetails = (props) =>{
    const {modalClass, open, handleClose,data,activeType, handleContinueEdit} = props;
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
                <ModalHeader className="d-flex justify-content-between align-items-center w-100">
                    <div>
                        <Button className="close-icon bg-transparent rounded-0 border-0 shadow-none p-0 me-3" onClick={() => handleClose()}>
                            <img src={Images.Modalcloseicon} alt="close-icon" />
                        </Button>
                        {(data?.category_data[0]) ? data?.category_data[0] : null} <Badge className="text-uppercase">{activeType}</Badge>
                    </div>
                    {activeType === "draft" &&
                        <div>
                            <Button variant="primary" onClick={() => handleContinueEdit({id: data?.id, type: activeType})}>
                                Continue Editing
                            </Button>
                        </div>
                    }
                </ModalHeader>
                <ModalBody>
                    <Row className="h-100">
                        <Col md={6}>
                            <div className="preview-detail mb-2">
                                {/* <LazyLoad src={data?.images[0].image} alt="card details" ></LazyLoad> */}
                                <LazyLoadImage effect="blur" src={data?.images[0].image} alt="card details" className="test" />
                            </div>
                            <Row>
                                <Col xs={6} className="justify-content-start d-flex align-items-center">
                                    <div className="d-flex card-user_details align-items-center overflow-hidden">
                                        <i className="profile-icon rounded-circle"><LazyLoadImage effect="blur" width="100%" height="100%" src={data?.user_data?.profile_image} alt="Profile" className="rounded-circle" /></i>
                                        {/* User sort name  */}
                                        {/* <i className="profile-text rounded-circle bg-black text-white">JD</i> */}
                                        <h6 className="pe-2 mb-0 text-truncate">{data?.user_data?.first_name + ' ' + data?.user_data?.last_name}</h6>
                                    </div>
                                </Col>
                                <Col xs={6} className="justify-content-end d-flex align-items-center">
                                    {/*<i className="observation_type rounded-circle bg-white">*/}
                                    {/*    <LazyLoadImage effect="blur" src={(data?.category_data[0]) ? getCategoryImage(data?.category_data[0]): ''} className="rounded-circle" />*/}
                                    {/*</i>*/}
                                    <h6 className="ps-2 mb-0 text-truncate">{(data?.category_data[0]) ? data?.category_data[0] : null}</h6>
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
                                    <ObservationMoreDetails data={data}/>
                                </TabPane>
                                <TabPane tabId={imageDetails.Equipment}>
                                    <ObservationMoreEquipementDetails data={data?.camera_data} />
                                </TabPane>
                                <TabPane tabId={imageDetails.Comments}>
                                    <p className="text-center">No comment found</p>
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