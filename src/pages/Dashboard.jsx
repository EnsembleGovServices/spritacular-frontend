import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from "reactstrap";
import FilterSelectMenu from "../components/Shared/FilterSelectMenu";
import axios from './../api/axios';
import { baseURL } from "../helpers/url";
import useAuth from "../hooks/useAuth";
import { useState } from 'react';
import ObservationDetailPage from "./Observation/ObservationDetailPage";
import ObservationDetails from "./Observation/ObservationDetails";
import useObservations from '../hooks/useObservations';
import AdvancedFilter from '../components/Shared/AdvancedFilter';
import "../assets/scss/component/dashboard.scss";
import ObservationListView from './Observation/ObservationListView';
import { LoadMore } from '../components/Shared/LoadMore';
import useObservationsData from '../hooks/useObservationsData';
import Images from './../static/images';


const Dashboard = () =>{
    const { auth } = useAuth();
    const [isObservationDetailModal, setObservationDetailModal] = useState(false);
    const [selectedObservationId,setSelectedObservationId] = useState();
    const { setObservationData, setObservationSteps, setObservationImages } = useObservations();
    const navigate = useNavigate();
    const [filterShow, setFilterShow] = useState(true);
    const [ listView, setListView ] = useState(false);
    const [ gridView, setGridView ] = useState(true);

    const [searchCountry, setSearchCountry] = useState("");
    const [isFilterOpen,setIsFilterOpen] = useState({
      isCountryOpen:false,
      isTypeOpen:false,
      isStatusOpen:false,
      isRateOpen:false,
      isFOVOpen:false,
      isLensTypeOpen:false,

    })

    const [selectedFilterHorizontal,setSelectedFilterHorizontal] = useState({
        country:{name:'',code:''},
        type:'',
        status:'',
    })
    const [selectedFilters,setSelectedFilters] = useState({
      from_obs_data: null,
      to_obs_data: null,
      obs_start_time: null,
      obs_end_time: null,
      camera_type:'',
      fps: '',
      iso:'',
      fov:'',
      shutter_speed:'',
      lens_type:'',
    })
    const [isLoaded,setIsLoaded] = useState(true);


    const { observationListData, setObservationListData } = useObservationsData();
    const [nextPageUrl,setNextPageUrl] = useState('/observation/dashboard/?country=&category=&status=');


    const getObservationData = (reset=false,country=`${selectedFilterHorizontal.country?.code}`,category=`${selectedFilterHorizontal.type}`,status=`${selectedFilterHorizontal.status}`) => {
        if (auth?.user?.is_superuser) {
            let url;
            if(reset === true || !nextPageUrl){
            url = '/observation/dashboard/?country='+country+'&category='+category+'&status='+status+'&page=1';
            }else{
            url = nextPageUrl;
            }
           
            axios.post(baseURL.api+url,selectedFilters,{
                headers:{
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${auth?.token?.access}`
                },

            }).then((success)=>{
                if(success?.data?.results?.data !== undefined){
                    if(success?.data?.next){
                      setNextPageUrl(success?.data?.next.split('api')[1]);
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
                    setIsLoaded(false);
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
        return true;
    }
    useEffect(()=>{
        getObservationData(true);
    },[]);

    const handleLoadMoreData = () => {
        getObservationData(false);
  }
  
    const handleObservationDetailModal = (id) => {
        setObservationDetailModal(!isObservationDetailModal);
        setSelectedObservationId(id);
    };

    useEffect(() => {
        setObservationListData((prev) => {
          return {
            ...prev,
            active: observationListData?.list?.[selectedObservationId]
          }
        })
      
      }, [isObservationDetailModal]);

    useEffect(()=> {
        if (isObservationDetailModal) {
            document.body.classList.add('overflow-hidden');
        }
        else{
            document.body.classList.remove('overflow-hidden');
        }
    }, [isObservationDetailModal]);

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
                <Container>
                    <div className='d-flex'>
                        {filterShow && 
                            <AdvancedFilter
                                selectedFilters={selectedFilters}
                                setSelectedFilters={setSelectedFilters}
                                handleFilterValue={handleFilterValue}
                                handleFilterOpen={handleFilterOpen}
                                isFilterOpen={isFilterOpen} 
                                setIsFilterOpen={setIsFilterOpen}
                            />
                        }
                        
                        <div className={`dashboard-card overflow-hidden ${filterShow ? 'sm-card' : ''}`}>

                            {listView && observationListData?.list?.length > 0 && <ObservationListView 
                                observationList={observationListData?.list} 
                                isObservationDetailModal={isObservationDetailModal} 
                                setObservationDetailModal={setObservationDetailModal} 
                                setSelectedObservationId={setSelectedObservationId}
                            />}
                            {observationListData?.list?.length > 0 && gridView &&
                                <ObservationDetailPage 
                                    observationList={observationListData?.list}
                                    isObservationDetailModal={isObservationDetailModal}
                                    setObservationDetailModal={setObservationDetailModal} 
                                    setSelectedObservationId={setSelectedObservationId}
                                />
                            }
                            {nextPageUrl &&
                                <LoadMore handleLoadMore={handleLoadMoreData} />
                            }
                            {observationListData?.list?.length === 0 &&  (
                                  <div className="data-not-found">
                                  <img src={Images.NoDataFound} alt="No data found" className="mb-3"/>
                                  <p><b className="text-secondary fw-bold">Opps!</b> No Data Found</p>
                                </div>
                            )
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
                </Container>
            </div>
        </>
    )
}

export default Dashboard;