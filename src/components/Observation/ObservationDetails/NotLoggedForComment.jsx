import '../../../assets/scss/component/not-logged-for-comment.scss';
import Images from "../../../static/images";
import React, {useState} from "react";

import LoginPopup from "../../Popup/LoginPopup";
import RegisterPopup from "../../Popup/RegisterPopup";

const NotLoggedForComment = () => {
    const [isLoginModal, setIsLoginModal] = useState(false);
    const [isRegisterModal, setIsRegisterModal] = useState(false);

    const handleLoginModal = () => {
        setIsLoginModal(!isLoginModal);
        setIsRegisterModal(false);
    };
    const handleRegisterModal = () => {
        setIsRegisterModal(!isRegisterModal);
    };
    return (
        <>
            <div className="not-logged-for-comment">
                <div className="nlfc-content">
                    <img className="img-fluid" src={Images.notLoggedIn} alt="noComments"/>
                    <h6 className="title">You need to be logged in for commenting on this observation</h6>
                    <div className="mt-4 btn-wrap">
                        <button onClick={() => handleLoginModal()} type="button"
                                className="btn btn-outline-primary px-4 my-2">Login
                        </button>
                        <button onClick={() => handleRegisterModal()} type="button"
                                className="btn btn-primary px-4 my-2 ms-3">Register
                        </button>
                    </div>
                </div>
            </div>

            {isLoginModal &&
                <LoginPopup
                    open={isLoginModal}
                    handleClose={handleLoginModal}
                />
            }

            {isRegisterModal && (
                <RegisterPopup
                    open={isRegisterModal}
                    handleClose={handleRegisterModal}
                    handleLoginModal={handleLoginModal}
                    modalClass="registerModal"
                />
            )}
        </>
    )
}
export default NotLoggedForComment;