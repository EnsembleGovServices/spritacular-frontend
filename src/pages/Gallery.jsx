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
import { Col, Container, Row, UncontrolledAlert, Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle, } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import {Link, useNavigate} from 'react-router-dom';
import { routeUrls } from '../helpers/url';
import { Icon } from '@iconify/react';
import {observationStatus} from "../helpers/timezone";
import cloneDeep from "lodash.clonedeep";


const MyObservations = () => {
  const [isObservationDetailModal, setObservationDetailModal] = useState(false);
  const [observationList,setObservationList] = useState([]);
  const [isLoaded,setIsLoaded] = useState(true);
  const [selectedObservationId,setSelectedObservationId] = useState();
  const [galleryCardToShow, setGalleryCardToShow] = useState([]);
  const [searchTimeZone, setSearchTimeZone] = useState("");
  const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [category,setCategory] = useState([]);
  const [currentObservationList,setCurrentObservationList] = useState({});
  const [filteredList,setFilteredList] = useState([]);
  const { auth } = useAuth();
  const [loadMore,setLoadMore] = useState(10);
  const [pageSize,setPageSize] = useState(10);
  
  useEffect(() => {
    setLoadMore(pageSize);
    getObservationType(selectedCountry,selectedCategory,selectedStatus);
    fetchCategory();
  },[isLoaded]);

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
    var unverifiedList ;
    if(type === 'status'){
    
      // value = value.toLowerCase();
      // if(value === 'unverified'){
      //   unverifiedList = list.length > 0 && list?.filter((item) => {
      //     return (item.is_submit === true && item.is_verified === false && item.is_reject === false);
      //   });
      // }
      // if(value === 'verified'){
      //   unverifiedList = list.length > 0 && list?.filter((item) => {
      //     return (item.is_verified === true && item.is_reject === false);
      //   });
      // }
      // if(value === 'denied'){
      //   unverifiedList = list.length > 0 && list?.filter((item) => {
      //     return (item.is_reject === true && item.is_verified === false);
      //   });
      // }
      // if(value === 'draft'){
      //   unverifiedList = list.length > 0 && list?.filter((item) => {
      //     return (item.is_submit === false && item.is_verified === false && item.is_reject === false);
      //   });
      // }
      getObservationType(selectedCountry,selectedCategory,value);
      
    }
    if(type === 'category') {
      // unverifiedList = list.length > 0 && list?.filter((item) => {
      //   if(item.category_data){
      //     return item.category_data.includes(value);
      //   }
      // });
      getObservationType(selectedCountry,value,selectedStatus);
    }

   
    // setCurrentObservationList(unverifiedList);
    // if(unverifiedList){
    //   let data = unverifiedList.slice(0,pageSize);
    //   setGalleryCardToShow(data);
    // }
  }
  return(
    <>
     {auth.user && <div className="observation-filter_wrapper">
          <Container>
            <Row>
              <Col sm={12} md={8}>
                <FormGroup className="m-0 d-inline-block form-group">
                  <Label className="text-uppercase" htmlFor="Country">Country</Label>
                  {/* <Input id="Country" type="select" name="timezone" className="bg-transparent p-0 custom-select" defaultValue="" >
                    <option disabled defaultValue>
                      All countries
                    </option>
                    <option>Country 1</option>
                    <option>Country 2</option>
                    <option>Country 3</option>
                    <option>Country 4</option>
                  </Input> */}
                  <Dropdown className="dropdown-with-search" toggle={() => setIsTimezoneOpen(!isTimezoneOpen)} isOpen={isTimezoneOpen} >
                                    <DropdownToggle className="px-3 shadow-none border-0 text-black fw-normal text-start d-flex justify-content-between align-items-center w-100">
                                        <span className="text-truncate"></span>
                                        <Icon icon="fe:arrow-down" className="down-arrow ms-1"/>
                                    </DropdownToggle>
                                    <DropdownMenu className="py-0 shadow">
                                        <DropdownItem header className="mb-0 position-sticky start-0 top-0 end-0 p-2 bg-white"><Input type="text" className="p-2"  placeholder="Search Timezone" /></DropdownItem>
                                        {observationStatus?.filter(item => {
                                            return item;
                                        }).map((item, index) => {
                                            return <DropdownItem  name="timezone" className="px-2 fw-normal" key={index} value={item} >{item}</DropdownItem>
                                        })}
                                    </DropdownMenu>
                                </Dropdown>
                </FormGroup>  
                <FormGroup className="m-0 d-inline-block form-group">
                  <Label className="text-uppercase" htmlFor="TransientLuminousEvent">Transient Luminous Event</Label>
                  {/* <Input id="TransientLuminousEvent" type="select" name="timezone" className="bg-transparent p-0 custom-select" defaultValue="" >
                    <option disabled defaultValue>
                    All types
                    </option>
                    <option>Types 1</option>
                    <option>Types 2</option>
                    <option>Types 3</option>
                    <option>Types 4</option>
                  </Input> */}
                  <Dropdown className="dropdown-with-search" toggle={() => setIsTypeOpen(!isTypeOpen)} isOpen={isTypeOpen} >
                      <DropdownToggle className="px-3 shadow-none border-0 text-black fw-normal text-start d-flex justify-content-between align-items-center w-100">
                      <span className="text-truncate">{selectedCategory}</span>
                          <Icon icon="fe:arrow-down" className="down-arrow ms-1"/>
                      </DropdownToggle>
                      <DropdownMenu className="py-0 shadow">
                          
                          {category?.map((item, index) => {
                              return <DropdownItem  name="timezone" className="px-2 fw-normal" key={index} value ={item.name} onClick={(e) => {setSelectedCategory(e.target.value); handleFilterValue(e.target.value,'category');}} >{item.name}</DropdownItem>
                          })}
                      </DropdownMenu>
                  </Dropdown>
                </FormGroup>  
                <FormGroup className="m-0 d-inline-block form-group">
                  <Label className="text-uppercase" htmlFor="ObservationStatus">Observation Status</Label>
                  {/* <Input id="ObservationStatus" type="select" name="timezone" className="bg-transparent p-0 custom-select" defaultValue="" >
                    <option disabled defaultValue>
                    All status
                    </option>
                    <option>Status 1</option>
                    <option>Status 2</option>
                    <option>Status 3</option>
                    <option>Status 4</option>
                  </Input> */}
                  <Dropdown className="dropdown-with-search" toggle={() => setIsStatusOpen(!isStatusOpen)} isOpen={isStatusOpen} >
                      <DropdownToggle className="px-3 shadow-none border-0 text-black fw-normal text-start d-flex justify-content-between align-items-center w-100">
                          <span className="text-truncate">{selectedStatus}</span>
                          <Icon icon="fe:arrow-down" className="down-arrow ms-1"/>
                      </DropdownToggle>
                      <DropdownMenu className="py-0 shadow">
                          
                          {observationStatus?.map((item, index) => {
                              return <DropdownItem  name="timezone" className="px-2 fw-normal" key={index} value={item} onClick={(e) => {setSelectedStatus(e.target.value); handleFilterValue(e.target.value,'status');}} >{item}</DropdownItem>
                          })}
                      </DropdownMenu>
                  </Dropdown>
                </FormGroup>               
              </Col>
              <Col sm={12} md={4} className="text-end">
                <div className="d-flex align-items-center justify-content-end h-100 ">
                  <Link to={'/'+routeUrls.observationsAdd} className="btn btn-secondary shadow-none mt-2 mt-md-0">
                    <Icon icon="heroicons-outline:upload"  width="16" height="20" /> Upload
                    Observation
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div> }
        <div className='gallery-page'>
          <h4 className='text-black fw-bold'>Recent Observations</h4>
          <div>
            {galleryCardToShow.length ===  0 &&
              <div className="data-not-found">
                <LazyLoadImage src={Images.NoDataFound} alt="No data found" className="mb-3"/>
                <p><b className="text-secondary fw-bold">Opps!</b> No Data Found</p>
              </div>}
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
export default MyObservations;