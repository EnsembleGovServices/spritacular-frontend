import "../assets/scss/component/myObservation.scss";
import "../assets/scss/component/gallery.scss";
import {lazy, Suspense, useEffect, useState} from "react";
import {Container, UncontrolledAlert} from "reactstrap";
import {Link} from "react-router-dom";

import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import {baseURL, routeUrls} from "../helpers/url";
import Images from "./../static/images";
import {LoadMore} from "../components/Shared/LoadMore";
import useObservationsData from "../hooks/useObservationsData";

const ObservationDetails = lazy(() =>
    import("./Observation/ObservationDetails")
);
const FilterSelectMenu = lazy(() =>
    import("../components/Shared/FilterSelectMenu")
);
const ObservationDetailPage = lazy(() =>
    import("./Observation/ObservationListPage")
);

const Gallery = () => {
    const [isObservationDetailModal, setObservationDetailModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);
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
    const {auth} = useAuth();
    const [loadMore, setLoadMore] = useState(10);
    const [pageSize, setPageSize] = useState(10);
    const [nextPageUrl, setNextPageUrl] = useState(
        `${baseURL.api}/observation/gallery/?country=&category=&status=`
    );
    const normalUser = auth?.user?.is_user;
    useEffect(() => {
        setLoadMore(pageSize);
        getObservationType(
            true,
            "",
            selectedFilterHorizontal.type,
            selectedFilterHorizontal.status
        );
        setIsLoaded(false);
    }, [isLoaded]);

    const findCountry = (e) => {
        let value = e.target.value.toLowerCase();
        setSearchCountry(value);
    };

    useEffect(() => {
        if (isFilterOpen.isCountryOpen === false) {
            setSearchCountry("");
        }
    }, [isFilterOpen.isCountryOpen]);

    useEffect(() => {
        setObservationListData((prev) => {
            return {
                ...prev,
                active: observationListData?.list?.[selectedObservationId],
            };
        });
    }, [isObservationDetailModal]);

    const handleLoadMoreData = () => {
        getObservationType(
            false,
            selectedFilterHorizontal.country?.code,
            selectedFilterHorizontal.type,
            selectedFilterHorizontal.status
        );
    };
    const getObservationType = (
        reset = false,
        country = `${selectedFilterHorizontal.country?.code}`,
        category = `${selectedFilterHorizontal.type}`,
        status = `${selectedFilterHorizontal.status}`
    ) => {
        let url;
        if (reset === true || !nextPageUrl) {
            url = `${baseURL.api}/observation/gallery/?country=${country}&category=${category}&status=${status}&page=1`;
        } else {
            url = process.env.NODE_ENV === "development" ? nextPageUrl : nextPageUrl.replace('http', 'https');
        }

        const headers = {};
        headers["Content-Type"] = "application/json";
        if (auth.user) {
            headers["Authorization"] = `Bearer ${auth?.token?.access}`;
        }
        axios
            .get(url, {
                headers: headers,
            })
            .then((success) => {
                if (success?.data?.results?.data !== undefined) {
                    if (success?.data?.next) {
                        setNextPageUrl(success?.data?.next);
                    } else {
                        setNextPageUrl(null);
                    }
                    let records = success?.data?.results?.data;
                    let prevData;

                    if (observationListData?.list?.length > 0 && reset === false) {
                        prevData = [...observationListData?.list];
                        prevData = [...prevData, ...records];
                    } else {
                        prevData = success?.data?.results?.data;
                    }
                    setObservationListData((prev) => {
                        return {
                            ...prev,
                            list: prevData,
                        };
                    });
                    setIsLoaded(false);
                } else {
                    setNextPageUrl(null);
                    setObservationListData({list: [], active: {}});
                }
            })
            .catch((error) => {
                console.log(error.response);
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
            );
        } else if (type === "category") {
            getObservationType(
                true,
                selectedFilterHorizontal.country?.code,
                value,
                selectedFilterHorizontal.status
            );
        } else if (type === "country") {
            getObservationType(
                true,
                value.code,
                selectedFilterHorizontal.type,
                selectedFilterHorizontal.status
            );
        }
    };


    useEffect(() => {
        setObservationListData((prev) => {
            return {
                ...prev,
                activeType: "",
                list: []
            }
        })
        getObservationType(true, "", "", "");
    }, [])

    return (
        <>
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
                />
            </Suspense>

            <Container className="pt-5">
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
                {observationListData?.list && (
                    <div className="gallery-page">
                        <h4 className="text-black fw-bold">Recent Observations</h4>
                        <div>
                            {observationListData?.list.length > 0 ? (
                                <Suspense fallback={<div></div>}>
                                    <ObservationDetailPage
                                        observationList={observationListData?.list}
                                        isObservationDetailModal={isObservationDetailModal}
                                        setObservationDetailModal={setObservationDetailModal}
                                        setSelectedObservationId={setSelectedObservationId}
                                    />
                                    {nextPageUrl && <LoadMore handleLoadMore={handleLoadMoreData}/>}
                                </Suspense>
                            ) : (
                                <div className="data-not-found">
                                    <img
                                        src={Images.NoDataFound}
                                        alt="No data found"
                                        className="mb-3"
                                    />
                                    <p>
                                        <b className="text-secondary fw-bold">Opps!</b> No Data
                                        Found
                                    </p>
                                </div>
                            )}
                        </div>


                        <ObservationDetails
                            data={observationListData?.active}
                            activeType={
                                observationListData?.active?.is_verified
                                    ? "verified"
                                    : observationListData?.active?.is_reject
                                        ? "denied"
                                        : observationListData?.active?.is_submit
                                            ? "unverified"
                                            : "draft"
                            }
                            modalClass="observation-details_modal"
                            open={isObservationDetailModal}
                            handleClose={handleObservationDetailModal}
                            handleApproveRejectEvent={getObservationType}
                            refreshData={getObservationType}
                        />
                    </div>
                )}
            </Container>
        </>
    );
};
export default Gallery;
