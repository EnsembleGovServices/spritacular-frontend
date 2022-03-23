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

const ObservationDetailPage = (props) => {
  const {observationList,isObservationDetailModal,setSelectedObservationId,setObservationDetailModal} = props;
  const { auth } = useAuth();

  
  const handleObservationDetailModal = (id) => {
    setObservationDetailModal(!isObservationDetailModal);
    setSelectedObservationId(id);
  };
  return(
        <>
          <Row className="">
            {observationList.length > 0 && observationList?.map((cardItems, index)=> {
              if(cardItems?.images.length > 0){
                return (
                      <Col key={index} sm={6} md={4} xl={3} className="mb-4">
                          <ObservationCard cardItems = {cardItems} cardData={cardItems?.images[0]} index={index} userProfile={cardItems.user_data} handleClick={handleObservationDetailModal}/>
                      </Col>)
              }
              else{
                return;
              }
            })
            }
          </Row>
         </>
  )
}
export default ObservationDetailPage;