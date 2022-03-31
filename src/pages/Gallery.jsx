import "../assets/scss/component/myObservation.scss";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import {baseURL} from "../helpers/url";
import ObservationDetails from './Observation/ObservationDetails';
import Images from './../static/images';
import ObservationDetailPage from "./Observation/ObservationDetailPage";
import { LoadMore } from '../components/Shared/LoadMore';
import "../assets/scss/component/gallery.scss";
import FilterSelectMenu from "../components/Shared/FilterSelectMenu";
import useObservationsData from "../hooks/useObservationsData";


const Gallery = () => {
  const {setObservationListData} = useObservationsData();
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
    country:{},
    type:'',
    status:''
  })

  const [currentObservationList,setCurrentObservationList] = useState({});
  const { auth } = useAuth();
  const [loadMore,setLoadMore] = useState(10);
  const [pageSize,setPageSize] = useState(10);


  
  useEffect(() => {
    setLoadMore(pageSize);
    getObservationType(selectedFilters.country?.code,selectedFilters.type,selectedFilters.status);
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

  const handleLoadMoreData = () => {
    let value = loadMore + pageSize;
    if(currentObservationList.length > 0){

      let length;
      if(value > currentObservationList.length){
        length = currentObservationList.length;
      }
      else{
        length = value;
      }
      setLoadMore(length);
      let currentData = currentObservationList.slice(loadMore,length);
      setGalleryCardToShow([...galleryCardToShow,...currentData]);
    }
  }
  const getObservationType = (country,category,status) => {
    axios.get(baseURL.api+'/observation/observation_collection/?country='+country+'&categpry='+category+'&status='+status,{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.token?.access}`,
      },
      
  }).then((success) => {
    setObservationList(success?.data?.data);
    let data = success?.data?.data.slice(0,pageSize);
    setCurrentObservationList(success?.data?.data);
    setGalleryCardToShow(data);
      if(!auth.user){
        const varifiedData = success?.data?.data?.filter((item) => (item.is_verified === true && item.is_reject === false));
        setObservationList(varifiedData);
      }
    setIsLoaded(false);
  }).catch((error) => {
      console.log(error.response);
  })
  }
  
  const handleObservationDetailModal = (id) => {
    setObservationDetailModal(!isObservationDetailModal);
    setSelectedObservationId(id);
  };

  const handleFilterValue = (value,type) => {
    setLoadMore(pageSize);
    if(type === 'status'){
      getObservationType(selectedFilters.country?.code,selectedFilters.type,value);
    }

    if(type === 'category') {
      getObservationType(selectedFilters.country?.code,value,selectedFilters.status);
    }

    if(type === 'country'){
      getObservationType(value.code,selectedFilters.type,selectedFilters.status);
    }
  }
  return(
    <>

     {auth.user &&
     <FilterSelectMenu galleryFilter={true} isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} selectedFilters={selectedFilters}setSelectedFilters={setSelectedFilters}  searchCountry={searchCountry} findCountry={findCountry} handleFilterValue={handleFilterValue}/>
}
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
          {loadMore < currentObservationList.length &&
            <LoadMore handlLoadMore={handleLoadMoreData} /> 
          }
          {isObservationDetailModal && <ObservationDetails data={observationList[selectedObservationId]}  activeType={''} modalClass="observation-details_modal" open={isObservationDetailModal} handleClose={handleObservationDetailModal} />}
        </div>
        </>
  )
}
export default Gallery;