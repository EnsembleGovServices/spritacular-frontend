import { useEffect, useRef, useState } from "react";
import { baseURL, cdn } from "../../../helpers/url";
import axios from "../../../api/axios";
import moment from "moment";
import useAuth from "../../../hooks/useAuth";
import { Button, FormGroup } from "reactstrap";
import "../../../assets/scss/component/comments.scss";
import { Icon } from '@iconify/react';
import useObservationsData from "../../../hooks/useObservationsData";
import NoComments from "./NoComments";
import NotLoggedForComment from "./NotLoggedForComment";

const Comments = (props) => {
    const { auth } = useAuth();
    const { obvId } = props;
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState();
    const [signal, setSignal] = useState(false);
    const commentBox = useRef(null);
    const { observationComments, setObservationComments } = useObservationsData();
    const user = auth?.user?.id;
    const isComment = observationComments?.comments?.length;

    const getComments = async () => {
        await axios.get(baseURL.api + '/observation/comment/' + obvId + '/')
            .then((response) => {
                setComments(response?.data);
                setObservationComments((prev) => {
                    return {
                        ...prev,
                        comments: response?.data?.data
                    }
                })
            })
            .catch((error) => {
                process.env.NODE_ENV === "development" && console.log('GetComment Error:', error);
            })
    };

    const sendComment = async (e) => {
        e.preventDefault();
        setSignal(false);
        await axios.post(baseURL.api + '/observation/comment/' + obvId + '/', { text: message }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.token?.access}`
            }
        })
            .then((response) => {
                setSignal(true);
                commentBox.current.value = "";
                setMessage("")
            })
            .catch((error) => {
                setSignal(true);
            })
    }

    const handleCommentText = (e) => {
        const value = e.target.value;
        setMessage(value);
    }

    const showMessages = () => {
        return observationComments?.comments?.filter(item => item?.is_active).map((item, index) => {
            return (
                <li key={index} className="d-flex align-items-center w-100">
                    <i className="profile-icon rounded-circle me-0"><img
                        src={item?.user_data?.profile_image ? item?.user_data?.profile_image : `${cdn.url}/profile.svg`}
                        width='100%' height='100%' alt="Profile" className="rounded-circle" /></i>
                    <div className="commentor_details d-flex justify-content-between align-items-start">
                        <div className="comment-profile_details">
                            <h6 className="mb-1 text-truncate text-black">{item?.user_data?.first_name} {item?.user_data?.last_name}</h6>
                            <p className="mb-0 fw-normal">{item?.text}</p>
                        </div>
                        <span className="comment-time fw-normal">{moment(`${item?.created_on}`).format('DD-MMM')}</span>
                    </div>
                </li>
            )
        })
    }

    useEffect(() => {
        if (user) {
            commentBox.current.focus = true;
            getComments().then(r => r);
        }
    }, [signal])

    useEffect(() => {
        setObservationComments((prev) => {
            return {
                ...prev,
                comment_count: comments?.data ? comments?.data?.length : 0
            }
        })

    }, [comments])

    useEffect(() => {
        getComments().then(r => r);
    }, [])

    return (
        <>
            <div className={`comment-wrapper position-relative ${!user ? 'non-logged' : ''}`}>
                {!user &&
                    <div className={`p-0 m-0 ${isComment ? 'hasComments' : 'hasNoComments'}`}>
                        <NotLoggedForComment />
                    </div>
                }

                {isComment ? (
                    <ul className="comment-area not-logged-list p-0 m-0">
                        {showMessages()}
                    </ul>
                ) : (
                    (!isComment && user ? <ul className="comment-area p-0 m-0"><NoComments /></ul> : '')
                )}


                {user &&
                    <form onSubmit={sendComment}>
                        <FormGroup
                            className="typing-area d-flex justify-content-between align-items-center start-0 bottom-0">
                            <input
                                className="form-control"
                                type="text"
                                name="text"
                                ref={commentBox}
                                placeholder="Write here.."
                                onChange={(e) => handleCommentText(e)}
                            />
                            <Button disabled={message?.length === 0}
                                className="send-btn shadow-none border-0 position-absolute end-0 pe-3"><Icon
                                    icon="bi:send" color={message?.length === 0 ? '#ccc' : '#900'} /></Button>
                        </FormGroup>
                    </form>
                }
            </div>
        </>
    )
}

export default Comments;