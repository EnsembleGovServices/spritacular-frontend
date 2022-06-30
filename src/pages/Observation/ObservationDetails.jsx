import "../../assets/scss/component/observationDetails.scss";
import "../../assets/scss/component/quiz.scss";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
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
    TabPane,
} from "reactstrap";

import { Icon } from "@iconify/react";
import Tippy from "@tippyjs/react";
import { imageDetails } from "../../helpers/observation";
import axios from "../../api/axios";
import { baseURL, cdn, routeUrls } from "../../helpers/url";
import useAuth from "../../hooks/useAuth";
import { PropTypes } from "prop-types";
import { useLocation } from "react-router-dom";
import useObservationsData from "../../hooks/useObservationsData";
import Skeleton from "react-loading-skeleton";

// To render a dynamic import as a regular component for showing loader till it loads.
const BlurImageComp = lazy(() => import("../../components/Common/BlurImage"));
const ObservationMoreDetails = lazy(() => import("../../components/Observation/ObservationDetails/ObservationMoreDetails"));
const ObservationMoreEquipementDetails = lazy(() => import("../../components/Observation/ObservationDetails/ObservationMoreEquipementDetails"));
const Comments = lazy(() => import("../../components/Observation/ObservationDetails/Comments"));
const CardImageCarousel = lazy(() => import("../../components/Shared/CardImageCarousel"));

