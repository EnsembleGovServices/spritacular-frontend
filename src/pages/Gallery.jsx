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
import { Col, Container, Row, UncontrolledAlert } from 'reactstrap';
import {Link, useNavigate} from 'react-router-dom';



const Gallery = () => {
  const [isObservationDetailModal, setObservationDetailModal] = useState(false);
  const [observationList,setObservationList] = useState([]);
  const [isLoaded,setIsLoaded] = useState(true);
  const [selectedObservationId,setSelectedObservationId] = useState();
  const [galleryCardToShow, setGalleryCardToShow] = useState([]);
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

  const [currentObservationList,setCurrentObservationList] = useState({});
  const { auth } = useAuth();
  const [loadMore,setLoadMore] = useState(10);
  const [pageSize,setPageSize] = useState(10);
  const [nextPageUrl,setNextPageUrl] = useState('/observation/gallery/?country=&categpry=&status=');

  useEffect(() => {
    setLoadMore(pageSize);
    getObservationType('',selectedFilters.type,selectedFilters.status,true);
  },[isLoaded]);
  // console.log(nextPageUrl);

  const findCountry = (e) => {
    let value = e.target.value.toLowerCase();
    setSearchCountry(value);
}

useEffect(()=> {
  if (isFilterOpen.isCountryOpen === false) {
      setSearchCountry("");
  }
}, [isFilterOpen.isCountryOpen])

  const handleLoadMoreData = () => {
    // console.log(nextPageUrl.split('api'));
        getObservationType(selectedFilters.country?.code,selectedFilters.type,selectedFilters.status,false);
    // let value = loadMore + pageSize;
    // if(currentObservationList.length > 0){

    //   let length;
    //   if(value > currentObservationList.length){
    //     length = currentObservationList.length;
    //   }
    //   else{
    //     length = value;
    //   }
    //   setLoadMore(length);
    //   let currentData = currentObservationList.slice(loadMore,length);
    //   setGalleryCardToShow([...galleryCardToShow,...currentData]);
    // }
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
    if(success?.data?.results != undefined){
      if(success?.data?.next){
        setNextPageUrl(success?.data?.next.split('api')[1]);
      }else{
        setNextPageUrl(null);
      }
      setObservationList(success?.data?.results);
      let data = success?.data?.results?.slice(0,pageSize);
      setCurrentObservationList(success?.data?.results);
      setGalleryCardToShow(data);
        if(!auth.user){
          const varifiedData = success?.data?.results?.filter((item) => (item.is_verified === true && item.is_reject === false));
          setObservationList(varifiedData);
        }
      setIsLoaded(false);
    }
    else{
      setObservationList([])
      setGalleryCardToShow([])
    }
  }).catch((error) => {
      console.log(error.response);
  })
  }
  // console.log(observationList);
  const handleObservationDetailModal = (id) => {
    setObservationDetailModal(!isObservationDetailModal);
    setSelectedObservationId(id);
  };

  const handleFilterValue = (value,type) => {
    setLoadMore(pageSize);
    if(type === 'status'){
      getObservationType(selectedFilters.country?.code,selectedFilters.type,value,true);
    }

    if(type === 'category') {
      getObservationType(selectedFilters.country?.code,value,selectedFilters.status,true);
    }

    if(type === 'country'){
      getObservationType(value.code,selectedFilters.type,selectedFilters.status,true);
    }
  }
  return(
    <>

     {auth.user &&
     <FilterSelectMenu galleryFilter={true} isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}  searchCountry={searchCountry} findCountry={findCountry} handleFilterValue={handleFilterValue}/>
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
            {galleryCardToShow.length ===  0 &&
              <div className="data-not-found">
                <img src={Images.NoDataFound} alt="No data found" className="mb-3"/>
                <p><b className="text-secondary fw-bold">Opps!</b> No Data Found</p>
              </div>
            }
            <ObservationDetailPage observationList={galleryCardToShow} isObservationDetailModal={isObservationDetailModal} setObservationDetailModal={setObservationDetailModal} setSelectedObservationId={setSelectedObservationId} />
          </div>
          {nextPageUrl &&
            <LoadMore handlLoadMore={handleLoadMoreData} /> 
           }
          <ObservationDetails
              data={observationList[selectedObservationId]}
              activeType={''}
              modalClass="observation-details_modal"
              open={isObservationDetailModal}
              handleClose={handleObservationDetailModal}
          />
        </div>
        </>
  )
}
export default Gallery;