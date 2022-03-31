import "../assets/scss/component/myObservation.scss";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import {baseURL} from "../helpers/url";
import ObservationDetails from './Observation/ObservationDetails';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Images from './../static/images';
import ObservationDetailPage from "./Observation/ObservationDetailPage";
import { LoadMore } from '../components/Shared/LoadMore';
import "../assets/scss/component/gallery.scss";
import { Col, Container, Row, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import {Link} from 'react-router-dom';
import { routeUrls } from '../helpers/url';
import { Icon } from '@iconify/react';
import {observationStatus,countries} from "../helpers/timezone";
import cloneDeep from "lodash.clonedeep";
import FilterSelectMenu from "../components/Shared/FilterSelectMenu";


const Gallery = () => {
  const [isObservationDetailModal, setObservationDetailModal] = useState(false);
  const [observationList,setObservationList] = useState([]);
  const [isLoaded,setIsLoaded] = useState(true);
  const [selectedObservationId,setSelectedObservationId] = useState();
  const [galleryCardToShow, setGalleryCardToShow] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [category,setCategory] = useState([]);
  const [currentObservationList,setCurrentObservationList] = useState({});
  const { auth } = useAuth();
  const [loadMore,setLoadMore] = useState(10);
  const [pageSize,setPageSize] = useState(10);


  
  useEffect(() => {
    setLoadMore(pageSize);
    getObservationType(selectedCountry?.code,selectedCategory,selectedStatus);
    fetchCategory();
  },[isLoaded]);

  const findCountry = (e) => {
    let value = e.target.value.toLowerCase();
    setSearchCountry(value);
}

useEffect(()=> {
  if (isCountryOpen === false) {
      setSearchCountry("");
  }
}, [isCountryOpen])

  const fetchCategory = async () => {
    await axios.get(baseURL.api+'/observation/get_category_list/', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth?.token?.access}`
        }
    })
    .then((response)=> {
      setCategory(response?.data);
    })
    .catch((error)=> {console.log(error)})
}

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
      getObservationType(selectedCountry.code,selectedCategory,value);
    }

    if(type === 'category') {
      getObservationType(selectedCountry.code,value,selectedStatus);
    }
    
    if(type === 'country'){
      getObservationType(value.code,selectedCategory,selectedStatus);
    }   
  }
  return(
    <>
    
     {auth.user &&
     <FilterSelectMenu galleryFilter={true} isCountryOpen={isCountryOpen} selectedCountry={selectedCountry} searchCountry={searchCountry} countries={countries} setIsCountryOpen={setIsCountryOpen}findCountry={findCountry} setSelectedCountry={setSelectedCountry} handleFilterValue={handleFilterValue} setIsTypeOpen={setIsTypeOpen} isTypeOpen={isTypeOpen}category={category}selectedCategory={selectedCategory}setSelectedCategory={setSelectedCategory} isStatusOpen={isStatusOpen}setIsStatusOpen={setIsStatusOpen}selectedStatus={selectedStatus}observationStatus={observationStatus} setSelectedStatus={setSelectedStatus}/>
}
        <div className='gallery-page'>
          <h4 className='text-black fw-bold'>Recent Observations</h4>
          <div>
            {galleryCardToShow.length ===  0 &&
              <div className="data-not-found">
                <LazyLoadImage src={Images.NoDataFound} alt="No data found" className="mb-3"/>
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