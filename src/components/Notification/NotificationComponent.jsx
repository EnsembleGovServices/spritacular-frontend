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

    useEffect(() => {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                // console.log('granted')
                setTokenFound(true);
            } else {
                setTokenFound(false);
                // console.log('rejected')
            }
        }).catch(e => {
            console.log(e)
        });
    }, []);


    useEffect(() => {
        if (isTokenFound && auth?.user?.id) {
            getTokens(auth?.user?.id, auth?.token?.access, auth?.user).then(r => r);
        }
    }, [isTokenFound])


    useLayoutEffect(() => {
        return () => {
            onMessageListener().then(payload => {
                console.log('payload here', payload);
                setShow(true);
                setNotification(true);
                setNotificationArray([...notificationArray, payload]);
                setData([payload, ...data]);
            }).catch(err => console.log('failed: ', err));
        }
    }, [data, notificationArray, setNotificationArray, show])

    const handleNotificationStatusUpdate = async (e, notificaitonIds) => {
        await axios.post(baseURL.api + '/notification/read_user_notification/', {'notification_ids': notificaitonIds}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.token?.access}`
            }
        }).then((response) => {
            // console.log(response);
            setData([]);
            setTimeout(function () {
                setNotificationArray([])
            }, 1000)
        }).catch((error) => {
            console.log(error)
        })
    }

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
    }

    return (
        <Dropdown className="notify_menu"
                  isOpen={notificationDropdown}
                  toggle={() => setNotificationDropdown(!notificationDropdown)}
        >
            <DropdownToggle className="notification">
                <Icon icon="ic:baseline-notifications"/>
                {notification && <span className="notify"/>}
            </DropdownToggle>
            <DropdownMenu ref={notificationDropDownRef} container="body" className="notify-open_menu">
                <DropdownItem key={0} header>
                    <div className="d-flex align-items-center justify-content-between w-100">
                        <div className="title">
                            Notifications
                            {notificationArray?.length > 0 &&
                                <span className="custom-badge">{notificationArray?.length}</span>
                            }
                        </div>
                        <Tippy content="Mark as read" placement="left" interactive={true}
                               interactiveBorder={20}
                               delay={100}>
                            <button data-tippy-content="Tooltip" className="btn btn-link p-0 m-0"
                                    onClick={event => handleMarkAsRead(event)}>
                                <Icon icon="bi:check-circle"/>
                            </button>
                        </Tippy>
                    </div>
                </DropdownItem>
                {/*<DropdownItem divider />*/}
                <div className={'dropdown-body'}>
                    {notificationArray?.length > 0 ? (
                        notificationArray?.map((item, index) => {
                            return (
                                <div key={index} className="drp-c">
                                    <DropdownItem key={index}>
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
                                                <div className="comment_details">
                                                    <h4>{item.notification.title}</h4>
                                                    <p>{item.notification.body}</p>
                                                </div>
                                                <span>{moment(item.data?.sent_at).fromNow(true)}</span>
                                            </div>
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem divider/>
                                </div>
                            )
                        }).reverse()
                    ) : (
                        <div className="d-flex align-items-center flex-column justify-content-center"
                             style={{height: "190px", width: "230px"}}>
                            <img className="img-fluid mb-3"
                                 src={`${cdn.url}/success.svg`}
                                 alt="no notification"/>
                            <h6>All caught up!</h6>
                        </div>
                    )}
                </div>
            </DropdownMenu>
        </Dropdown>

    );
}

export default NotificationComponent