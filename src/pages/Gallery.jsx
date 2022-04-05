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

  const { observationGalleryData, setObservationGalleryData } = useObservationsData();

  const [currentObservationList,setCurrentObservationList] = useState({});
  const { auth } = useAuth();
  const [loadMore,setLoadMore] = useState(10);
  const [pageSize,setPageSize] = useState(10);
  const [nextPageUrl,setNextPageUrl] = useState('/observation/gallery/?country=&categpry=&status=');
  useEffect(() => {
    setLoadMore(pageSize);
    getObservationType('',selectedFilters.type,selectedFilters.status,true);
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
  // let watched = !currentObservationList[selectedObservationId]?.like_watch_count_data?.is_watch;
  // if (isObservationDetailModal && watched) {
  //   handleWatchCounter(observationListData?.list[selectedObservationId].id).then(r => r)
  // }

  setObservationGalleryData((prev) => {
    return {
      ...prev,
      active: observationGalleryData?.list?.[selectedObservationId]
    }
  })

}, [isObservationDetailModal]);

  const handleLoadMoreData = () => {
        getObservationType(selectedFilters.country?.code,selectedFilters.type,selectedFilters.status,false);
  }
  const getObservationType = (country,category,status,reset=false) => {
    var url;
    if(reset === true || !nextPageUrl){
      url = '/observation/gallery/?country='+country+'&category='+category+'&status='+status+'&page=1';
    }else{
      url = nextPageUrl;
    }
    axios.get(baseURL.api+url,{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.token?.access}`,
      },
      
  }).then((success) => {
    if(success?.data?.results?.data != undefined){
      if(success?.data?.next){
        setNextPageUrl(success?.data?.next.split('api')[1]);
      }else{
        setNextPageUrl(null);
      }
      let records = success?.data?.results?.data;
      let prevData;
      
      if(observationGalleryData?.list?.length > 0 && reset == false){
        prevData = [...observationGalleryData?.list];
        prevData = [...prevData,...records];
      }else{
        prevData = success?.data?.results?.data;
      }
      setObservationGalleryData({list:prevData});
        if(!auth.user){
          const varifiedData = success?.data?.results?.data?.filter((item) => (item.is_verified === true && item.is_reject === false));
          setObservationGalleryData({list:varifiedData});
        }
      setIsLoaded(false);
    }
    else{
      setNextPageUrl(null);
      setObservationGalleryData({list:[]})
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
    setObservationGalleryData([])
    setLoadMore(pageSize);
    if(type == 'status'){
      value = value.toLowerCase();
      getObservationType(selectedFilters.country?.code,selectedFilters.type,value,true);
    }

    else if(type === 'category') {
      getObservationType(selectedFilters.country?.code,value,selectedFilters.status,true);
    }

    else if(type === 'country'){
      getObservationType(value.code,selectedFilters.type,selectedFilters.status,true);
    }
  }
  return(
    <>

     {auth.user &&
     <FilterSelectMenu galleryFilter={true} isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} selectedFilters={selectedFilters}setSelectedFilters={setSelectedFilters}  searchCountry={searchCountry} findCountry={findCountry} handleFilterValue={handleFilterValue}/>
}
<Container>
            <UncontrolledAlert color="danger" data-dismiss="alert" dismissible="true" className="text-center">
              Would you like to help us sift through observations and endorse their validity?
              <Link to={'/'+routeUrls.tutorials} className="btn btn-outline-primary">Get Trained</Link>
            </UncontrolledAlert>
          </Container>
        <div className='gallery-page'>
          <h4 className='text-black fw-bold'>Recent Observations</h4>
          <div>
            {observationGalleryData?.list?.length ===  0 &&
              <div className="data-not-found">
                <img src={Images.NoDataFound} alt="No data found" className="mb-3"/>
                <p><b className="text-secondary fw-bold">Opps!</b> No Data Found</p>
              </div>
            }
            <ObservationDetailPage observationList={observationGalleryData?.list} isObservationDetailModal={isObservationDetailModal} setObservationDetailModal={setObservationDetailModal} setSelectedObservationId={setSelectedObservationId} />
          </div>
          {nextPageUrl &&
            <LoadMore handlLoadMore={handleLoadMoreData} /> 
           }
          {isObservationDetailModal && <ObservationDetails 
          data={observationGalleryData?.active}  
          activeType={''} 
          modalClass="observation-details_modal" 
          open={isObservationDetailModal} 
          handleClose={handleObservationDetailModal} />}
        </div>
        </>
  )
}
export default Gallery;