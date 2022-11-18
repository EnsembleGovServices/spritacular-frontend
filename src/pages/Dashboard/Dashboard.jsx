import "../../assets/scss/component/dashboard.scss";
import {lazy, Suspense, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useObservationsData from "../../hooks/useObservationsData";

import useObservations from "../../hooks/useObservations";
import {LoadMore} from "../../components/Shared/LoadMore";

import axios from "../../api/axios";
import {dashboardHelper} from "../../helpers/dashboard";
import {baseURL} from "../../helpers/url";
import Loader from "../../components/Shared/Loader";

// To render a dynamic import as a regular component for showing loader till it loads.
const NotFound = lazy(() => import("../../components/Common/NotFound"));
const FilterSelectMenu = lazy(() => import("../../components/Shared/FilterSelectMenu"));
const AdvancedFilter = lazy(() => import("../../components/Shared/AdvancedFilter"));
const ObservationDetailPage = lazy(() => import("../Observation/ObservationListPage"));
const ObservationListView = lazy(() => import("../Observation/ObservationListView"));
const ObservationDetails = lazy(() => import("../Observation/ObservationDetails"));

const Dashboard = () => {
    const navigate = useNavigate();
    const {auth} = useAuth();
    const [isObservationDetailModal, setObservationDetailModal] = useState(false);
    const [selectedObservationId, setSelectedObservationId] = useState();
    const {setObservationData, setObservationSteps, setObservationImages} = useObservations();
    const [filterShow, setFilterShow] = useState(true);
    const [listView, setListView] = useState(false);
    const [gridView, setGridView] = useState(true);

    const [searchCountry, setSearchCountry] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(dashboardHelper.filterState);
    const [selectedFilterHorizontal, setSelectedFilterHorizontal] = useState(
        dashboardHelper.horizontal
    );
    const [selectedFilterVertical, setSelectedFilterVertical] = useState(
        dashboardHelper.vertical
    );
    const {observationListData, setObservationListData} = useObservationsData();
    const [nextPageUrl, setNextPageUrl] = useState(dashboardHelper.nextPageUrl);
    const [filterReset, setFilterReset] = useState(false);
    const [loadedState, setLoadedState] = useState({loading: true, hasData: true});
    const [shouldFilter, setShouldFilter] = useState(false);

    // To fetch and store all observations from db and handle loader/error's
    const getObservationData = async (
        reset = false,
        country = `${selectedFilterHorizontal?.country?.code}`,
        category = `${selectedFilterHorizontal?.type}`,
        status = `${selectedFilterHorizontal?.status}`
    ) => {
        setLoadedState({loading: true})

        if (auth?.user?.is_superuser) {
            let url;
            if (reset === true || !nextPageUrl) {
                url = `${baseURL.api}/observation/dashboard/?country=${country}&category=${category}&status=${status}&page=1`;
            } else {
                url = process.env.NODE_ENV === "development" ? nextPageUrl : nextPageUrl.replace('http', 'https');

            }

            if (selectedFilterVertical.obs_start_date !== null) {
                if (selectedFilterVertical.obs_start_time !== null) {
                    selectedFilterVertical.from_obs_data = selectedFilterVertical.obs_start_date +
                        " " +
                        selectedFilterVertical.obs_start_time

                } else {
                    selectedFilterVertical.from_obs_data = selectedFilterVertical.obs_start_date + " 00:00"
                }
            }
            if (selectedFilterVertical.obs_end_date !== null) {
                if (selectedFilterVertical.obs_end_time !== null) {
                    selectedFilterVertical.to_obs_data = selectedFilterVertical.obs_end_date +
                        " " +
                        selectedFilterVertical.obs_end_time;
                } else {
                    selectedFilterVertical.to_obs_data = selectedFilterVertical.obs_end_date + " 23:59"
                }
            }

            await axios.post(url, selectedFilterVertical, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${auth?.token?.access}`,
                },
            }).then((response) => {
                const resData = response?.data;
                setFilterReset(false);
                if (resData?.results?.data !== undefined) {
                    if (resData?.next) {
                        setNextPageUrl(response?.data?.next);
                    } else {
                        setNextPageUrl(null);
                    }
                    let records = resData?.results?.data;
                    let prevData;

                    if (observationListData?.list?.length > 0 && reset === false) {
                        prevData = [...observationListData?.list];
                        prevData = [...prevData, ...records];
                    } else {
                        prevData = resData?.results?.data;
                    }
                    setObservationListData((prev) => {
                        return {
                            ...prev,
                            list: prevData,
                        };
                    });
                    // Assign loading
                    setLoadedState((prev) => {
                        return {
                            ...prev,
                            loading: false,
                            hasData: resData?.results?.data?.length > 0
                        }
                    })

                } else {
                    setNextPageUrl(null);
                    setObservationListData({list: [], active: {}});
                }
            }).catch((error) => {
                process.env.NODE_ENV === "development" && console.log("Dashboard Error: ", error.message);
            });
        }
    };
    // For load more
    const handleLoadMoreData = () => {
        getObservationData(false).then(r => r);
    };
    // To Show/hide observation detail modal
    const handleObservationDetailModal = (id) => {
        setObservationDetailModal(!isObservationDetailModal);
        setSelectedObservationId(id);
    };
    // To Clear states for draft type observations
    const cleaningUpObservationDataForDraftSaving = (data) => {
        setObservationImages([]);
        setObservationData([]);
        updateStateForDraft(data);
        return true;
    };
    // To Append and Update data in context for draft observations
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
    // To Continue edit click event for draft type observations
    const handleObservationEdit = (data) => {
        cleaningUpObservationDataForDraftSaving(data).then((r) => r);
        setObservationDetailModal(false);
        setTimeout(function () {
            navigate("/observations/update");
        }, 100);
    };
    // To Show/Hide vertical filter on dashboard
    const handleFilterOpen = () => {
        setFilterShow(!filterShow);
    };
    // To Show/hide list view of observations
    const handleListView = () => {
        setListView(true);
        setGridView(false);
    };
    // To Show/hide grid view of observations
    const handleGridView = () => {
        setGridView(true);
        setListView(false);
    };
    // To Set state to search country for filter
    const findCountry = (e) => {
        let value = e.target.value.toLowerCase();
        setSearchCountry(value);
    };
    // To filter observation as per horizontal selection
    const handleFilterValue = (value, type) => {
        if (type === "status") {
            value = value.toLowerCase();
            getObservationData(
                true,
                selectedFilterHorizontal.country?.code,
                selectedFilterHorizontal.type,
                value
            ).then(r => r);
        }
        if (type === "category") {
            getObservationData(
                true,
                selectedFilterHorizontal.country?.code,
                value,
                selectedFilterHorizontal.status
            ).then(r => r);
        }
        if (type === "country") {
            getObservationData(
                true,
                value.code,
                selectedFilterHorizontal.type,
                selectedFilterHorizontal.status
            ).then(r => r);
        }
        if (shouldFilter && type === "filter") {
            getObservationData(
                true,
                selectedFilterHorizontal.country.code,
                selectedFilterHorizontal.type,
                selectedFilterHorizontal.status
            ).then(r => r);
        }
    };
    // To Set filter input data in state
    const handleFilterInput = (e, name) => {
        setSelectedFilterVertical((prev) => {
            return {
                ...prev,
                [name]: e.format(),
                filtered: true,
            }
        });
    };
    // To reset filters
    const resetFilters = () => {
        if (selectedFilterHorizontal.filtered || selectedFilterVertical.filtered) {
            setFilterReset(true);
            setSelectedFilterHorizontal(dashboardHelper.horizontal);
            setSelectedFilterVertical(dashboardHelper.vertical);
        }
    };

    useEffect(() => {
        getObservationData(true, "", "", "").then(r => r);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterReset]);

    useEffect(() => {
        setObservationListData((prev) => {
            return {
                ...prev,
                activeType: "",
                list: []
            }
        })
        getObservationData(true, "", "", "").then(r => r);

        if (window.innerWidth < 768) {
            setFilterShow(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        setShouldFilter(selectedFilterHorizontal?.filtered || selectedFilterVertical?.filtered);
    }, [selectedFilterHorizontal?.filtered, selectedFilterVertical?.filtered])

    return (
        <>
            <Suspense fallback={<div></div>}>
                <FilterSelectMenu
                    dashboardFilter={true}
                    galleryFilter={true}
                    filterShow={filterShow}
                    handleFilterOpen={handleFilterOpen}
                    handleListView={handleListView}
                    handleGridView={handleGridView}
                    listView={listView}
                    gridView={gridView}
                    isFilterOpen={isFilterOpen}
                    setIsFilterOpen={setIsFilterOpen}
                    selectedFilterHorizontal={selectedFilterHorizontal}
                    setSelectedFilterHorizontal={setSelectedFilterHorizontal}
                    searchCountry={searchCountry}
                    findCountry={findCountry}
                    handleFilterValue={handleFilterValue}
                />
            </Suspense>

            <div className="observation-dashboard_content">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="set-dash-content">
                                {filterShow && (
                                    <Suspense fallback={<div></div>}>
                                        <AdvancedFilter
                                            selectedFilterVertical={selectedFilterVertical}
                                            setSelectedFilterVertical={setSelectedFilterVertical}
                                            handleFilterValue={handleFilterValue}
                                            handleFilterOpen={handleFilterOpen}
                                            isFilterOpen={isFilterOpen}
                                            setIsFilterOpen={setIsFilterOpen}
                                            resetFilters={resetFilters}
                                            handleFilterInput={handleFilterInput}
                                        />
                                    </Suspense>
                                )}

                                <div
                                    className={`dashboard-card overflow-hidden ${filterShow ? "sm-card" : "maximize-dash-content"
                                    }`}
                                >
                                    {listView ? (
                                        <Suspense fallback={<div></div>}>
                                            <ObservationListView
                                                observationList={observationListData?.list}
                                                isObservationDetailModal={isObservationDetailModal}
                                                setObservationDetailModal={setObservationDetailModal}
                                                setSelectedObservationId={setSelectedObservationId}
                                            />
                                            {nextPageUrl && observationListData?.list?.length > 0 && (
                                                <LoadMore handleLoadMore={handleLoadMoreData}/>
                                            )}
                                        </Suspense>
                                    ) : (
                                        <Suspense fallback={<div></div>}>
                                            <ObservationDetailPage
                                                observationList={observationListData?.list}
                                                isObservationDetailModal={isObservationDetailModal}
                                                setObservationDetailModal={setObservationDetailModal}
                                                setSelectedObservationId={setSelectedObservationId}
                                            />
                                            {nextPageUrl && observationListData?.list?.length > 0 && (
                                                <LoadMore handleLoadMore={handleLoadMoreData}/>
                                            )}
                                        </Suspense>
                                    )}

                                    {loadedState?.loading &&
                                        <Loader fixContent={true}/>
                                    }

                                    {(!loadedState?.hasData && observationListData?.list?.length === 0 && !loadedState?.loading) &&
                                        <Suspense fallback={''}>
                                            <NotFound/>
                                        </Suspense>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Suspense fallback={<div></div>}>
                <ObservationDetails
                    data={observationListData?.active}
                    modalClass="observation-details_modal"
                    open={isObservationDetailModal}
                    handleClose={handleObservationDetailModal}
                    handleContinueEdit={handleObservationEdit}
                    activeType={
                        observationListData?.active?.is_verified
                            ? "verified"
                            : observationListData?.active?.is_reject
                                ? "denied"
                                : observationListData?.active?.is_submit
                                    ? "unverified"
                                    : "draft"
                    }
                    handleApproveRejectEvent={getObservationData}
                    handleSendBackEvent={getObservationData}
                    refreshData={getObservationData}
                />
            </Suspense>
        </>
    );
};

export default Dashboard;