const ObservationDetails = (props) => {
    const { auth } = useAuth();
    const location = useLocation();
    const intervalRef = useRef();
    const {
        modalClass,
        open,
        handleClose,
        data,
        activeType,
        handleContinueEdit,
        handleApproveRejectEvent,
        refreshData
    } = props;

    const [activeTab, setActiveImageTab] = useState(imageDetails.Details);
    const { observationComments, setObservationListData, observationListData } = useObservationsData();
    const obvDetailsModal = useRef(null);
    const [isImageNull, setIsImageNull] = useState(true);
    const [loaderLoading, setLoaderLoading] = useState(true);
    const [fullScreen, setFullScreen] = useState(false);
    const [fullImage, setFullImage] = useState("");

    // Toggle Tabs
    const toggleImageDetailsTab = (tab) => {
        if (activeTab !== tab) {
            setActiveImageTab(tab);
        }
    };

    // Fetch image for observation for null checking
    const checkNulledImage = async () => {
        return await axios
            .post(
                baseURL.api + "/observation/get_observation_details/" + data?.id + "/",
                null,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth?.token?.access}`,
                    },
                }
            )
            .then((response) => {
                setIsImageNull(response?.data?.data?.includes(null));
            })
            .catch((error) => {
                process.env.NODE_ENV === "development" && console.log('ObsvDetail:', error);
            });
    };

    // Loader for sidebar loading
    const handleLoaderLoading = (state) => {
        setLoaderLoading(state);
    }

    // Handle Full Screen
    const goFullScreenImage = (image) => {
        setFullImage(image);
        setFullScreen(true);
    }
    const closeFullScreen = () => {
        setFullScreen(false);
        setFullImage("");
    }

    useEffect(() => {
        setLoaderLoading(true);
        setActiveImageTab(imageDetails.Details);
    }, [open, data?.id]);

    useEffect(() => {
        if (open && data?.id && isImageNull && auth?.user?.id) {
            intervalRef.current = setInterval(() => {
                checkNulledImage().then((r) => r);
            }, 1000);

            return () => {
                clearInterval(intervalRef.current);
            };
        } else if (open && data?.id && isImageNull && !auth?.user?.id) {
            setTimeout(function () {
                setIsImageNull(false);
            }, 1000)
        }
    }, [data?.id, isImageNull, open, auth?.user]);

    useEffect(() => {
        if (!isImageNull && location.pathname === `/${routeUrls.myObservations}`) {
            refreshData(true, activeType);
        }

    }, [isImageNull, location]);

    useEffect(() => {
        if (!isImageNull) {
            observationListData?.list?.filter(item => {
                return item.id === observationListData?.active?.id
            }).map(item => {
                return setObservationListData((prev) => {
                    return {
                        ...prev,
                        active: item
                    }
                })
            })
        }
    }, [observationListData.list])

    return (
        <>
            <Modal
                className={modalClass ? modalClass : ""}
                isOpen={open}
                backdrop={true}
                keyboard={false}
                size="xl"
                toggle={handleClose}
                ref={obvDetailsModal}
            >
                <ModalHeader className="d-flex justify-content-between align-items-center w-100">
                    <div className="d-flex align-items-center justify-content-start">
                        <Button
                            className="close-icon bg-transparent rounded-0 border-0 shadow-none p-0 me-3"
                            onClick={() => handleClose()}
                        >
                            <img src={`${cdn.url}/close-icon.svg`} alt="close-icon" />
                        </Button>
                        <h4 className="d-inline-block m-0">{data?.category_data?.[0] ? data?.category_data?.[0]?.name : null}</h4>
                        <Badge
                            className={`text-uppercase ${activeType === "verified" ? "badge-success" : ""
                                }`}
                        >
                            {activeType === "verified" && (
                                <Icon
                                    icon="mdi:check-decagram"
                                    color="#27ae60"
                                    className="me-1"
                                    width="13"
                                    height="13"
                                />
                            )}
                            {activeType}
                        </Badge>
                    </div>

                    {activeType === "draft" && (
                        <div>
                            <Button
                                variant="primary"
                                onClick={() =>
                                    handleContinueEdit({ id: data?.id, type: activeType })
                                }
                            >
                                Continue Editing
                            </Button>
                        </div>
                    )}
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={6}>
                            <div className="mb-4 mb-md-0 h-100">
                                <div className="preview-detail mb-3 mb-md-2">
                                    {!(data?.image_type === 3) &&
                                        (data?.images?.length === 0 ? (
                                            <img
                                                src={`${cdn.url}/noimage.jpg`}
                                                alt="No available"
                                                className="object-contain img-fluid"
                                            />
                                        ) : !isImageNull ? (
                                            <div className="full-screen position-relative h-100"
                                                onClick={() => goFullScreenImage(data?.images?.[0]?.image)}>
                                                <Suspense fallback={<div></div>}>
                                                    <BlurImageComp
                                                        image={data?.images?.[0]?.image}
                                                        preview={data?.images?.[0]?.image}
                                                        alt={data?.images?.[0]?.location}
                                                        loaderLoading={handleLoaderLoading}
                                                    />
                                                </Suspense>
                                                <div className="fc-icon">
                                                    <Icon icon="octicon:screen-full-16" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className="d-flex flex-column h-100 align-items-center justify-content-center bg-gradient bg-light">
                                                <Spinner color="primary" size="20px" />
                                                <h5 className="mt-3">Processing image...</h5>
                                            </div>
                                        ))}
                                    {data?.image_type === 3 && (
                                        <div className="full-screen position-relative h-100">
                                            <CardImageCarousel
                                                carouselData={data?.images}
                                                detail={true}
                                                loaderLoading={handleLoaderLoading}
                                                handleFullScreen={goFullScreenImage}
                                            />
                                            <div className="fc-icon"
                                                onClick={() => goFullScreenImage(data?.images?.[0]?.image)}>
                                                <Icon icon="octicon:screen-full-16" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <Row>
                                    <Col
                                        sm={6}
                                        className="justify-content-start d-flex align-items-center mb-2 mb-sm-0 position-relative"
                                    >
                                        {loaderLoading &&
                                            <div className="obv-user-cat-loader">
                                                <Skeleton height={32} width="80%" />
                                            </div>
                                        }
                                        <div
                                            className="d-flex card-user_details align-items-center overflow-hidden mx-1">
                                            <i className="profile-icon rounded-circle">
                                                <img
                                                    width="100%"
                                                    height="100%"
                                                    src={
                                                        data?.user_data?.profile_image
                                                            ? data?.user_data?.profile_image
                                                            : `${cdn.url}/profile.svg`
                                                    }
                                                    alt="Profile"
                                                    className="rounded-circle"
                                                />
                                            </i>
                                            <h5 className="pe-2 mb-0 text-truncate fw-normal text-black">
                                                {data?.user_data?.first_name +
                                                    " " +
                                                    data?.user_data?.last_name}
                                            </h5>
                                        </div>
                                    </Col>
                                    <Col
                                        sm={6}
                                        className="justify-content-end d-flex align-items-center position-relative"
                                    >
                                        <div className="observation_type d-flex align-items-center">
                                            {data?.category_data?.length > 0 &&
                                                data?.category_data?.map((item, index) => {
                                                    return (
                                                        <div key={index} className="cat-loader m-0 gap">
                                                            {loaderLoading &&
                                                                <div className="skeleton">
                                                                    <Skeleton circle height={28} width={28} />
                                                                </div>
                                                            }
                                                            <div className="obv-cat-item mt-1">
                                                                <span
                                                                    id={item?.name?.toLowerCase().replaceAll(" ", "")}
                                                                    className="rounded-circle bg-white me-1 cursor-pointer"
                                                                >
                                                                    <Tippy
                                                                        animation="perspective"
                                                                        content={item?.name}
                                                                    >
                                                                        <img
                                                                            src={`/assets/images/category/${item?.name
                                                                                ?.toLowerCase()
                                                                                .replaceAll(" ", "")}.png`}
                                                                            alt={item?.name}
                                                                            width={16} height={16}
                                                                        />
                                                                    </Tippy>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
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
                                        className={
                                            activeTab === imageDetails.Details ? "active" : ""
                                        }
                                        onClick={() => {
                                            toggleImageDetailsTab(imageDetails.Details);
                                        }}
                                    >
                                        Details
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={
                                            activeTab === imageDetails.Equipment ? "active" : ""
                                        }
                                        onClick={() => {
                                            toggleImageDetailsTab(imageDetails.Equipment);
                                        }}
                                    >
                                        Equipment
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={
                                            activeTab === imageDetails.Comments ? "active" : ""
                                        }
                                        onClick={() => {
                                            toggleImageDetailsTab(imageDetails.Comments);
                                        }}
                                    >
                                        Comments{" "}
                                        {observationComments?.comment_count === 0
                                            ? ""
                                            : `(${observationComments?.comment_count})`}
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId={imageDetails.Details}>
                                    <Suspense fallback={<div>please wait...</div>}>
                                        <ObservationMoreDetails
                                            handlePopup={handleClose}
                                            approveRejectEvent={handleApproveRejectEvent}
                                            obvCommentCount={observationComments?.comment_count}
                                            data={data}
                                            activeType={activeType}
                                        />
                                    </Suspense>
                                </TabPane>
                                <TabPane tabId={imageDetails.Equipment}>
                                    <Suspense fallback={<div>please wait...</div>}>
                                        <ObservationMoreEquipementDetails
                                            obvCommentCount={observationComments?.comment_count}
                                            data={data?.camera_data}
                                        />
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
            {fullScreen &&
                <Modal
                    className="fullScreen-quiz-image-modal"
                    isOpen={fullScreen}
                    backdrop={false}
                    centered
                    fullscreen
                    toggle={closeFullScreen}
                >
                    <ModalBody>
                        <button className="close-icon" type="button" onClick={() => closeFullScreen()}>
                            <Icon color="#fff" width={30} height={30} icon="clarity:close-line" />
                        </button>
                        <div className="fc-image-wrapper">
                            <div className="fc-image-adjust">
                                {data?.image_type === 3 ?
                                    <CardImageCarousel
                                        carouselData={data?.images}
                                        detail={true}
                                        loaderLoading={handleLoaderLoading}
                                    /> : <BlurImageComp preview={fullImage} image={fullImage} />
                                }
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            }
        </>
    );
};

ObservationDetails.propTypes = {
    hasNulledImage: PropTypes.func,
    refreshData: PropTypes.func
};

export default ObservationDetails;
