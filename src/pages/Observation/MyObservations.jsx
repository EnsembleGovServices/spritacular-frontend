import "../../assets/scss/component/myObservation.scss";
import {Col, Container, Row} from "reactstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Icon} from "@iconify/react";
import axios from "../../api/axios";

import {lazy, Suspense, useEffect, useState} from "react";

import useAuth from "../../hooks/useAuth";
import useObservationsData from "../../hooks/useObservationsData";
import useObservations from "../../hooks/useObservations";

import {LoadMore} from "../../components/Shared/LoadMore";
import {obvType} from "../../helpers/observation";
import {baseURL, routeUrls} from "../../helpers/url";
import Loader from "../../components/Shared/Loader";

// To render a dynamic import as a regular component for showing loader till it loads.
const NotFound = lazy(() => import("../../components/Common/NotFound"));
const ObservationDetails = lazy(() => import("./ObservationDetails"));
const ObservationDetailPage = lazy(() => import("./ObservationListPage"));
const InitialUploadObservations = lazy(() => import("../Page/InitialUploadObservations"));

const MyObservations = () => {
    const {auth} = useAuth();
    const {observationListData, setObservationListData} = useObservationsData();

    const currActiveType = observationListData?.activeType ? observationListData?.activeType : obvType.unverified;

    const navigate = useNavigate();
    const {setObservationData, setObservationSteps, setObservationImages} = useObservations();
    const [isObservationDetailModal, setObservationDetailModal] = useState(false);
    const [activeType, setActiveType] = useState(currActiveType);
    const [selectedObservationId, setSelectedObservationId] = useState();
    const [nextPageUrl, setNextPageUrl] = useState(
        "/observation/observation_collection/?type="
    );
    const [loading, setLoading] = useState({});
    const [loadedState, setLoadedState] = useState({});
    const location = useLocation();

    // To edit draft observation
    const handleObservationEdit = (data) => {
        cleaningUpObservationDataForDraftSaving(data).then((r) => r);
        setObservationDetailModal(false);
        setTimeout(function () {
            navigate("/observations/update");
        }, 100);
    };

    // To clean state when obsv is saved as draft
    const cleaningUpObservationDataForDraftSaving = async (data) => {
        setObservationImages([]);
        await setObservationData([]);
        updateStateForDraft(data);
        return true;
    };

    // To update state for draft
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

    // To fetch observation data categorywise
    const getObservationData = (reset = false, value = currActiveType) => {
        setActiveType(value);
        let url;
        if (reset === true || !nextPageUrl) {
            url = `${baseURL.api}/observation/observation_collection/?type=${value}&page=1`;
        } else {
            url = process.env.NODE_ENV === "development" ? nextPageUrl : nextPageUrl.replace('http', 'https');
        }
        axios.get(`${url}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token?.access}`,
            },
        }).then((success) => {
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

        })
            .catch((error) => {
                process.env.NODE_ENV === "development" && console.log('Get Obsv Data:', error);
            });
    };

    // To show/hide observation detail modal
    const handleObservationDetailModal = (id) => {
        setObservationDetailModal(!isObservationDetailModal);
        setSelectedObservationId(id);
    };

    // To handle current type of observation for active/inactive tabs
    const handleTypeOfObservation = (type) => {
        setActiveType(type);

        setObservationListData((prev) => {
            return {
                ...prev,
                list: [],
            };
        });

        getObservationData(true, type);
    };

    // To show more observation on click load more button
    const handleLoadMore = () => {
        getObservationData(false, currActiveType);
    };

    // Append observation in state as per active type
    useEffect(() => {
        setObservationListData((prev) => {
            return {
                ...prev,
                active: observationListData?.list?.[selectedObservationId],
                activeType: currActiveType
            };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isObservationDetailModal, currActiveType]);

    // Clear observation data on routeUrl change
    useEffect(() => {
        setObservationListData((prev) => {
            return {
                ...prev,
                activeType: currActiveType,
                list: []
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    // Get all observation on component mount
    useEffect(() => {
        getObservationData(true, currActiveType);

        return () => {
            setObservationListData((prev) => {
                return {
                    ...prev,
                    list: []
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // For loading
    useEffect(() => {
        setLoading((prev) => {
            return {
                ...prev,
                count: observationListData?.count
            }
        })
    }, [observationListData?.count]);

    // For loader state as per types
    useEffect(() => {
        setLoadedState((prev) => {
            return {
                ...prev,
                hasObservations: loading?.count?.total > 0,
                hasVerifiedData: loading?.count?.verified > 0,
                hasUnverifiedData: loading?.count?.unverified > 0,
                hasDeniedData: loading?.count?.denied > 0,
                hasDraftData: loading?.count?.draft > 0
            }
        })
    }, [loading?.count]);

    const showNotFound = activeType &&
        ((activeType === obvType.verified && !loadedState?.hasVerifiedData) ||
            (activeType === obvType.unverified && !loadedState?.hasUnverifiedData) ||
            (activeType === obvType.denied && !loadedState?.hasDeniedData) ||
            (activeType === obvType.draft && !loadedState?.hasDraftData))

    return (
        <>
            <section className="my-observation-data">
                {loadedState?.hasObservations &&
                    <div className="observation-filter_wrapper">
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
                    </div>
                }

                {/*Data block*/}
                <Container>
                    {!loadedState?.hasObservations &&
                        <Suspense fallback={''}>
                            <InitialUploadObservations count={loading?.count}/>
                        </Suspense>
                    }

                    {
                        (!loadedState?.loading && observationListData?.list?.length > 0) ?
                            (
                                <Suspense fallback={''}>
                                    <ObservationDetailPage
                                        activeType={activeType}
                                        observationList={observationListData?.list}
                                        isObservationDetailModal={isObservationDetailModal}
                                        setObservationDetailModal={setObservationDetailModal}
                                        setSelectedObservationId={setSelectedObservationId}
                                        loadedState={loadedState}
                                        handleContinueEdit={handleObservationEdit}
                                    />
                                    {(!loadedState?.loading && nextPageUrl && observationListData?.list?.length > 0) &&
                                        <LoadMore handleLoadMore={handleLoadMore}/>
                                    }
                                </Suspense>
                            ) : !showNotFound && <Loader/>
                    }

                    {(showNotFound && loadedState?.hasObservations && observationListData?.list?.length === 0 && !loadedState?.loading) &&
                        <Suspense fallback={''}>
                            <NotFound/>
                        </Suspense>
                    }
                </Container>
            </section>

            {
                observationListData?.list?.length > 0 &&
                <Suspense fallback={<Loader/>}>
                    <ObservationDetails
                        data={observationListData?.active}
                        activeType={activeType}
                        modalClass="observation-details_modal"
                        open={isObservationDetailModal}
                        handleClose={handleObservationDetailModal}
                        handleContinueEdit={handleObservationEdit}
                        handleApproveRejectEvent={getObservationData}
                        refreshData={getObservationData}
                    />
                </Suspense>
            }
        </>
    );
};
export default MyObservations;