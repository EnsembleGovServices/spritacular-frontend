import React, {useState, useLayoutEffect, useRef} from 'react'
import {getTokens, onMessageListener} from './firebase';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { Icon } from "@iconify/react";
import useAuth from "../../hooks/useAuth";
import Tippy from "@tippyjs/react";
import moment from "moment";
import axios from "../../api/axios";
import {baseURL} from "../../helpers/url";



const Notification = (props) => {
    const  {notificationArray,setNotificationArray} = props;
    const {auth} = useAuth();
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState(false);
    const [isTokenFound, setTokenFound] = useState(false);
    
    const [notificationDropdown, setNotificationDropdown] = useState(false);
    const [data,setData] = useState([]);

    const notificationDropDownRef = useRef(null);

    useLayoutEffect(()=> {
      setTokenFound(true);
      if (isTokenFound) {
        getTokens(auth?.user?.id, auth?.token?.access, auth?.user).then(r => r);
      }
    }, [isTokenFound])
  
    useLayoutEffect(()=> {

      onMessageListener().then(payload => {
        // console.log('payload here', payload);
        setShow(true);
        setNotification(true);
        setNotificationArray([...notificationArray, payload]);
        setData([payload,...data]);
      }).catch(err => console.log('failed: ', err));

    }, [data, notificationArray, setNotificationArray, show])

    const handleNotificationStatusUpdate = async (e, notificaitonIds) => {
      await axios.post(baseURL.api+'/notification/read_user_notification/',{'notification_ids': notificaitonIds}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.token?.access}`
                }
            })
          .then((response)=> {
                // console.log(response);
                setData([]);
                setTimeout(function () {
                    setNotificationArray([])
                }, 1500)
            })
          .catch((error)=> {
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
                      toggle={ () => setNotificationDropdown(!notificationDropdown)}
            >
            <DropdownToggle className="notification">
              <Icon icon="ic:baseline-notifications" />
              {notification && <span className="notify" />}
            </DropdownToggle>
            <DropdownMenu  ref={notificationDropDownRef} container="body" className="notify-open_menu">
              <DropdownItem key={0} header>
                { notificationArray?.length > 0  ? (
                    <div className="d-flex align-items-center justify-content-between">
                      <span>Notifications {notificationArray?.length}</span>
                      <button className="btn btn-link p-0 m-0" onClick={event => handleMarkAsRead(event)}>
                        <Icon icon="bi:check-circle" />
                      </button>
                    </div>
                )  : 'No new Notifications'}

              </DropdownItem>
              <DropdownItem divider />
              {notificationArray?.length > 0 ? (
                  notificationArray?.map((item,index) => {
                      return (
                          <div key={index} className="drp-c">
                              <DropdownItem key={index}>
                                  <div className="notify_wrapper">
                                      <Tippy animation="perspective" content={item.data?.from_user}>
                                          {item.notification?.image  ?
                                              <div className="user-img">
                                                  <img className="img-fluid" src={item.notification?.image} alt="user Profile" />
                                              </div>
                                              :
                                              <div className="user-img">
                                                  <Icon className="img-fluid" icon="entypo:user" />
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
                              <DropdownItem divider />
                          </div>
                      )
                  })
              ) : (
                  <div className="d-flex align-items-center justify-content-center" style={{ height: "190px"}}>
                      <h5>All caught up!</h5>
                  </div>
              )}
              </DropdownMenu>
            </Dropdown>
            
      );
}

export default Notification