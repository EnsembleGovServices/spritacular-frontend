import { useState } from "react";
import { Badge, Button, Col, Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink, Row, TabContent, TabPane, Tooltip } from "reactstrap";
import Images from './../../static/images';
import { imageDetails } from "../../helpers/observation";
import "../../assets/scss/component/observationDetails.scss";
import ObservationMoreDetails from "../../components/Observation/ObservationDetails/ObservationMoreDetails";
import ObservationMoreEquipementDetails from "../../components/Observation/ObservationDetails/ObservationMoreEquipementDetails";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Comments from "../../components/Observation/ObservationDetails/Comments";
import { Icon } from "@iconify/react";

const ObservationDetails = (props) =>{
    const {modalClass, open, handleClose, data, activeType, handleContinueEdit } = props;
    const [activeTab, setActiveImageTab] = useState(imageDetails.Details);
    const [tooltipOpen, setTooltipOpen] = useState([]);
    // Toggle Tabs
    const toggleImageDetailsTab = (tab) => {
        if (activeTab !== tab) {
            setActiveImageTab(tab);
        }
    };

    const handleToggleChange = (e) => {
        if (!tooltipOpen[e]) {
                    setTooltipOpen({
                    ...tooltipOpen,
                    [e]: {
                      isOpen: true
                    }
                  });
                } else {
                    setTooltipOpen([]);
                }
        
    } 
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
                        {(data?.category_data[0]) ? data?.category_data[0] : null} 
                        <Badge className={`text-uppercase ${activeType === 'verified' ? 'badge-success' : ''}`}>{activeType === 'verified' && <Icon icon="mdi:check-decagram" color="#27ae60" className="me-1" width="13" height="13" />}{activeType}</Badge>
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
                            <div className="mb-4 mb-md-0 h-100">
                                <div className="preview-detail mb-3 mb-md-2">
                                    <LazyLoadImage effect="blur" src={data?.images[0].image} alt="card details" className="test" />
                                </div>
                                <Row>
                                    <Col sm={6} className="justify-content-start d-flex align-items-center mb-2 mb-sm-0">
                                        <div className="d-flex card-user_details align-items-center overflow-hidden">
                                            <i className="profile-icon rounded-circle"><LazyLoadImage effect="blur" width="100%" height="100%" src={data?.user_data?.profile_image} alt="Profile" className="rounded-circle" /></i>
                                            {/* User sort name  */}
                                            {/* <i className="profile-text rounded-circle bg-black text-white">JD</i> */}
                                            <h5 className="pe-2 mb-0 text-truncate fw-normal text-black">{data?.user_data?.first_name + ' ' + data?.user_data?.last_name}</h5>
                                        </div>
                                    </Col>
                                    <Col sm={6} className="justify-content-end d-flex align-items-center">
                                        <div className="observation_type d-flex align-items-center">
                                            {data?.category_data.length > 0 && data?.category_data.map((item, index) => {
                                                return (<i id={item.toLowerCase().replaceAll(" ", "")} className="rounded-circle bg-white ms-2" key={index}>
                                                    {/* <img src={`/assets/images/category/${item.toLowerCase().replaceAll(" ", "")}.png`} alt={item} className="rounded-circle" /> */}
                                                    <LazyLoadImage effect="blur" src={`/assets/images/category/${item.toLowerCase().replaceAll(" ", "")}.png`} alt={item} />
                                                    <Tooltip flip target={item.toLowerCase().replaceAll(" ", "")} isOpen={tooltipOpen[item]?.isOpen} toggle={()=> (handleToggleChange(item))} >{item}</Tooltip>
                                                </i>)
                                            })}
                                        </div>
                                        {/* <h5 className="ps-2 mb-0 text-truncate fw-normal text-black">{(data?.category_data[0]) ? data?.category_data[0] : null}</h5> */}
                                    </Col>
                                </Row>
                            </div>
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
                                <TabPane tabId={imageDetails.Comments} className="h-100">
                                    <Comments obvId={data?.id} />
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