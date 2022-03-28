import { Button, FormGroup, Input } from "reactstrap";
import { Icon } from '@iconify/react';
import "../../../assets/scss/component/comments.scss";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Images from "../../../static/images";

const Comments = () => {
    return (
        <>
            <div className="comment-wrapper h-100">
                <div className="comment-area">
                    <ul className="p-0 m-0">
                        <li className="d-flex align-items-center w-100">
                            <i className="profile-icon rounded-circle me-0"><LazyLoadImage effect="blur" src={Images.Profile} width='100%' height='100%' alt="Profile" className="rounded-circle" /></i>
                            {/* User sort name  */}
                            {/* <i className="profile-text rounded-circle bg-black text-white">JD</i> */}
                            <div className="commentor_details d-flex justify-content-between align-items-center">
                                <div className="comment-profile_details">
                                    <h6 className="mb-1 text-truncate text-black">Emily Ford</h6>
                                    <p className="mb-0 fw-normal">Nice shot!</p>
                                </div>
                                <span className="comment-time fw-normal">April 30</span>
                            </div>
                        </li>
                        <li className="d-flex align-items-center w-100">
                            <i className="profile-icon rounded-circle me-0"><LazyLoadImage effect="blur" src={Images.Profile} width='100%' height='100%' alt="Profile" className="rounded-circle" /></i>
                            {/* User sort name  */}
                            {/* <i className="profile-text rounded-circle bg-black text-white">JD</i> */}
                            <div className="commentor_details d-flex justify-content-between align-items-center">
                                <div className="comment-profile_details">
                                    <h6 className="mb-1 text-truncate text-black">Emily Ford</h6>
                                    <p className="mb-0 fw-normal">Nice shot!</p>
                                </div>
                                <span className="comment-time fw-normal">March 30</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <FormGroup className="typing-area d-flex justify-content-between align-items-center position-relative">
                    <Input type="text" placeholder="Write here.." />
                    <Button className="send-btn shadow-none border-0 position-absolute end-0 pe-3"><Icon icon="bi:send" color="#900" /></Button>
                </FormGroup>
            </div>
        </>
    )
}

export default Comments;