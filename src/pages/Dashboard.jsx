import "../assets/scss/component/dashboard.scss";
import axios from './../api/axios';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import useObservationsData from '../hooks/useObservationsData';
import FilterSelectMenu from "../components/Shared/FilterSelectMenu";
import ObservationDetailPage from "./Observation/ObservationDetailPage";
import ObservationDetails from "./Observation/ObservationDetails";
import useObservations from '../hooks/useObservations';
import AdvancedFilter from '../components/Shared/AdvancedFilter';
import ObservationListView from './Observation/ObservationListView';
import { LoadMore } from '../components/Shared/LoadMore';
import Images from './../static/images';
import {dashboardHelper} from "../helpers/dashboard";
import { baseURL } from "../helpers/url";



const Dashboard = () =>{
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [isObservationDetailModal, setObservationDetailModal] = useState(false);
    const [selectedObservationId,setSelectedObservationId] = useState();
    const { setObservationData, setObservationSteps, setObservationImages } = useObservations();
    const [ filterShow, setFilterShow ] = useState(true);
    const [ listView, setListView ] = useState(false);
    const [ gridView, setGridView ] = useState(true);

    const [searchCountry, setSearchCountry] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(dashboardHelper.filterState)
    const [selectedFilterHorizontal,setSelectedFilterHorizontal] = useState(dashboardHelper.horizontal)
    const [selectedFilterVertical,setSelectedFilterVertical] = useState(dashboardHelper.vertical)
    const [isLoaded,setIsLoaded] = useState(false);
    const { observationListData, setObservationListData } = useObservationsData();
    const [nextPageUrl,setNextPageUrl] = useState(dashboardHelper.nextPageUrl);



    const [filterReset, setFilterReset] = useState(false);


    const getObservationData = (
            reset=false,
            country=`${selectedFilterHorizontal?.country?.code}`,
            category=`${selectedFilterHorizontal?.type}`,
            status=`${selectedFilterHorizontal?.status}`
        ) => {
        if (auth?.user?.is_superuser) {
            let url;
            if(reset === true || !nextPageUrl){
                url = `${baseURL.api}/observation/dashboard/?country=${country}&category=${category}&status=${status}&page=1`;
            }else{
                url = nextPageUrl;
            }

            if(selectedFilterVertical.obs_start_date !== null){
                if(selectedFilterVertical.obs_start_time !== null){
                    selectedFilterVertical.from_obs_data = moment(selectedFilterVertical.obs_start_date + ' ' + selectedFilterVertical.obs_start_time).format('Y/MM/DD H:mm');
                }else{
                    selectedFilterVertical.from_obs_data = moment(selectedFilterVertical.obs_start_date + ' ' + '00:00').format('Y/MM/DD HH:mm');
                }
            }
            if(selectedFilterVertical.obs_end_date !== null){
                if(selectedFilterVertical.obs_end_time !== null){
                    selectedFilterVertical.to_obs_data = moment(selectedFilterVertical.obs_end_date + ' ' + selectedFilterVertical.obs_end_time).format('Y/MM/DD HH:mm');
                }else{
                    selectedFilterVertical.to_obs_data = moment(selectedFilterVertical.obs_end_date + ' ' + '23:59').format('Y/MM/DD HH:mm');
                }
            }

            axios.post(url,selectedFilterVertical,{
                headers:{
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${auth?.token?.access}`
                },

            }).then((success)=>{
                setFilterReset(false);
                if(success?.data?.results?.data !== undefined){
                    if(success?.data?.next){
                      setNextPageUrl(success?.data?.next);
                    }else{
                      setNextPageUrl(null);
                    }
                    let records = success?.data?.results?.data;
                    let prevData;

                    if(observationListData?.list?.length > 0 && reset === false){
                      prevData = [...observationListData?.list];
                      prevData = [...prevData,...records];
                    }else{
                      prevData = success?.data?.results?.data;
                    }
                    setObservationListData((prev) => {
                        return {
                          ...prev,
                          list: prevData,
                        }
                      })
                    setIsLoaded(true);
                  }
                  else{
                    setNextPageUrl(null);
                    setObservationListData({list:[],active:{}})
                  }
                // setObservationList(success?.data?.results?.data)
            }).catch((error)=>{
                console.log(error.response);
            })
        }
    }

    const handleLoadMoreData = () => {
        getObservationData(false);
    }

    const handleObservationDetailModal = (id) => {
        setObservationDetailModal(!isObservationDetailModal);
        setSelectedObservationId(id);
    };
    const cleaningUpObservationDataForDraftSaving = async (data) => {
        setObservationImages([]);
        setObservationData([]);
        await updateStateForDraft(data)
        return true;
    }
    const updateStateForDraft = (data) => {
        setObservationSteps(prev => {
            return {
            ...prev,
            total: 3,
            active: 1,
            mode: {
                update: true,
                ...data
            }
        }
        });
    }

    const handleObservationEdit = (data) => {
        cleaningUpObservationDataForDraftSaving(data).then(r => r);
        setObservationDetailModal(false);
        setTimeout(function () {
            navigate('/observations/update');
        }, 100)
    }
    const handleFilterOpen = () => {
        setFilterShow(!filterShow)
    }
    const handleListView = () =>{
        setListView(true)
        setGridView(false)
    }
    const handleGridView = () =>{
        setGridView(true)
        setListView(false)
    }
    const findCountry = (e) => {
        let value = e.target.value.toLowerCase();
        setSearchCountry(value);
    }

    const handleFilterValue = (value,type) => {
        if(type === 'status'){
            value = value.toLowerCase();
          getObservationData(true,selectedFilterHorizontal.country?.code,selectedFilterHorizontal.type,value);
        }
    
        if(type === 'category') {
          getObservationData(true,selectedFilterHorizontal.country?.code,value,selectedFilterHorizontal.status);
        }
    
        if(type === 'country'){
          getObservationData(true,value.code,selectedFilterHorizontal.type,selectedFilterHorizontal.status);
        }  
        if(type === 'filter'){
            getObservationData(true,selectedFilterHorizontal.country.code,selectedFilterHorizontal.type,selectedFilterHorizontal.status);
        } 
      }

    console.log('setIsLoaded', isLoaded)

    //  Handle Filtered Input
    const handleFilterInput = (e) => {
        let name = e.target.name,
            value= e.target.value;

        console.log(name, value);
        setSelectedFilterVertical({
            ...selectedFilterVertical,
            [name]: value
        })
    }

    //  Reset Filters
    const resetFilters = () => {
        setFilterReset(true);
        setSelectedFilterHorizontal(dashboardHelper.horizontal);
        setSelectedFilterVertical(dashboardHelper.vertical);
        getObservationData(false);
    }

    useEffect(()=>{
        getObservationData(true);
    },[filterReset]);

    useEffect(()=>{
        getObservationData(true);
    },[]);

    useEffect(() => {
        setObservationListData((prev) => {
            return {
                ...prev,
                active: observationListData?.list?.[selectedObservationId]
            }
        })

    }, [isObservationDetailModal]);

    return (
        <>
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
            <div className='observation-dashboard_content'>
                <div className="container">
                    <div className='row'>
                        <div className="col-sm-12">
                            <div className="set-dash-content">
                                {filterShow &&
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
                                }

                                <div className={`dashboard-card overflow-hidden ${filterShow ? 'sm-card' : 'maximize-dash-content'}`}>
                                    {observationListData?.list?.length > 0 ? (
                                        listView ? (
                                            <ObservationListView
                                                observationList={observationListData?.list}
                                                isObservationDetailModal={isObservationDetailModal}
                                                setObservationDetailModal={setObservationDetailModal}
                                                setSelectedObservationId={setSelectedObservationId}
                                            />
                                        ) : (
                                            <ObservationDetailPage
                                                observationList={observationListData?.list}
                                                isObservationDetailModal={isObservationDetailModal}
                                                setObservationDetailModal={setObservationDetailModal}
                                                setSelectedObservationId={setSelectedObservationId}
                                            />
                                        )
                                    ) : (
                                        <div className="data-not-found">
                                            <img src={Images.NoDataFound} alt="No data found" className="mb-3"/>
                                            <p><b className="text-secondary fw-bold">Opps!</b> No Data Found</p>
                                        </div>
                                    )}


                                    {nextPageUrl &&
                                        <LoadMore handleLoadMore={handleLoadMoreData} />
                                    }

                                </div>

                                <ObservationDetails
                                    data={observationListData?.active}
                                    modalClass="observation-details_modal"
                                    open={isObservationDetailModal}
                                    handleClose={handleObservationDetailModal}
                                    handleContinueEdit={handleObservationEdit}
                                    activeType={(observationListData?.active?.is_verified) ? 'verified' : (observationListData?.active?.is_reject) ? 'denied' : (observationListData?.active?.is_submit) ? 'unverified' : 'draft'}
                                    handleApproveRejectEvent={getObservationData}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;