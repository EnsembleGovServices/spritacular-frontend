// import { useState } from 'react';
import InitialUploadObservations from "../InitialUploadObservations";
import { Col, Container, Row, UncontrolledAlert } from 'reactstrap';
import ObservationCard from "../../components/Shared/ObservationCard";
import { FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { routeUrls } from './../../helpers/url';
import { Icon } from '@iconify/react';
import "../../assets/scss/component/myObservation.scss";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import {baseURL} from "../../helpers/url";
import ObservationDetails from './ObservationDetails';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Images from './../../static/images';
import ObservationDetailPage from "./ObservationDetailPage";
import { Dropdown } from 'reactstrap';
import { DropdownToggle } from 'reactstrap';
import { DropdownMenu } from 'reactstrap';
import { DropdownItem } from 'reactstrap';

const MyObservations = () => {
  const [isObservationDetailModal, setObservationDetailModal] = useState(false)
  const [observationList,setObservationList] = useState({});
  const [currentObservationList,setCurrentObservationList] = useState({});
  const [observationCount,setObservationCount] = useState({
    verified: 0,
    unverified: 0,
    denied: 0,
    draft: 0,
    total:0,
  });
  const [isLoaded,setIsLoaded] = useState(true);
  const [activeType,setActiveType] = useState('verified');
  const [selectedObservationId,setSelectedObservationId] = useState();
  const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    getObservationData(null);
    getObservationType('verified');
  },[isLoaded]);


  const getObservationType = (type) => {
    let unverifiedList;
    setActiveType(type);
    if(type == 'unverified'){

      unverifiedList = observationList.length > 0 && observationList?.filter((item) => {
        return (item.is_submit == true);
      });
    }
    if(type == 'verified'){

      unverifiedList = observationList.length > 0 && observationList?.filter((item) => {
        return (item.is_verified == true);
      });
    }
    if(type == 'denied'){

      unverifiedList = observationList.length > 0 && observationList?.filter((item) => {
        return (item.is_reject == true);
      });
    }
    if(type == 'draft'){

      unverifiedList = observationList.length > 0 && observationList?.filter((item) => {
        return (item.is_submit == false);
      });
    }
    setCurrentObservationList(unverifiedList);
  }
  
  const getObservationData = (value) => {
    if(value !== null){
      value = value.target.value;
    }
    else{
      value = 1;
    }
    setActiveType('verified');
    getObservationType('verified');
    axios.get(baseURL.api+'/observation/observation_collection/?sortBy='+value,{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.token?.access}`,
      },
      
  }).then((success) => {
    setObservationList(success?.data?.data);
    setObservationCount({
      verified: success?.data?.verified_count,
      unverified: success?.data?.unverified_count,
      denied: success?.data?.denied_count,
      draft: success?.data?.draft_count,
      total: success?.data?.verified_count+success?.data?.unverified_count+success?.data?.denied_count+success?.data?.draft_count
    })

    setIsLoaded(false);
  }).catch((error) => {
      console.log(error.response);
  })
}

  const handleObservationDetailModal = (id) => {
    setObservationDetailModal(!isObservationDetailModal);
    setSelectedObservationId(id);
  };
  return(
      <>
        {observationCount.total === 0 &&  <Container>
          <InitialUploadObservations />
        </Container>}
        {observationCount.total > 0 && 
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
          <div className="filtered-data_wrapper">
            <Row>
            <Col sm={12} md={7} lg={6} className="order-2 order-md-1">
                <div className="d-flex align-items-center justify-content-start h-100 text-truncate overflow-auto mb-3 mb-md-0">
                  <span className= {activeType === 'verified' ? "filter-link active" : "filter-link "}  onClick={() => {getObservationType('verified')}}>Verified ({observationCount.verified})</span>     
                  <span className={activeType === 'unverified' ? "filter-link active" : "filter-link "}  onClick={() => {getObservationType('unverified')}}>Unverified ({observationCount.unverified})</span>     
                  <span className={activeType === 'denied' ? "filter-link active" : "filter-link "}  onClick={() => {getObservationType('denied')}}>Denied ({observationCount.denied})</span>     
                  <span className={activeType === 'draft' ? "filter-link active" : "filter-link "}  onClick={() => {getObservationType('draft')}}>Drafts ({observationCount.draft})</span>     
                </div>
              </Col>
              <Col sm={12} md={5} lg={6} className="text-end order-1 order-md-2">
              <div className="d-flex align-items-center justify-content-end h-100  flex-wrap flex-lg-nowrap mt-2 mt-md-0">
                  <FormGroup className="form-group sort-by-select">
                    <Label className="text-uppercase" htmlFor="SortBy">Sort by</Label>
                    <Dropdown id="SortBy" className="dropdown-with-search" toggle={() => setIsTimezoneOpen(!isTimezoneOpen)} isOpen={isTimezoneOpen}>
                        <DropdownToggle className="shadow-none border-0 text-black fw-normal text-start d-flex justify-content-between align-items-center w-100">
                          <span className="text-truncate">Recent observations</span>
                          <Icon icon="fe:arrow-down" className="down-arrow ms-1"/>
                        </DropdownToggle>
                        <DropdownMenu onChange={(e) => {getObservationData(e)}} className="py-0 shadow">
                            <DropdownItem header className="mb-0 position-sticky start-0 top-0 end-0 p-2 bg-white"><Input type="search" className="px-2 " placeholder="Recent Observations" /></DropdownItem>
                            <DropdownItem  className="px-2 fw-normal" value='recent'>Recent observations</DropdownItem>
                            <DropdownItem  className="px-2 fw-normal" value='1'>1 week ago observations</DropdownItem>
                            <DropdownItem  className="px-2 fw-normal" value='2'>2 week ago observations</DropdownItem>
                            <DropdownItem  className="px-2 fw-normal" value='3'>3 week ago observations</DropdownItem>
                            <DropdownItem  className="px-2 fw-normal" value='4'>4 week ago observations</DropdownItem>
                            <DropdownItem  className="px-2 fw-normal" value='1'>1 months ago observations</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    {/* <Input id="SortBy" type="select" name="observationSortBy" defaultValue="" onChange={(e) => {getObservationData(e)}}>
                      <option disabled defaultValue>
                        Recent observations
                      </option>
                      <option value='1'>1 week ago observations</option>
                      <option value='2'>2 week ago observations</option>
                      <option value='3'>3 week ago observations</option>
                      <option value='4'>4 week ago observations</option>
                      <option value='1'>1 months ago observations</option>
                    </Input> */}
                  </FormGroup>  
                  <Link to={'/'+routeUrls.observationsAdd} className="btn btn-secondary ms-2 ms-xl-4 shadow-none">
                    <Icon icon="heroicons-outline:upload"  width="16" height="20" /> Upload
                    Observation
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <Container>
          {/* <UncontrolledAlert color="success" data-dismiss="alert" dismissible="true" className="text-center">
              Observation uploaded successfully
          </UncontrolledAlert>
          <UncontrolledAlert color="danger" data-dismiss="alert" dismissible="true" className="text-center">
            Would you like to help us sift through observations and endorse their validity?
            <Link to={routeUrls.getStarted} className="btn btn-outline-primary">Get Trained</Link>
          </UncontrolledAlert> */}
          {observationCount[`${activeType}`] ==  0 &&
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
          <ObservationDetailPage  observationList={currentObservationList} isObservationDetailModal={isObservationDetailModal} setObservationDetailModal={setObservationDetailModal} setSelectedObservationId={setSelectedObservationId}/>
        </Container> 
         {isObservationDetailModal && <ObservationDetails data={currentObservationList[selectedObservationId]}  activeType={activeType}modalClass="observation-details_modal" open={isObservationDetailModal} handleClose={handleObservationDetailModal} />}
         </>
         }
      </>
  )
}
export default MyObservations;