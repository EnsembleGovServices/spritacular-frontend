import {Badge, Button, ButtonGroup, Col, Form, Row, UncontrolledAlert} from "reactstrap";
import { Icon } from '@iconify/react';
import ReactCountryFlags from "../../../components/ReactCountryFlag";
import moment from 'moment';
import {getdirectionDegree} from "../../../helpers/observation";
import {useState,useEffect} from "react";
import axios from "../../../api/axios";
import {baseURL, routeUrls} from "../../../helpers/url";
import useAuth from "../../../hooks/useAuth";
import useObservationsData from "../../../hooks/useObservationsData";
import RejectObvservationPopup from "../../Popup/RejectObvservationPopup";
import ObservationLikeViewCounter from "./ObservationLikeViewCounter";
import { array } from "prop-types";


const ObservationMoreDetails = (props) => {
    const {auth} = useAuth();
    const {data, obvCommentCount, handlePopup, approveRejectEvent,activeType} = props;
    const { observationListData, setObservationListData } = useObservationsData();
    const [like, setLike] = useState(observationListData.active?.like_watch_count_data?.is_like);
    const [openRejectPopup, setOpenRejectPopup] =  useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const user = auth?.user;
    const superuser = user.is_superuser;
    const trained = user?.is_trained;
    const shouldVerify = user?.is_to_be_verify;
    const token = auth?.token?.access;
    const newObvData = observationListData?.list;
    const formData = new FormData();
    const [selectedVote, setSelectedVote] = useState({});
    const [selected, setSelected] = useState({}); 
    const handleLike = async (id) => {
        formData.set('is_like', like ? 0 : 1);
        let obvData = observationListData?.active,
            alreadyLiked = obvData?.like_watch_count_data?.is_like,
            existingLike = obvData?.like_watch_count_data?.like_count;

        await axios.post(baseURL.api+'/observation/like/'+id+'/', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.token?.access}`
            }
        })
            .then((response)=> {
                if (!alreadyLiked) {
                    setLike(!like);
                    newObvData?.filter(openedItem => {
                        return openedItem?.id === data?.id;
                    }).map((item, index) => {
                        item.like_watch_count_data.is_like = true;
                        item.like_watch_count_data.like_count = alreadyLiked ? existingLike : existingLike + 1;
                        return item;
                    })

                    setObservationListData((prev) => {
                        return {
                            ...prev,
                            list: newObvData,
                            active: {
                                ...obvData,
                                like_watch_count_data: {
                                    ...obvData?.like_watch_count_data,
                                    is_like: like,
                                    like_count: alreadyLiked ? existingLike : existingLike + 1
                                }
                            }
                        }
                    })
                }
            })
            .catch((error)=> {
                console.log(error);
            })
    }
    const handleCloseRejectPopup = () =>{
        setOpenRejectPopup(!openRejectPopup)
    }
    const handleWatchCounter = async (id) => {
        await axios.post(baseURL.api+'/observation/watch_count/'+id+'/', null, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.token?.access}`
            }
        }).then((response) => {
            console.log(response);
            let data = observationListData?.active,
                alreadyWatched = data?.like_watch_count_data?.is_watch,
                existingWatchCount = data?.like_watch_count_data?.watch_count;


            newObvData?.filter(openedItem => {
                return openedItem?.id === data?.id;
            }).map((item, index) => {
                item.like_watch_count_data.is_watch = true;
                item.like_watch_count_data.watch_count = alreadyWatched ? existingWatchCount : existingWatchCount + 1;
                return item;
            })

            setObservationListData((prev)=> {
                return {
                    ...prev,
                    active: {
                        ...data,
                        like_watch_count_data: {
                            ...data?.like_watch_count_data,
                            watch_count: alreadyWatched ? existingWatchCount : existingWatchCount + 1
                        }
                    }
                }
            });
        })
    };

    const submitApproval = async (id) => {
        setSuccess('');
        setError('');
        await axios.post(`${baseURL.api}/observation/verify_observation/${id}/`, {name: "APPROVE",reason: ""}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setSuccess({
                    message: response?.data?.success
                })
                approveRejectEvent(true);
                setTimeout(function () {
                    handlePopup(false);
                }, 1200)
            })
            .catch(error => {
                console.log(error?.response);
                setError({
                    notAllowed: error?.response?.data?.detail
                })
            })
    }
    const handleApproveObservation = (id) => {
      submitApproval(id).then(r => r);
    }


    const handleVoteClick = (sr, id, index) => {
        setSelected({
            ...selected,
            [id] : {
                vote: sr === `yes${index}` ? 1 : 0,
                category_id: id}
        })
        
    };
    
    const handleVote = async(e) => {
        var votes = [];
        e.preventDefault();
        for (var key in selected) {
           
            votes.push(selected[key]);
          }
        await axios.post(baseURL.api+'/observation/vote/'+data?.id+'/', {'votes':votes}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.token?.access}`
            }
        })
        .then((response)=> {

            let obvData = observationListData?.active;
            newObvData?.filter(openedItem => {
                return openedItem?.id === data?.id;
            }).map((item, index) => {
                item.user_data.is_voted = true;
                return item;
            })
            obvData.user_data.is_voted = true;
            setObservationListData((prev) => {
                return {
                    ...prev,
                    list: newObvData,
                    active: {
                        ...obvData,
                    }
                }
            })
            setTimeout(function () {
                handlePopup(true);
            }, 1200)
            setSuccess({message: response?.data?.success});
            setError('');
        })
        .catch((error)=> {
            console.log(error);
        })
    }


    useEffect(()=> {
        let watched = !(observationListData?.active?.like_watch_count_data?.is_watch);
        if (watched && data?.id && user) {
            handleWatchCounter(data?.id).then(r => r)
        }
    }, [data?.id, observationListData?.active?.like_watch_count_data?.is_watch])

    return (
        <div className="more-details">
            <Row>
                <Col md={12}>
                    <Row className="align-items-center">
                        <Col sm={3}>
                            <h6 className="m-0 text-uppercase fw-normal">Azimuth</h6>
                        </Col>
                        <Col sm={9} className="text-end">
                            <p className="selected_direction rounded-circle mb-0 d-inline-flex align-items-center justify-content-center fw-bold">
                                <span>{data?.images[0]?.azimuth}</span>
                                <i style={{'--selected-angle': `${getdirectionDegree(data?.images[0]?.azimuth)}deg` }} className="direction_arrow d-flex align-items-center justify-content-center position-absolute left-0 right-0 top-0 bottom-0"></i>
                            </p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row className="align-items-center">
                        <Col sm={3}>
                            <h6 className="m-0 text-uppercase fw-normal">When</h6>
                        </Col>
                        <Col sm={9}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold text-end position-relative">{(data?.images[0]?.obs_date_time_as_per_utc) ? moment.utc(moment(data?.images[0]?.obs_date_time_as_per_utc).utc()).format("MMM DD, YYYY"): null}
                                <span className="d-flex align-items-center justify-content-end fw-normal ms-1"> {(data?.images[0]?.obs_date_time_as_per_utc) ? moment.utc(moment(data?.images[0]?.obs_date_time_as_per_utc).utc()).format("hh:mm:ss A"): null}
                                    <Badge className="bg-black text-white p-1 fw-normal ms-1">{(data?.images[0]?.obs_date_time_as_per_utc) ?'UTC': null}</Badge>
                                </span>
                            </p>
                        </Col>
                    </Row>
                    <div className="border-line my-2"></div>
                    <Row className="align-items-center">
                        <Col sm={3}>
                            <h6 className="m-0 text-uppercase fw-normal">LOCATION</h6>
                        </Col>
                        <Col sm={9}>
                            <p className="mb-0 h-100 d-flex align-items-center justify-content-end fw-bold text-end">
                            <ReactCountryFlags country= {data?.images[0]?.country_code} />
                            <span className="ms-1">{data?.images[0]?.location}</span></p>
                        </Col>
                    </Row>
                    <div className="border-line my-2 mb-4"></div>
                    <Row>
                        {user &&
                            <Col sm={12}>
                                <button className={`btn btn-${like ? '' : 'outline-'}primary like-btn w-100 d-flex align-items-center justify-content-center py-2 mb-3`} onClick={()=> handleLike(data?.id)} disabled={like}>
                                    <Icon icon={`heroicons-${like ? 'solid' : 'outline'}:thumb-up`} width="25" height="25" className="me-2" />
                                    <span>{like ? 'Liked' : 'Like'}</span>
                                </button>
                            </Col>
                        }
                        {success && success?.message &&
                            <UncontrolledAlert color="success" data-dismiss="alert" dismissible="true" className="text-left">
                                {success?.message}
                            </UncontrolledAlert>
                        }

                        {error?.notAllowed &&
                            <UncontrolledAlert color="danger" data-dismiss="alert" dismissible="true" className="text-left">
                                {error?.notAllowed}
                            </UncontrolledAlert>
                        }

                        {superuser && window.location.href.split('/')[window.location.href.split('/').length-1] === routeUrls.dashboard && activeType !== 'verified' && activeType !== 'denied' &&
                            <Col sm={12}>
                                <div className='w-100 d-flex justify-content-between align-items-center verify-btns mb-4'>
                                    <Button color="success" onClick={()=> handleApproveObservation(data?.id)} className="me-2 text-uppercase fw-bold px-5"><Icon icon="ci:circle-check-outline" className='me-1' />Approve</Button>
                                    <Button color="primary" className='text-uppercase fw-bold px-4' onClick={()=> {handleCloseRejectPopup()}} outline><Icon icon="zondicons:close-outline" className='me-1' />Reject</Button>
                                </div>
                            </Col>
                        }
                        <Col sm={12}>
                            <ObservationLikeViewCounter likeView={observationListData?.active?.like_watch_count_data} commentCount={obvCommentCount} />
                        </Col>
                    </Row>
                    <div className="border-line my-4"/>
                    {data?.user_data?.is_can_vote && !data?.user_data?.is_voted && data?.category_data.length > 0 && window.location.href.split('/')[window.location.href.split('/').length-1] === routeUrls.gallery && 
                    <Form onSubmit={handleVote}>
                        <h4 className="mt-3">Vote for observation</h4>
                        {data?.category_data?.map((item, index) => {
                            return(
                                <div key={index} className="question-box mt-3 d-inline-block w-100">
                                    
                                {!selected?.[item?.id] ? <>
                                <h5 className="mb-3 fw-normal text-black">Is this a {item.name}?</h5>
                                <div className="d-flex">
                                    <Button className="gray-outline-btn me-2 px-3" onClick={()=> handleVoteClick('no'+index, item?.id, index)}>No</Button>
                                    <Button className="px-3" onClick={()=> handleVoteClick('yes'+index, item?.id, index)}>Yes</Button>
                                </div>
                                </> : 
                                    <h5> You have voted for {item?.name} to {(selected?.[item?.id].vote) ? 'Yes' : 'No'}</h5>}
                            </div>
                            )
                        })}
                        <Button disabled={ (selected != undefined && (Object.keys(selected)?.length === data?.category_data?.length)) ? false:true} className="like-btn mt-4 w-100 d-flex align-items-center justify-content-center py-2 mb-3">
                            <Icon icon="heroicons-solid:thumb-up" width="25" height="25" className="me-2" />
                            <span>Vote this observation</span>
                        </Button>

                    </Form>
                    } 
                </Col>
            </Row>

            <RejectObvservationPopup
                data={data}
                user={user}
                token={token}
                openRejectModal={openRejectPopup}
                handleCloseRejectObs={handleCloseRejectPopup}
                handleDetailPopup={handlePopup}
                approveReject={approveRejectEvent}
            />

        </div>
    )
}

export default ObservationMoreDetails;