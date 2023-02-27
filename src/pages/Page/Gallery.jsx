import "../../assets/scss/component/myObservation.scss";
import "../../assets/scss/component/gallery.scss";
import {lazy, Suspense, useEffect, useState} from "react";
import {Container, UncontrolledAlert} from "reactstrap";
import {Link} from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import {baseURL, routeUrls} from "../../helpers/url";
import {LoadMore} from "../../components/Shared/LoadMore";
import useObservationsData from "../../hooks/useObservationsData";
import Loader from "../../components/Shared/Loader";
import {dashboardHelper} from "../../helpers/dashboard";
import PageMeta from "../../meta/PageMeta";

// To render a dynamic import as a regular component for showing loader till it loads.
const NotFound = lazy(() => import("../../components/Common/NotFound"));
const ObservationDetails = lazy(() => import("../Observation/ObservationDetails"));
const FilterSelectMenu = lazy(() => import("../../components/Shared/FilterSelectMenu"));
const ObservationDetailPage = lazy(() => import("../Observation/ObservationListPage"));

const Gallery = () => {
    const {auth} = useAuth();
    const [isObservationDetailModal, setObservationDetailModal] = useState(false);
    const [selectedObservationId, setSelectedObservationId] = useState();
    const [searchCountry, setSearchCountry] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState({
        isCountryOpen: false,
        isTypeOpen: false,
        isStatusOpen: false,
    });
    const [selectedFilterHorizontal, setSelectedFilterHorizontal] = useState({
        country: {name: "", code: ""},
        type: "",
        status: "",
    });
    const {observationListData, setObservationListData} = useObservationsData();
    const [loadedState, setLoadedState] = useState({loading: true, hasData: true});
    const [showNoData, setShowNoData] = useState(false);
    const activeTypeData = observationListData?.active?.is_verified ? "verified" : observationListData?.active?.is_reject ? "denied" : observationListData?.active?.is_submit ? "unverified" : "draft"

    const [nextPageUrl, setNextPageUrl] = useState(
        `${baseURL.api}/observation/gallery/?country=&category=&status=`
    );
    const normalUser = auth?.user?.is_user;
    const trainedUser = auth?.user?.is_trained;

    const findCountry = (e) => {
        let value = e.target.value.toLowerCase();
        setSearchCountry(value);
    };

    const handleLoadMoreData = () => {
        getObservationType(
            false,
            selectedFilterHorizontal.country?.code,
            selectedFilterHorizontal.type,
            selectedFilterHorizontal.status,
        ).then(r => r);
    };
    const getObservationType = async (
        reset = false,
        country = `${selectedFilterHorizontal.country?.code}`,
        category = `${selectedFilterHorizontal.type}`,
        status = `${selectedFilterHorizontal.status}`,
        hasDataChanged = false
    ) => {
        let url;
        if (reset === true || !nextPageUrl) {
            url = `${baseURL.api}/observation/gallery/?country=${country}&category=${category}&status=${status}&page=1`;
            // console.log('url without next page')
        } else {
            // console.log('url with next page')
            url = process.env.NODE_ENV === "development" ? nextPageUrl : nextPageUrl.replace('http', 'https');
        }

        const headers = {};
        headers["Content-Type"] = "application/json";
        if (auth?.user) {
            headers["Authorization"] = `Bearer ${auth?.token?.access}`;
        }

        setLoadedState((prev) => {
            return {
                ...prev,
                loading: true
            }
        });

        await axios.get(url, {headers: headers}).then((success) => {
            if (success?.data?.results?.data !== undefined) {
                if (success?.data?.next) {
                    setNextPageUrl(success?.data?.next);
                } else {
                    setNextPageUrl(null);
                }
                let records = success?.data?.results?.data;
                let prevData;

                if (observationListData?.list?.length > 0 && reset === false && !hasDataChanged) {
                    prevData = [...observationListData?.list];
                    prevData = [...prevData, ...records];
                } else if (reset && hasDataChanged) {
                    // prevData = [...observationListData?.list];
                    prevData = [...records];
                } else {
                    prevData = success?.data?.results?.data;
                }
                setObservationListData((prev) => {
                    return {
                        ...prev,
                        list: prevData,
                        isVerified: false
                    };
                });
                setLoadedState((prev) => {
                    return {
                        ...prev,
                        loading: false,
                        hasData: success?.data?.results?.data?.length > 0
                    }
                });
            } else {
                setNextPageUrl(null);
                setObservationListData({list: [], active: {}, isVerified: false});
            }
        })
            .catch((error) => {
                setLoadedState((prev) => {
                    return {
                        ...prev,
                        loading: false,
                    }
                });
                process.env.NODE_ENV === "development" && console.log('ObsvType: ', error.response);
            });
    };

    const handleObservationDetailModal = (id) => {
        setObservationDetailModal(!isObservationDetailModal);
        setSelectedObservationId(id);
    };

    const handleFilterValue = (value, type) => {
        setObservationListData([]);
        // setLoadMore(pageSize);
        if (type === "status") {
            value = value.toLowerCase();
            getObservationType(
                true,
                selectedFilterHorizontal.country?.code,
                selectedFilterHorizontal.type,
                value
            ).then(r => r);
        } else if (type === "category") {
            getObservationType(
                true,
                selectedFilterHorizontal.country?.code,
                value,
                selectedFilterHorizontal.status
            ).then(r => r);
        } else if (type === "country") {
            getObservationType(
                true,
                value.code,
                selectedFilterHorizontal.type,
                selectedFilterHorizontal.status
            ).then(r => r);
        }
    };


    const resetHorizontalFilter = () => {
        if (selectedFilterHorizontal.filtered) {
            setSelectedFilterHorizontal(dashboardHelper.horizontal);
            getObservationType(true, "", "", "").then(r => r);
        }
    }

    useEffect(() => {
        if (isFilterOpen.isCountryOpen === false) {
            setSearchCountry("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFilterOpen.isCountryOpen]);
    useEffect(() => {
        setObservationListData((prev) => {
            return {
                ...prev,
                active: observationListData?.list?.[selectedObservationId],
            };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isObservationDetailModal]);
    useEffect(() => {
        setObservationListData((prev) => {
            return {
                ...prev,
                activeType: "",
                list: []
            }
        })
        getObservationType(true, "", "", "").then(r => r);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getObservationType(true, "", "", "", true).then(r => r);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [observationListData?.isVerified === true])

    useEffect(() => {
        setShowNoData(loadedState?.hasData);
    }, [loadedState?.hasData]);

    return (
        <>
            <PageMeta
                title="Gallery"
                description="A collection of observation images from Spritacular community."
            />
            <Suspense fallback={<div></div>}>
                <FilterSelectMenu
                    galleryFilter={true}
                    isFilterOpen={isFilterOpen}
                    setIsFilterOpen={setIsFilterOpen}
                    selectedFilterHorizontal={selectedFilterHorizontal}
                    setSelectedFilterHorizontal={setSelectedFilterHorizontal}
                    searchCountry={searchCountry}
                    findCountry={findCountry}
                    handleFilterValue={handleFilterValue}
                    resetFilter={resetHorizontalFilter}
                />
            </Suspense>

            <Container className="pt-3">
                {normalUser && (
                    <UncontrolledAlert
                        color="danger"
                        data-dismiss="alert"
                        dismissible="true"
                        className="text-center mb-5"
                    >
                        Would you like to help us sift through observations and endorse
                        their validity?
                        <Link
                            to={"/" + routeUrls.quiz.home}
                            className="btn btn-outline-primary"
                        >
                            Get Trained
                        </Link>
                    </UncontrolledAlert>
                )}
                {trainedUser && (
                    <UncontrolledAlert
                        data-dismiss="alert"
                        dismissible="true"
                        className="text-center mb-5"
                    >
                        Congratulations, as a trained user you can now vote to verify observations.
                    </UncontrolledAlert>
                )}

                {loadedState?.hasData && observationListData?.list?.length > 0 &&
                    <div className="gallery-page">
                        <h4 className="text-black fw-bold" id="gallery_heading">Recent Observations</h4>
                        <div>
                            <Suspense fallback={<div></div>}>
                                {observationListData?.list?.length > 0 &&
                                    <ObservationDetailPage
                                        observationList={observationListData?.list}
                                        isObservationDetailModal={isObservationDetailModal}
                                        setObservationDetailModal={setObservationDetailModal}
                                        setSelectedObservationId={setSelectedObservationId}
                                    />
                                }
                                {observationListData?.list?.length > 0 && nextPageUrl &&
                                    <LoadMore handleLoadMore={handleLoadMoreData}/>
                                }
                            </Suspense>
                        </div>
                    </div>
                }

                {loadedState?.loading &&
                    <Loader fixContent={true}/>
                }

                {!showNoData &&
                    <Suspense fallback={''}>
                        <NotFound/>
                    </Suspense>
                }

            </Container>

            <ObservationDetails
                data={observationListData?.active}
                activeType={activeTypeData}
                modalClass="observation-details_modal"
                open={isObservationDetailModal}
                handleClose={handleObservationDetailModal}
                handleApproveRejectEvent={getObservationType}
                refreshData={getObservationType}
            />
        </>
    );
};
export default Gallery;
