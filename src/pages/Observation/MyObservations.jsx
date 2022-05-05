import "../../assets/scss/component/myObservation.scss";
import {Col, Container, Row} from "reactstrap";
import {Link, useNavigate} from "react-router-dom";
import {Icon} from "@iconify/react";
import axios from "../../api/axios";

import {lazy, Suspense, useEffect, useState} from "react";

import useAuth from "../../hooks/useAuth";
import useObservationsData from "../../hooks/useObservationsData";
//Todo should not be used two context for same thing
import useObservations from "../../hooks/useObservations";

import {LoadMore} from "../../components/Shared/LoadMore";
import {obvType} from "../../helpers/observation";
import {baseURL, routeUrls} from "../../helpers/url";
import Images from "./../../static/images";
import Loader from "../../components/Shared/Loader";

const ObservationDetails = lazy(() => import("./ObservationDetails"));
const ObservationDetailPage = lazy(() => import("./ObservationDetailPage"));
const InitialUploadObservations = lazy(() =>
    import("../InitialUploadObservations")
);

const MyObservations = () => {
    const {auth} = useAuth();
    const {setObservationData, setObservationSteps, setObservationImages} =
        useObservations();
    const {observationListData, setObservationListData} = useObservationsData();
    const [isObservationDetailModal, setObservationDetailModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);
    const [activeType, setActiveType] = useState("verified");
    const [selectedObservationId, setSelectedObservationId] = useState();
    const navigate = useNavigate();
    const [nextPageUrl, setNextPageUrl] = useState(
        "/observation/observation_collection/?type="
    );
    const [isActiveTypeChangeFinished, setActiveTypeChangeFinished] =
        useState(false);

    const [isNulledImage, setIsNulledImage] = useState();

    const handleObservationEdit = (data) => {
        cleaningUpObservationDataForDraftSaving(data).then((r) => r);
        setObservationDetailModal(false);
        setTimeout(function () {
            navigate("/observations/update");
        }, 100);
    };

    const cleaningUpObservationDataForDraftSaving = async (data) => {
        setObservationImages([]);
        setObservationData([]);
        await updateStateForDraft(data);
        return true;
    };

    const updateStateForDraft = (data) => {
        setObservationSteps((prev) => {
            return {
                ...prev,
                total: 3,
                active: 1,
                mode: {
                    update: true,
                    ...data,
                },
            };
        });
    };

    const getObservationData = (reset = false, value = "verified") => {
        setActiveType(value);
        let url;
        if (reset === true || !nextPageUrl) {
            url = "/observation/observation_collection/?type=" + value + "&page=1";
        } else {
            url = nextPageUrl;
        }
        axios
            .get(baseURL.api + url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth?.token?.access}`,
                },
            })
            .then((success) => {
                let data = success?.data?.results;
                if (success?.data?.next) {
                    setNextPageUrl(success?.data?.next);
                } else {
                    setNextPageUrl(null);
                }

                let records = data?.data;
                let prevData;

                if (observationListData?.list && !reset) {
                    prevData = [...observationListData.list];
                    prevData = [...prevData, ...records];
                } else {
                    prevData = data?.data;
                }

                // Global State
                setObservationListData((prev) => {
                    return {
                        ...prev,
                        list: prevData,
                        count: {
                            verified: data?.verified_count,
                            unverified: data?.unverified_count,
                            denied: data?.denied_count,
                            draft: data?.draft_count,
                            total:
                                data?.verified_count +
                                data?.unverified_count +
                                data?.denied_count +
                                data?.draft_count,
                        },
                    };
                });

                setIsLoaded(false);
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    const handleObservationDetailModal = (id) => {
        setObservationDetailModal(!isObservationDetailModal);
        setSelectedObservationId(id);
    };

    const handleTypeOfObservation = (type) => {
        setActiveTypeChangeFinished(true);
        setActiveType(type);

        setObservationListData((prev) => {
            return {
                ...prev,
                list: [],
            };
        });

        getObservationData(true, type);

        setTimeout(function () {
            setActiveTypeChangeFinished(false);
        }, 300);
    };

    const handleLoadMore = () => {
        getObservationData(false, activeType);
    };

    const listCount = observationListData?.count;

    useEffect(() => {
        setObservationListData((prev) => {
            return {
                ...prev,
                active: observationListData?.list?.[selectedObservationId],
            };
        });
    }, [isObservationDetailModal]);

    useEffect(() => {
        getObservationData(true, "verified");
        setIsLoaded(false);
    }, [isLoaded]);

    const handleImageNulled = (eventData) => {
        setIsNulledImage(eventData);
    };

    useEffect(() => {
        let activeID = observationListData?.active?.id;
        if (!isNulledImage) {
            observationListData?.list?.map((item) => {
                if (item.id === activeID) {
                    return item;
                }
                return setObservationListData((prev) => {
                    return {
                        ...prev,
                        active: item
                    }
                })
            })
        }
    }, [isNulledImage])

    return listCount?.total > 0 ? (
        <section className="my-observation-data">
            {/*Filter*/}
            <Container>
                <div className="filtered-data_wrapper">
                    <Row>
                        <Col sm={12} md={8} lg={6} className="order-2 order-md-1">
                            <div
                                className="d-flex align-items-center justify-content-start h-100 text-truncate overflow-auto mb-3 mb-md-0">
                <span
                    className={
                        activeType === obvType.verified
                            ? "filter-link active"
                            : "filter-link "
                    }
                    onClick={() => handleTypeOfObservation(obvType.verified)}
                >
                  Verified ({observationListData?.count?.verified})
                </span>
                                <span
                                    className={
                                        activeType === obvType.unverified
                                            ? "filter-link active"
                                            : "filter-link "
                                    }
                                    onClick={() => handleTypeOfObservation(obvType.unverified)}
                                >
                  Unverified ({observationListData?.count?.unverified})
                </span>
                                <span
                                    className={
                                        activeType === obvType.denied
                                            ? "filter-link active"
                                            : "filter-link "
                                    }
                                    onClick={() => handleTypeOfObservation(obvType.denied)}
                                >
                  Denied ({observationListData?.count?.denied})
                </span>
                                <span
                                    className={
                                        activeType === obvType.draft
                                            ? "filter-link active"
                                            : "filter-link "
                                    }
                                    onClick={() => handleTypeOfObservation(obvType.draft)}
                                >
                  Drafts ({observationListData?.count?.draft})
                </span>
                            </div>
                        </Col>
                        <Col sm={12} md={4} lg={6} className="text-end order-1 order-md-2">
                            <div
                                className="d-flex align-items-center justify-content-end h-100  flex-wrap flex-lg-nowrap mb-2 mb-md-0">
                                <Link
                                    to={"/" + routeUrls.observationsAdd}
                                    className="btn btn-secondary ms-2 ms-xl-4 shadow-none"
                                >
                                    <Icon
                                        icon="heroicons-outline:upload"
                                        width="16"
                                        height="20"
                                    />
                                    Upload Observations
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>

            {/*Data block*/}

            <Container>
                {isActiveTypeChangeFinished ? (
                    <Loader/>
                ) : observationListData?.list?.length > 0 ? (
                    <Suspense fallback={<div>Please wait...</div>}>
                        <ObservationDetailPage
                            activeType={activeType}
                            observationList={observationListData?.list}
                            isObservationDetailModal={isObservationDetailModal}
                            setObservationDetailModal={setObservationDetailModal}
                            setSelectedObservationId={setSelectedObservationId}
                        />
                    </Suspense>
                ) : (
                    <div className="data-not-found">
                        <img
                            src={Images.NoDataFound}
                            alt="No data found"
                            className="mb-3"
                        />
                        <p>
                            <b className="text-secondary fw-bold">Opps!</b> No Data Found
                        </p>
                    </div>
                )}

                {nextPageUrl && <LoadMore handleLoadMore={handleLoadMore}/>}
            </Container>

            <Suspense fallback={<div>Please wait...</div>}>
                <ObservationDetails
                    data={observationListData?.active}
                    activeType={activeType}
                    modalClass="observation-details_modal"
                    open={isObservationDetailModal}
                    handleClose={handleObservationDetailModal}
                    handleContinueEdit={handleObservationEdit}
                    handleApproveRejectEvent={getObservationData}
                    hasNulledImage={handleImageNulled}
                    refreshData={getObservationData}
                />
            </Suspense>
        </section>
    ) : (
        <Suspense fallback={<div>Please wait...</div>}>
            <InitialUploadObservations count={listCount}/>
        </Suspense>
    );
};
export default MyObservations;
