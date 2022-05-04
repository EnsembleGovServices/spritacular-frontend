import "../../assets/scss/component/observationDetails.scss";
import {Suspense, lazy, useRef, useEffect, useState} from 'react';
import {
    Badge,
    Button,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    Row,
    Spinner,
    TabContent,
    TabPane
} from "reactstrap";
import { Icon } from "@iconify/react";
import Tippy from "@tippyjs/react";
import useObservationsData from "../../hooks/useObservationsData";

import Images from './../../static/images';
import { imageDetails } from "../../helpers/observation";
import Loader from "../../components/Shared/Loader";


const ObservationMoreDetails = lazy(()=> import('../../components/Observation/ObservationDetails/ObservationMoreDetails'))
const ObservationMoreEquipementDetails = lazy(()=> import('../../components/Observation/ObservationDetails/ObservationMoreEquipementDetails'))
const Comments = lazy(()=> import('../../components/Observation/ObservationDetails/Comments'))
const CardImageCarousel = lazy(()=> import('../../components/Shared/CardImageCarousel'))


const ObservationDetails = (props) =>{
    const {modalClass, open, handleClose, data, activeType, handleContinueEdit, handleApproveRejectEvent } = props;
    const [activeTab, setActiveImageTab] = useState(imageDetails.Details);
    const {observationComments} = useObservationsData();
    const obvDetailsModal = useRef(null);

    const checkNullImage = (data?.images?.[0]?.image === null || data?.images?.[1]?.image === null || data?.images?.[2]?.image === null);

    // Toggle Tabs
    const toggleImageDetailsTab = (tab) => {
        if (activeTab !== tab) {
            setActiveImageTab(tab);
        }
    };
    useEffect(()=>{
        setActiveImageTab(imageDetails.Details)
    },[open])

    return (
        <>
            <Modal 
                className={modalClass ? modalClass : ''}
                isOpen={open}
                backdrop={true}
                keyboard={false}
                scrollable={false}
                size="xl"
                toggle={handleClose}
                ref={obvDetailsModal}
            >
                <ModalHeader className="d-flex justify-content-between align-items-center w-100">
                    <div>
                        <Button className="close-icon bg-transparent rounded-0 border-0 shadow-none p-0 me-3" onClick={() => handleClose()}>
                            <img src={Images.Modalcloseicon} alt="close-icon" />
                        </Button>
                        {(data?.category_data?.[0]) ? data?.category_data?.[0]?.name : null}
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
                                { !(data?.image_type === 3) && (data?.images?.length === 0 ?
                                    <img src={Images.NotAvailable} alt="No available" className="object-contain img-fluid"/> : (
                                        !checkNullImage ? <img src={data?.images?.[0]?.image} alt="card details" className="img-fluid" /> : (
                                            <div className="d-flex flex-column h-100 align-items-center justify-content-center bg-gradient bg-light">
                                                <Spinner
                                                    color="primary"
                                                    size="20px"
                                                />
                                                <h5 className="mt-3">Processing image...</h5>
                                            </div>
                                        )
                                    ))
                                }
                                 { data?.image_type === 3 &&
                                     <Suspense fallback={<Loader fixContent={true} />}>
                                        <CardImageCarousel  carouselData={data?.images} detail={true}/>
                                    </Suspense>
                                 }
                                </div>
                                <Row>
                                    <Col sm={6} className="justify-content-start d-flex align-items-center mb-2 mb-sm-0">
                                        <div className="d-flex card-user_details align-items-center overflow-hidden">
                                            <i className="profile-icon rounded-circle"><img width="100%" height="100%" src={data?.user_data?.profile_image ? data?.user_data?.profile_image : Images.DefaultProfile} alt="Profile" className="rounded-circle" /></i>
                                            {/* User sort name  */}
                                            {/* <i className="profile-text rounded-circle bg-black text-white">JD</i> */}
                                            <h5 className="pe-2 mb-0 text-truncate fw-normal text-black">{data?.user_data?.first_name + ' ' + data?.user_data?.last_name}</h5>
                                        </div>
                                    </Col>
                                    <Col sm={6} className="justify-content-end d-flex align-items-center">
                                        <div className="observation_type d-flex align-items-center">
                                        {data?.category_data?.length > 0 && data?.category_data?.map((item, index) => {
                                            return (
                                                <i id={item?.name?.toLowerCase().replaceAll(" ", "")} className="rounded-circle bg-white ms-2 cursor-pointer" key={index}>
                                                    <Tippy animation="perspective" content={item?.name}>
                                                        <img src={`/assets/images/category/${item?.name?.toLowerCase().replaceAll(" ", "")}.png`} alt={item?.name} />
                                                    </Tippy>
                                                </i>
                                            )
                                        })}
                                        </div>
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
                                        Comments {observationComments?.comment_count === 0 ? '' : `(${observationComments?.comment_count})`} 
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId={imageDetails.Details}>
                                    <Suspense fallback={<div>please wait...</div>}>
                                        <ObservationMoreDetails handlePopup={handleClose} approveRejectEvent={handleApproveRejectEvent}  obvCommentCount={observationComments?.comment_count} data={data} activeType={activeType}/>
                                    </Suspense>
                                </TabPane>
                                <TabPane tabId={imageDetails.Equipment}>
                                    <Suspense fallback={<div>please wait...</div>}>
                                        <ObservationMoreEquipementDetails obvCommentCount={observationComments?.comment_count} data={data?.camera_data} />
                                    </Suspense>
                                </TabPane>
                                <TabPane tabId={imageDetails.Comments}>
                                    <Suspense fallback={<div>please wait...</div>}>
                                        <Comments obvId={data?.id} />
                                    </Suspense>
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