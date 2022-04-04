import "../../assets/scss/component/myObservation.scss";
import InitialUploadObservations from "../InitialUploadObservations";
import { Col, Container, Row } from 'reactstrap';
import {Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import {baseURL, routeUrls} from "../../helpers/url";
import ObservationDetails from './ObservationDetails';
import Images from './../../static/images';
import ObservationDetailPage from "./ObservationDetailPage";
import useObservations from "../../hooks/useObservations";
import { LoadMore } from "../../components/Shared/LoadMore";
import { Icon } from "@iconify/react";
import useObservationsData from "../../hooks/useObservationsData";

const MyObservations = () => {
  const { auth } = useAuth();
  const { setObservationData, setObservationSteps, setObservationImages } = useObservations();
  const { observationListData, setObservationListData } = useObservationsData();
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
  const navigate = useNavigate();
  const [loadMore,setLoadMore] = useState(0);
  const [pageSize,setPageSize] = useState(10);
  const [currobservationList,setcurrobservationList] = useState([]);
  const formData = new FormData();


  const handleWatchCounter = async (id) => {
    console.log('hitting api')
    formData.set('is_watch', true);
    await axios.post(baseURL.api+'/observation/watch_count/'+id+'/', formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token?.access}`
      }
    }).then((response) => {
      console.log(response);
    })
  }
console.log(currobservationList);

  useEffect(() => {
    let watched = !currentObservationList[selectedObservationId]?.like_watch_count_data?.is_watch;
    if (isObservationDetailModal && watched) {
      handleWatchCounter(currentObservationList[selectedObservationId].id).then(r => r)
    }

    setObservationListData((prev) => {
      return {
        ...prev,
        active: currentObservationList[selectedObservationId]
      }
    })

  }, [isObservationDetailModal]);


  useEffect(() => {
    getObservationData(null);
    getObservationType('verified');
  },[isLoaded]);

  const handleObservationEdit = (data) => {
    cleaningUpObservationDataForDraftSaving(data).then(r => r);
    setObservationDetailModal(false);
    setTimeout(function () {
      navigate('/observations/update');
    }, 100)
  }

  const cleaningUpObservationDataForDraftSaving = async (data) => {
    setObservationImages([]);
    setObservationData([]);
    await updateStateForDraft(data)
    return true;
  }

  const updateStateForDraft = (data) => {
    setObservationSteps(prev => {
      return {
        ...prev,
        total: 3,
        active: 1,
        mode: {
          update: true,
          ...data
        }
      }
    });
  }

  const getObservationType = (type) => {
    let unverifiedList;
    setActiveType(type);

    setObservationListData((prev) => {
      return {
        ...prev,
        activeType: type
      }
    })
    // console.log(observationListData);

    setLoadMore(pageSize);
    if(type === 'unverified'){
      unverifiedList = observationList.length > 0 && observationList?.filter((item) => {
        return (item.is_submit === true && item.is_verified === false && item.is_reject === false);
      });
    }
    if(type === 'verified'){
      unverifiedList = observationList.length > 0 && observationList?.filter((item) => {
        return (item.is_verified === true && item.is_reject === false);
      });
    }
    if(type === 'denied'){
      unverifiedList = observationList.length > 0 && observationList?.filter((item) => {
        return (item.is_reject === true && item.is_verified === false);
      });
    }
    if(type === 'draft'){
      unverifiedList = observationList.length > 0 && observationList?.filter((item) => {
        return (item.is_submit === false && item.is_verified === false && item.is_reject === false);
      });
    }
    setCurrentObservationList(unverifiedList);
    if(unverifiedList){
      let data = unverifiedList.slice(0,pageSize);
      setcurrobservationList(data);
    }
  }
  
  const getObservationData = (value) => {
    if(value !== null){
      value = value.target.value;
    }
    else{
      value = 1;
    }
    setActiveType('verified');
    
    axios.get(baseURL.api+'/observation/observation_collection/?sortBy='+value,{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.token?.access}`,
      },
      
  }).then((success) => {
    const varifiedCount = success?.data?.data?.filter((item) => (item.is_verified === true && item.is_reject === false));
    const deniedCount = success?.data?.data?.filter((item) => (item.is_reject === true && item.is_verified === false));
    const unVarifiedCount = success?.data?.data?.filter((item) => (item.is_reject === false && item.is_submit === true && item.is_verified === false));
    const draftCount = success?.data?.data?.filter((item) => item.is_submit === false && item.is_reject === false && item.is_verified === false);

    // setObservationList(success?.data?.data);
    setObservationCount({
      verified: varifiedCount.length,
      unverified: unVarifiedCount.length,
      denied: deniedCount.length,
      draft: draftCount.length,
      total: success?.data?.data.length
    })

      // Global State
      setObservationListData({
        list: success?.data?.data,
        count: {
          verified: varifiedCount.length,
          unverified: unVarifiedCount.length,
          denied: deniedCount.length,
          draft: draftCount.length,
          total: success?.data?.data.length
        }
      })


    getObservationType('verified');
    setIsLoaded(false);
  }).catch((error) => {
      console.log(error.response);
  })
  }

  const handleObservationDetailModal = (id) => {
    setObservationDetailModal(!isObservationDetailModal);
    setSelectedObservationId(id);
  };

  const handlLoadMore = () => {
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
      setcurrobservationList([...currobservationList,...currentData]);
    }
  }

  useEffect(()=> {
    if (isObservationDetailModal) {
      document.body.classList.add('overflow-hidden');
    }
    else{
      document.body.classList.remove('overflow-hidden');
    }
  }, [isObservationDetailModal])

  return(
      <>
        {observationCount.total === 0 &&  <InitialUploadObservations /> }
        {observationCount.total > 0 &&
        <>
          <Container>
            <div className="filtered-data_wrapper">
              <Row>
                <Col sm={12} md={8} lg={6} className="order-2 order-md-1">
                  <div className="d-flex align-items-center justify-content-start h-100 text-truncate overflow-auto mb-3 mb-md-0">
                    <span className= {activeType === 'verified' ? "filter-link active" : "filter-link "}  onClick={() => {getObservationType('verified')}}>Verified ({observationCount.verified})</span>
                    <span className={activeType === 'unverified' ? "filter-link active" : "filter-link "}  onClick={() => {getObservationType('unverified')}}>Unverified ({observationCount.unverified})</span>
                    <span className={activeType === 'denied' ? "filter-link active" : "filter-link "}  onClick={() => {getObservationType('denied')}}>Denied ({observationCount.denied})</span>
                    <span className={activeType === 'draft' ? "filter-link active" : "filter-link "}  onClick={() => {getObservationType('draft')}}>Drafts ({observationCount.draft})</span>
                  </div>
                </Col>
                <Col sm={12} md={4} lg={6} className="text-end order-1 order-md-2">
                  <div className="d-flex align-items-center justify-content-end h-100  flex-wrap flex-lg-nowrap mt-2 mt-md-0">
                    <Link to={'/'+routeUrls.observationsAdd} className="btn btn-secondary ms-2 ms-xl-4 shadow-none">
                    <Icon icon="heroicons-outline:upload"  width="16" height="20" /> Upload
                    Observations
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
          <Container>
            {observationCount[`${activeType}`] ===  0 &&
            <div className="data-not-found">
                <img src={Images.NoDataFound} alt="No data found" className="mb-3"/>
                <p><b className="text-secondary fw-bold">Opps!</b> No Data Found</p>
              </div>}
            <ObservationDetailPage  observationList={currobservationList}  isObservationDetailModal={isObservationDetailModal} setObservationDetailModal={setObservationDetailModal} setSelectedObservationId={setSelectedObservationId}/>
          {loadMore < currentObservationList.length && <LoadMore handlLoadMore={handlLoadMore} />}
          </Container>

          <ObservationDetails
              data={observationListData?.active}
              activeType={observationListData?.activeType}
              modalClass="observation-details_modal"
              open={isObservationDetailModal}
              handleClose={handleObservationDetailModal}
              handleContinueEdit={handleObservationEdit}
          />

        </>
        }
      </>
  )
}
export default MyObservations;