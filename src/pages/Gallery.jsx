import "../assets/scss/component/myObservation.scss";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import {baseURL,routeUrls} from "../helpers/url";
import ObservationDetails from './Observation/ObservationDetails';
import Images from './../static/images';
import ObservationDetailPage from "./Observation/ObservationDetailPage";
import { LoadMore } from '../components/Shared/LoadMore';
import "../assets/scss/component/gallery.scss";
import FilterSelectMenu from "../components/Shared/FilterSelectMenu";
import { Container, UncontrolledAlert } from 'reactstrap';
import {Link} from 'react-router-dom';
import useObservationsData from "../hooks/useObservationsData";



const Gallery = () => {
  const [isObservationDetailModal, setObservationDetailModal] = useState(false);
  const [isLoaded,setIsLoaded] = useState(true);
  const [selectedObservationId,setSelectedObservationId] = useState();
  const [searchCountry, setSearchCountry] = useState("");
  const [isFilterOpen,setIsFilterOpen] = useState({
    isCountryOpen:false,
    isTypeOpen:false,
    isStatusOpen:false
  })
  const [selectedFilters,setSelectedFilters] = useState({
    country:{name:'',code:''},
    type:'',
    status:''
  })

  const { observationListData, setObservationListData } = useObservationsData();

  const { auth } = useAuth();
  const [loadMore,setLoadMore] = useState(10);
  const [pageSize,setPageSize] = useState(10);
  const [nextPageUrl,setNextPageUrl] = useState('/observation/gallery/?country=&category=&status=');
  const user = auth?.user;
  useEffect(() => {
    setLoadMore(pageSize);
    getObservationType(true,'',selectedFilters.type,selectedFilters.status);
    setIsLoaded(false);
  },[isLoaded]);

  const findCountry = (e) => {
    let value = e.target.value.toLowerCase();
    setSearchCountry(value);
}

useEffect(()=> {
  if (isFilterOpen.isCountryOpen === false) {
      setSearchCountry("");
  }
}, [isFilterOpen.isCountryOpen])

useEffect(() => {
  setObservationListData((prev) => {
    return {
      ...prev,
      active: observationListData?.list?.[selectedObservationId]
    }
  })

}, [isObservationDetailModal]);

  const handleLoadMoreData = () => {
        getObservationType(false,selectedFilters.country?.code,selectedFilters.type,selectedFilters.status);
  }
  const getObservationType = (reset=false,country=`${selectedFilters.country?.code}`,category=`${selectedFilters.type}`,status=`${selectedFilters.status}`) => {
    let url;
    if(reset === true || !nextPageUrl){
      url = '/observation/gallery/?country='+country+'&category='+category+'&status='+status+'&page=1';
    }else{
      url = nextPageUrl;
    }
    const headers = {};
    headers['Content-Type'] = 'application/json';
    if(auth.user){
      headers['Authorization'] = `Bearer ${auth?.token?.access}`;
    }
    axios.get(baseURL.api+url,{
      headers: headers,
      
  }).then((success) => {
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
        // if(!auth.user){
        //   const varifiedData = success?.data?.results?.data?.filter((item) => (item.is_verified === true && item.is_reject === false));
        //   setObservationListData((prev) => {
        //     return {
        //       ...prev,
        //       list: varifiedData,
        //     }
        //   })
        // }
      setIsLoaded(false);
    }
    else{
      setNextPageUrl(null);
      setObservationListData({list:[],active:{}})
    }
  }).catch((error) => {
      console.log(error.response);
  })
  }
  const handleObservationDetailModal = (id) => {
    setObservationDetailModal(!isObservationDetailModal);
    setSelectedObservationId(id);
  };

  const handleFilterValue = (value,type) => {
    setObservationListData([])
    setLoadMore(pageSize);
    if(type === 'status'){
      value = value.toLowerCase();
      getObservationType(true,selectedFilters.country?.code,selectedFilters.type,value);
    }

    else if(type === 'category') {
      getObservationType(true,selectedFilters.country?.code,value,selectedFilters.status);
    }

    else if(type === 'country'){
      getObservationType(true,value.code,selectedFilters.type,selectedFilters.status);
    }
  }
  return(
    <>
      { user &&
        <FilterSelectMenu galleryFilter={true} isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} selectedFilters={selectedFilters}setSelectedFilters={setSelectedFilters}  searchCountry={searchCountry} findCountry={findCountry} handleFilterValue={handleFilterValue}/>
      }

      <Container className="pt-5">
        <UncontrolledAlert color="danger" data-dismiss="alert" dismissible="true" className="text-center mb-5">
          Would you like to help us sift through observations and endorse their validity?
          <Link to={'/'+routeUrls.tutorials} className="btn btn-outline-primary">Get Trained</Link>
        </UncontrolledAlert>
        {observationListData?.list &&
            <div className='gallery-page'>
              <h4 className='text-black fw-bold'>Recent Observations</h4>
              <div>
                {observationListData?.list.length > 0 ? (
                    <ObservationDetailPage
                        observationList={observationListData?.list}
                        isObservationDetailModal={isObservationDetailModal}
                        setObservationDetailModal={setObservationDetailModal}
                        setSelectedObservationId={setSelectedObservationId}
                    />
                ) : (
                    <div className="data-not-found">
                      <img src={Images.NoDataFound} alt="No data found" className="mb-3"/>
                      <p><b className="text-secondary fw-bold">Opps!</b> No Data Found</p>
                    </div>
                )}
              </div>
              {nextPageUrl &&
                  <LoadMore handleLoadMore={handleLoadMoreData} />
              }
              <ObservationDetails
                  data={observationListData?.active}
                  activeType={(observationListData?.active?.is_verified) ? 'verified' : (observationListData?.active?.is_reject) ? 'denied' : (observationListData?.active?.is_submit) ? 'unverified' : 'draft'}
                  modalClass="observation-details_modal"
                  open={isObservationDetailModal}
                  handleClose={handleObservationDetailModal}
                  handleApproveRejectEvent={getObservationType}
              />

            </div>
        }
      </Container>

    </>
  )
}
export default Gallery;