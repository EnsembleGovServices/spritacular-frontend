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
  const [isLoaded,setIsLoaded] = useState(true);
  const [activeType,setActiveType] = useState('verified');
  const [selectedObservationId,setSelectedObservationId] = useState();
  const navigate = useNavigate();
  const [nextPageUrl,setNextPageUrl] = useState('/observation/observation_collection/?type=');

  useEffect(() => {
    setObservationListData((prev) => {
      return {
        ...prev,
        active: observationListData?.list?.[selectedObservationId]
      }
    })

  }, [isObservationDetailModal]);


  useEffect(() => {
    getObservationData('verified',true);
      setIsLoaded(false);
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
  
  const getObservationData = (value,reset=false) => {
    setActiveType(value);
    let url;
    if(reset === true || !nextPageUrl){
      url = '/observation/observation_collection/?type='+value+'&page=1';
    }else{
      url = nextPageUrl;
    }

    axios.get(baseURL.api+url,{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.token?.access}`,
      },
      
  }).then((success) => {
    let data = success?.data?.results;
    if(success?.data?.next){
      setNextPageUrl(success?.data?.next.split('api')[1]);
    }else{
      setNextPageUrl(null);
    }

    setIsLoaded(false);
    let records = data?.data;
      let prevData;

    if(observationListData?.list?.length > 0 && reset === false){
      prevData = [...observationListData.list];
      prevData = [...prevData,...records];
    }else{
      prevData = data?.data;
    }
      // Global State
      setObservationListData((prev) => {
        return {
          ...prev,
          list: prevData,
          count: {
            verified: data?.verified_count,
            unverified: data?.unverified_count,
            denied: data?.denied_count,
            draft: data?.draft_count,
            total: data?.verified_count + data?.unverified_count+ data?.denied_count + data?.draft_count
          }
        }
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

  const handleLoadMore = () => {
    getObservationData(activeType,false);
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
        {observationListData?.count?.total === 0 &&  <InitialUploadObservations /> }
        {observationListData?.count?.total > 0 &&
        <>
          <Container>
            <div className="filtered-data_wrapper">
              <Row>
                <Col sm={12} md={8} lg={6} className="order-2 order-md-1">
                  <div className="d-flex align-items-center justify-content-start h-100 text-truncate overflow-auto mb-3 mb-md-0">
                    <span className= {activeType === 'verified' ? "filter-link active" : "filter-link "}  onClick={() => {getObservationData('verified',true)}}>Verified ({observationListData?.count?.verified})</span>
                    <span className={activeType === 'unverified' ? "filter-link active" : "filter-link "}  onClick={() => {getObservationData('unverified',true)}}>Unverified ({observationListData?.count?.unverified})</span>
                    <span className={activeType === 'denied' ? "filter-link active" : "filter-link "}  onClick={() => {getObservationData('denied',true)}}>Denied ({observationListData?.count?.denied})</span>
                    <span className={activeType === 'draft' ? "filter-link active" : "filter-link "}  onClick={() => {getObservationData('draft',true)}}>Drafts ({observationListData?.count?.draft})</span>
                  </div>
                </Col>
                <Col sm={12} md={4} lg={6} className="text-end order-1 order-md-2">
                  <div className="d-flex align-items-center justify-content-end h-100  flex-wrap flex-lg-nowrap mb-2 mb-md-0">
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
            {observationListData?.list?.length ===  0 &&
            <div className="data-not-found">
                <img src={Images.NoDataFound} alt="No data found" className="mb-3"/>
                <p><b className="text-secondary fw-bold">Opps!</b> No Data Found</p>
              </div>}
            <ObservationDetailPage  observationList={observationListData?.list}  isObservationDetailModal={isObservationDetailModal} setObservationDetailModal={setObservationDetailModal} setSelectedObservationId={setSelectedObservationId} />
          {nextPageUrl && <LoadMore handleLoadMore={handleLoadMore} />}
          </Container>

         <ObservationDetails
              data={observationListData?.active}
              activeType={activeType}
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