import "../../assets/scss/component/dashboard.scss";
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useObservationsData from "../../hooks/useObservationsData";

import useObservations from "../../hooks/useObservations";
import { LoadMore } from "../../components/Shared/LoadMore";

import axios from "../../api/axios";
import moment from "moment";
import { dashboardHelper } from "../../helpers/dashboard";
import { baseURL } from "../../helpers/url";
import Loader from "../../components/Shared/Loader";

import DatePicker, { DateObject } from "react-multi-date-picker"

const NotFound = lazy(() =>
    import("../../components/Common/NotFound")
);
const FilterSelectMenu = lazy(() =>
    import("../../components/Shared/FilterSelectMenu")
);
const AdvancedFilter = lazy(() =>
    import("../../components/Shared/AdvancedFilter")
);
const ObservationDetailPage = lazy(() =>
    import("../Observation/ObservationListPage")
);
const ObservationListView = lazy(() =>
    import("../Observation/ObservationListView")
);
const ObservationDetails = lazy(() =>
    import("../Observation/ObservationDetails")
);

const Dashboard = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [isObservationDetailModal, setObservationDetailModal] = useState(false);
    const [selectedObservationId, setSelectedObservationId] = useState();
    const { setObservationData, setObservationSteps, setObservationImages } = useObservations();
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
    const { observationListData, setObservationListData } = useObservationsData();
    const [nextPageUrl, setNextPageUrl] = useState(dashboardHelper.nextPageUrl);
    const [filterReset, setFilterReset] = useState(false);
    const [loadedState, setLoadedState] = useState({ loading: true, hasData: true });

    const [dtValue, setDTValue] = useState("");

    const getObservationData = async (
        reset = false,
        country = `${selectedFilterHorizontal?.country?.code}`,
        category = `${selectedFilterHorizontal?.type}`,
        status = `${selectedFilterHorizontal?.status}`
    ) => {
        setLoadedState({ loading: true })

        if (auth?.user?.is_superuser) {
            let url;
            if (reset === true || !nextPageUrl) {
                url = `${baseURL.api}/observation/dashboard/?country=${country}&category=${category}&status=${status}&page=1`;
            } else {
                url = process.env.NODE_ENV === "development" ? nextPageUrl : nextPageUrl.replace('http', 'https');

            }

            if (selectedFilterVertical.obs_start_date !== null) {
                if (selectedFilterVertical.obs_start_time !== null) {
                    selectedFilterVertical.from_obs_data = moment(
                        selectedFilterVertical.obs_start_date +
                        " " +
                        selectedFilterVertical.obs_start_time
                    ).format("DD/MM/Y H:mm");
                } else {
                    selectedFilterVertical.from_obs_data = moment(
                        selectedFilterVertical.obs_start_date + " 00:00"
                    ).format("DD/MM/Y HH:mm");
                }
            }
            if (selectedFilterVertical.obs_end_date !== null) {
                if (selectedFilterVertical.obs_end_time !== null) {
                    selectedFilterVertical.to_obs_data = moment(
                        selectedFilterVertical.obs_end_date +
                        " " +
                        selectedFilterVertical.obs_end_time
                    ).format("DD/MM/Y HH:mm");
                } else {
                    selectedFilterVertical.to_obs_data = moment(
                        selectedFilterVertical.obs_end_date + " 23:59"
                    ).format("DD/MM/Y HH:mm");
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
                    setObservationListData({ list: [], active: {} });
                }
                // setObservationList(success?.data?.results?.data)
            }).catch((error) => {
                console.log(error.response);
            });
        }
    };

    const handleLoadMoreData = () => {
        getObservationData(false).then(r => r);
    };

    const handleObservationDetailModal = (id) => {
        setObservationDetailModal(!isObservationDetailModal);
        setSelectedObservationId(id);
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

    const handleObservationEdit = (data) => {
        cleaningUpObservationDataForDraftSaving(data).then((r) => r);
        setObservationDetailModal(false);
        setTimeout(function () {
            navigate("/observations/update");
        }, 100);
    };
    const handleFilterOpen = () => {
        setFilterShow(!filterShow);
    };
    const handleListView = () => {
        setListView(true);
        setGridView(false);
    };
    const handleGridView = () => {
        setGridView(true);
        setListView(false);
    };
    const findCountry = (e) => {
        let value = e.target.value.toLowerCase();
        setSearchCountry(value);
    };

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
        if (type === "filter") {
            getObservationData(
                true,
                selectedFilterHorizontal.country.code,
                selectedFilterHorizontal.type,
                selectedFilterHorizontal.status
            ).then(r => r);
        }
    };

    //  Handle Filtered Input
    const handleFilterInput = (e) => {

        console.log(e);
        let name = e.target.name,
            value = e.target.value;

        console.log(name, value);
        setSelectedFilterVertical({
            ...selectedFilterVertical,
            [name]: value,
        });
    };

    //  Reset Filters
    const resetFilters = () => {
        const { country: { name, code }, type, status } = selectedFilterHorizontal;
        if (name !== "" || code !== "" || type !== "" || status !== "") {
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
        console.clear();
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
                                    {
                                        (!loadedState.loading && observationListData?.list.length > 0 && !filterReset) ?
                                            listView ? (
                                                <Suspense fallback={<Loader fixContent={true} />}>
                                                    <ObservationListView
                                                        observationList={observationListData?.list}
                                                        isObservationDetailModal={isObservationDetailModal}
                                                        setObservationDetailModal={setObservationDetailModal}
                                                        setSelectedObservationId={setSelectedObservationId}
                                                    />
                                                    {nextPageUrl && observationListData?.list.length > 0 && (
                                                        <LoadMore handleLoadMore={handleLoadMoreData} />
                                                    )}
                                                </Suspense>
                                            ) :
                                                (
                                                    <Suspense fallback={<div></div>}>
                                                        <ObservationDetailPage
                                                            observationList={observationListData?.list}
                                                            isObservationDetailModal={isObservationDetailModal}
                                                            setObservationDetailModal={setObservationDetailModal}
                                                            setSelectedObservationId={setSelectedObservationId}
                                                        />

                                                        {(!loadedState.loading && nextPageUrl && observationListData?.list.length > 0) && (
                                                            <LoadMore handleLoadMore={handleLoadMoreData} />
                                                        )}
                                                    </Suspense>
                                                )
                                            : (loadedState.loading || filterReset) && <Loader loaderClass="h-50 position-relative" />
                                    }

                                    {(!loadedState?.hasData && observationListData?.list.length === 0 && !loadedState.loading) &&
                                        <Suspense fallback={''}>
                                            <NotFound />
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
                    refreshData={getObservationData}
                />
            </Suspense>
        </>
    );
};

export default Dashboard;
