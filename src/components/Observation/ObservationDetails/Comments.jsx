import {useEffect, useRef, useState} from "react";
import {baseURL} from "../../../helpers/url";
import axios from "../../../api/axios";
import moment from "moment";
import useAuth from "../../../hooks/useAuth";
import {Button, FormGroup} from "reactstrap";
import "../../../assets/scss/component/comments.scss";
import { Icon } from '@iconify/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const Comments = (props) => {
    const { auth } = useAuth();
    const {obvId} = props;
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState();
    const [signal, setSignal] = useState(false);
    const commentBox = useRef(null);

    const getComments = async () => {
        // setLoading(true);
        await axios.get(baseURL.api+'/observation/comment/'+obvId+'/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.token?.access}`
            }
        })
            .then((response)=> {
                setComments(response?.data);
                // setLoading(false);
            })
            .catch((error)=> {
                console.log(error);
                // setLoading(false);
            })
    }

    const sendComment = async (e) => {
        e.preventDefault();
        setSignal(false);
        await axios.post(baseURL.api+'/observation/comment/'+obvId+'/', {text: message} , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.token?.access}`
            }
        })
            .then((response)=> {
                setSignal(true);
                commentBox.current.value = "";
                setMessage("")
            })
            .catch((error)=> {
                setSignal(true);
            })
    }


    useEffect(()=> {
        commentBox.current.focus = true;
        getComments().then(r => r);
    }, [signal])



    const handleCommentText = (e) => {
      const value = e.target.value;
      setMessage(value);
    }
    const showMessages = () => {
        return comments?.data?.filter(item => item?.is_active).map((item, index) => {
            return(
                <li key={index} className="d-flex align-items-center w-100">
                    <i className="profile-icon rounded-circle me-0"><LazyLoadImage effect="blur" src={item?.user_data?.profile_image} width='100%' height='100%' alt="Profile" className="rounded-circle" /></i>
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

    useEffect(()=> {
        getComments().then(r => r);
    }, [])

    return (
        <>
            <div className="comment-wrapper position-relative">
                <ul className="comment-area p-0 m-0">
                    {comments?.data?.length ? showMessages() : <p className="text-center">No comments yet!</p>}
                </ul>
                <form onSubmit={sendComment}>
                    <FormGroup className="typing-area d-flex justify-content-between align-items-center start-0 bottom-0">
                        <input
                            className="form-control"
                            type="text"
                            name="text"
                            ref={commentBox}
                            placeholder="Write here.."
                            onChange={(e) => handleCommentText(e)}
                        />
                        <Button disabled={message?.length === 0} className="send-btn shadow-none border-0 position-absolute end-0 pe-3"><Icon icon="bi:send" color={message?.length === 0 ? '#ccc' : '#900'} /></Button>
                    </FormGroup>
                </form>
            </div>
        </>
    )
}

export default Comments;