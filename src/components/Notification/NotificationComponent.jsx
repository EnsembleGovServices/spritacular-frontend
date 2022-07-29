import React, {useState, useLayoutEffect, useRef, useEffect} from 'react'
import {getTokens, onMessageListener} from './firebase';
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import {Icon} from "@iconify/react";
import useAuth from "../../hooks/useAuth";
import Tippy from "@tippyjs/react";
import moment from "moment";
import axios from "../../api/axios";
import {baseURL, cdn} from "../../helpers/url";


const NotificationComponent = (props) => {
    const {notificationArray, setNotificationArray} = props;
    const {auth} = useAuth();
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState(false);
    const [isTokenFound, setTokenFound] = useState(false);
    const [notificationDropdown, setNotificationDropdown] = useState(false);
    const [data, setData] = useState([]);
    const notificationDropDownRef = useRef(null);
    // const [detailsPopup, setDetailsPopup] = useState(false);


    // Store notifications id's in db
    const handleNotificationStatusUpdate = async (e, notificaitonIds) => {
        await axios.post(baseURL.api + '/notification/read_user_notification/', {'notification_ids': notificaitonIds}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.token?.access}`
            }
        }).then((response) => {
            setData([]);
            setTimeout(function () {
                setNotificationArray([])
            }, 1000)
        }).catch((error) => {
            process.env.NODE_ENV === "development" && console.log('Update Notification Failed:', error);
        })
    }

    // To clear notification list
    const handleMarkAsRead = (e) => {
        setNotification(false);
        const notificaitonIds = []
        notificationArray.map((item) => {
            return notificaitonIds.push(item.data.notification_id.toString());
        })
        handleNotificationStatusUpdate(e, notificaitonIds).then(r => r)

        let dropContent = document.querySelectorAll('.drp-c');
        dropContent.forEach(function (item) {
            return item.classList.add('markedAsRead');
        })
        setNotificationDropdown(!notificationDropdown);
    }

    // Show notification details
    // const handleDetailedNotification = (body, e) => {
    //     e.preventDefault();
    //     console.log(body);
    //     setDetailsPopup(true);
    // }

    // Hide Notification details popup
    // const closeDetailsPopup = () => {
    //     setDetailsPopup(false);
    // }

    const isSupported = navigator && navigator.serviceWorker !== undefined;

    // To handle notification permission
    useEffect(() => {
        if (isSupported) {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    setTokenFound(true);
                } else {
                    setTokenFound(false);
                }
            }).catch(e => {
                process.env.NODE_ENV === "development" && console.log('Notification Permission Error:', e);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Notification token
    useEffect(() => {
        if (isSupported) {
            if (isTokenFound && auth?.user?.id) {
                getTokens(auth?.user?.id, auth?.token?.access, auth?.user).then(r => r);
            }
        } else {
            console.log('Worker is not supported in this browser')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTokenFound])

    // Set notification before page get mounted
    useLayoutEffect(() => {
        onMessageListener().then(payload => {
            setShow(true);
            setNotification(true);
            setNotificationArray([...notificationArray, payload]);
            setData([payload, ...data]);
        }).catch(err => process.env.NODE_ENV === "development" && console.log('Notification Failed: ', err));
        return () => {
            onMessageListener().then(payload => {
                setShow(true);
                setNotification(true);
                setNotificationArray([...notificationArray, payload]);
                setData([payload, ...data]);
            }).catch(err => process.env.NODE_ENV === "development" && console.log('Notification Failed: ', err));
        }
    }, [data, notificationArray, setNotificationArray, show])

    return (
        <>
            <Dropdown className="notify_menu"
                      isOpen={notificationDropdown}
                      toggle={() => setNotificationDropdown(!notificationDropdown)}
            >
                <DropdownToggle className="notification" aria-label="notification bell">
                    <Icon icon="ic:baseline-notifications"/>
                    {notification && <span className="notify"/>}
                </DropdownToggle>
                <DropdownMenu ref={notificationDropDownRef} container="body" className="notify-open_menu">
                    <DropdownItem key={0} header>
                        {notificationArray?.length > 0 ?
                            <div className="d-flex align-items-center justify-content-between w-100">
                                <div className="title">
                                    Notifications
                                    <span className="custom-badge">{notificationArray?.length}</span>
                                </div>
                                <Tippy content="Mark as read" placement="left" interactive={true}
                                       interactiveBorder={20}
                                       delay={100}>
                                    <button className="btn p-0 m-0"
                                            onClick={event => handleMarkAsRead(event)}>
                                        <Icon icon="fa6-solid:envelope-open" color="#188038" width="22" height="20"/>
                                    </button>
                                </Tippy>

                            </div> : <div className="title">Notifications</div>
                        }
                    </DropdownItem>
                    <div className={'dropdown-body'}>
                        {notificationArray?.length > 0 ? (
                            notificationArray?.map((item, index) => {
                                return (
                                    <DropdownItem toggle={false} tag="div" className="drp-c" key={index}>
                                        <div className="notify_wrapper">
                                            <Tippy animation="perspective" content={item.data?.from_user}>
                                                {item.notification?.image ?
                                                    <div className="user-img">
                                                        <img className="img-fluid" src={item.notification?.image}
                                                             alt="user Profile"/>
                                                    </div>
                                                    :
                                                    <div className="user-img">
                                                        <Icon className="img-fluid" icon="entypo:user"/>
                                                    </div>
                                                }
                                            </Tippy>
                                            <div className="comment_wrapper">
                                                <div>
                                                    <h4>{item.notification.title}</h4>
                                                    <span>{moment(item.data?.sent_at).fromNow(true)}</span>
                                                </div>
                                                <p>{item.notification.body}</p>
                                            </div>
                                        </div>
                                    </DropdownItem>
                                )
                            }).reverse()
                        ) : (
                            <div className="d-flex align-items-center flex-column justify-content-center"
                                 style={{height: "190px"}}>
                                <img className="img-fluid mb-3"
                                     src={`${cdn.url}/success.svg`}
                                     alt="no notification"/>
                                <h6>All caught up!</h6>
                            </div>
                        )}
                    </div>
                </DropdownMenu>
            </Dropdown>

            {/* Details modal */}

            {/*<Modal*/}
            {/*    className={"notify-modal"}*/}
            {/*    isOpen={detailsPopup}*/}
            {/*    toggle={closeDetailsPopup}*/}
            {/*    centered*/}
            {/*    backdrop={true}*/}
            {/*    keyboard={false}*/}
            {/*>*/}
            {/*    <ModalHeader>*/}
            {/*        <span>Notification Details</span>*/}
            {/*        <Icon onClick={closeDetailsPopup} width={30} icon="clarity:close-line"/>*/}
            {/*    </ModalHeader>*/}
            {/*    <ModalBody>*/}
            {/*        here sir*/}
            {/*    </ModalBody>*/}
            {/*</Modal>*/}

        </>
    );
}

export default NotificationComponent