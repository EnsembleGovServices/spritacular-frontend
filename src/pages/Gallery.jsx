// import { useState } from 'react';
import { Col, Container, Row, UncontrolledAlert } from 'reactstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { routeUrls } from './../helpers/url';
import { Icon } from '@iconify/react';
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

const MyObservations = () => {
  const [isObservationDetailModal, setObservationDetailModal] = useState(false)
  const [observationList,setObservationList] = useState({});
  const [isLoaded,setIsLoaded] = useState(true);
  const [selectedObservationId,setSelectedObservationId] = useState();
  const { auth } = useAuth();
  const [loadMore,setLoadMore] = useState(0);
  const [pageSize,setPageSize] = useState(10);
  const [currobservationList,setcurrobservationList] = useState([]);
  useEffect(() => {
    getObservationType();
  },[isLoaded]);


  const getObservationType = () => {
    axios.get(baseURL.api+'/observation/observation_collection/',{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.token?.access}`,
      },
      
  }).then((success) => {
    setObservationList(success?.data?.data);
    let data = success?.data?.data.slice(0,pageSize);
    setLoadMore(pageSize);
      setcurrobservationList(data);
    setIsLoaded(false);
  }).catch((error) => {
      console.log(error.response);
  })
  }

  const handlLoadMore = () => {
    let value = loadMore + pageSize;
    if(observationList.length > 0){

      let length;
      if(value > observationList.length){
        length = observationList.length;
      }
      else{
        length = value;
      }
      setLoadMore(length);
      let currentData = observationList.slice(loadMore,length);
      setcurrobservationList([...currobservationList,...currentData]);
    }
  }
  
  const handleObservationDetailModal = (id) => {
    setObservationDetailModal(!isObservationDetailModal);
    setSelectedObservationId(id);
  };
  return(
        <>
        {/* <div className="observation-filter_wrapper">
          <Container>
            <Row>
              <Col sm={12} md={8}>
                <FormGroup className="m-0 d-inline-block form-group">
                  <Label className="text-uppercase" htmlFor="Country">Country</Label>
                  <Input id="Country" type="select" name="timezone" className="bg-transparent p-0 custom-select" defaultValue="" >
                    <option disabled defaultValue>
                      All countries
                    </option>
                    <option>Country 1</option>
                    <option>Country 2</option>
                    <option>Country 3</option>
                    <option>Country 4</option>
                  </Input>
                </FormGroup>  
                <FormGroup className="m-0 d-inline-block form-group">
                  <Label className="text-uppercase" htmlFor="TransientLuminousEvent">Transient Luminous Event</Label>
                  <Input id="TransientLuminousEvent" type="select" name="timezone" className="bg-transparent p-0 custom-select" defaultValue="" >
                    <option disabled defaultValue>
                    All types
                    </option>
                    <option>Types 1</option>
                    <option>Types 2</option>
                    <option>Types 3</option>
                    <option>Types 4</option>
                  </Input>
                </FormGroup>  
                <FormGroup className="m-0 d-inline-block form-group">
                  <Label className="text-uppercase" htmlFor="ObservationStatus">Observation Status</Label>
                  <Input id="ObservationStatus" type="select" name="timezone" className="bg-transparent p-0 custom-select" defaultValue="" >
                    <option disabled defaultValue>
                    All status
                    </option>
                    <option>Status 1</option>
                    <option>Status 2</option>
                    <option>Status 3</option>
                    <option>Status 4</option>
                  </Input>
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
        </div> */}
        <Container>
          {/* <div className="filtered-data_wrapper">
            <Row>
            <Col sm={12} md={7} lg={6}>
                <div className="d-flex align-items-center justify-content-start h-100 text-truncate overflow-auto mb-3 mb-md-0">
                  <span className= {activeType === 'verified' ? "filter-link active" : "filter-link "}  onClick={() => {getObservationType('verified')}}>Verified ({observationCount.verified})</span>     
                  <span className={activeType === 'unverified' ? "filter-link active" : "filter-link "}  onClick={() => {getObservationType('unverified')}}>Unverified ({observationCount.unverified})</span>     
                  <span className={activeType === 'denied' ? "filter-link active" : "filter-link "}  onClick={() => {getObservationType('denied')}}>Denied ({observationCount.denied})</span>     
                  <span className={activeType === 'draft' ? "filter-link active" : "filter-link "}  onClick={() => {getObservationType('draft')}}>Drafts ({observationCount.draft})</span>     
                </div>
              </Col>
              <Col sm={12} md={5} lg={6} className="text-end">
              <div className="d-flex align-items-center justify-content-end h-100  flex-wrap flex-lg-nowrap mt-2 mt-md-0">
                  <FormGroup className="form-group sort-by-select">
                    <Label className="text-uppercase" htmlFor="SortBy">Sort by</Label>
                    <Input id="SortBy" type="select" name="timezone" defaultValue="" >
                      <option disabled defaultValue>
                        Recent observations
                      </option>
                      <option>1 week ago observations</option>
                      <option>2 week ago observations</option>
                      <option>3 week ago observations</option>
                      <option>4 week ago observations</option>
                      <option>1 months ago observations</option>
                    </Input>
                  </FormGroup>  
                  <Link to={'/'+routeUrls.observationsAdd} className="btn btn-secondary ms-2 ms-xl-4 shadow-none">
                    <Icon icon="heroicons-outline:upload"  width="16" height="20" /> Upload
                    Observation
                  </Link>
                </div>
              </Col>
            </Row>
          </div> */}
        </Container>
        <Container>
          {/* <UncontrolledAlert color="success" data-dismiss="alert" dismissible="true" className="text-center">
              Observation uploaded successfully
          </UncontrolledAlert>
          <UncontrolledAlert color="danger" data-dismiss="alert" dismissible="true" className="text-center">
            Would you like to help us sift through observations and endorse their validity?
            <Link to={routeUrls.getStarted} className="btn btn-outline-primary">Get Trained</Link>
          </UncontrolledAlert> */}
          {observationList.length ==  0 &&
           <div className="data-not-found">
              <LazyLoadImage src={Images.NoDataFound} alt="No data found" className="mb-3"/>
              <p><b className="text-secondary fw-bold">Opps!</b> No Data Found</p>
            </div>}
          {/* <Row className="">
            {observationList && observationList?.map((cardItems, index)=> {
              if(cardItems?.images.length > 0){
                return (
                    <>
                    {cardItems?.images?.map((image,id) => {
                      return ( <Col key={id} sm={6} md={4} xl={3} className="mb-4">
                          <ObservationCard cardItems = {image} cardData={cardItems} index={index} userProfile={cardItems.user_data} handleClick={handleObservationDetailModal}/>
                      </Col>)
                      })
                    }
                    </>
                  );
              }
              else{
                return;
              }
            })
            }
          </Row> */}
          <ObservationDetailPage  observationList={currobservationList} isObservationDetailModal={isObservationDetailModal} setObservationDetailModal={setObservationDetailModal} setSelectedObservationId={setSelectedObservationId}/>
          {loadMore < observationList.length && <LoadMore handlLoadMore={handlLoadMore} />}
        </Container> 
         {isObservationDetailModal && <ObservationDetails data={observationList[selectedObservationId]}  activeType={''} modalClass="observation-details_modal" open={isObservationDetailModal} handleClose={handleObservationDetailModal} />}
         </>
  )
}
export default MyObservations;