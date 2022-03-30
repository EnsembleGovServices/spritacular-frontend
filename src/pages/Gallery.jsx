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

const MyObservations = () => {
  const [isObservationDetailModal, setObservationDetailModal] = useState(false);
  const [observationList,setObservationList] = useState([]);
  const [isLoaded,setIsLoaded] = useState(true);
  const [selectedObservationId,setSelectedObservationId] = useState();
  const cardPerPage = 10;
  const onLoadCardShow = 10;
  const [galleryCardToShow, setGalleryCardToShow] = useState([]);
  const [next, setNext] = useState(0);


  const loadWithSlice = () => {
    const toShowInitialCard = observationList.slice(
      galleryCardToShow.length,
      galleryCardToShow.length + cardPerPage
    );
    setGalleryCardToShow([...galleryCardToShow, ...toShowInitialCard]);
  }

  useEffect(()=>{
    if(observationList){
      setGalleryCardToShow(observationList.slice(0, onLoadCardShow));
    }
  },[observationList])

  const { auth } = useAuth();
  const [loadMore,setLoadMore] = useState(0);
  const [pageSize,setPageSize] = useState(10);
  const [currobservationList,setcurrobservationList] = useState([]);
  useEffect(() => {
    getObservationType();
  },[isLoaded]);

  const handleLoadMoreData = () => {
    let loadedMore = next + cardPerPage;
    loadWithSlice(next, loadedMore);
    setNext(next + cardPerPage);
  }

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
    // const varifiedData = success?.data?.data?.filter((item) => (item.is_verified === true && item.is_reject === false));
    // setObservationList(varifiedData);
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
        <div className='gallery-page'>
          <h4 className='text-black fw-bold'>Recent Observations</h4>
          <div>
            {observationList.length ===  0 &&
              <div className="data-not-found">
                <LazyLoadImage src={Images.NoDataFound} alt="No data found" className="mb-3"/>
                <p><b className="text-secondary fw-bold">Opps!</b> No Data Found</p>
              </div>}
            <ObservationDetailPage observationList={galleryCardToShow} isObservationDetailModal={isObservationDetailModal} setObservationDetailModal={setObservationDetailModal} setSelectedObservationId={setSelectedObservationId} />
          </div>
          {galleryCardToShow.length === observationList.length ? 
            <h5 className='text-center fw-bold mt-4 opacity-75'>No more data available</h5>
            : 
            <LoadMore handlLoadMore={handleLoadMoreData} /> 
          }
          {isObservationDetailModal && <ObservationDetails data={observationList[selectedObservationId]}  activeType={''} modalClass="observation-details_modal" open={isObservationDetailModal} handleClose={handleObservationDetailModal} />}
        </div>
  )
}
export default MyObservations;