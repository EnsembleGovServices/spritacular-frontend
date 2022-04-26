import React, {useState, useLayoutEffect} from 'react'
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
import {baseURL} from "../..//helpers/url";



const Notification = (props) => {
  const  {notificationArray,setNotificationArray} = props;
  const {auth} = useAuth();
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState(false);
    const [isTokenFound, setTokenFound] = useState(false);
    
    const [notificationDropdown, setNotificationDropdown] = useState(false);
    // const [notificationArray,setNotificationArray] = useState([]);
    const [data,setData] = useState([]);

    useLayoutEffect(()=> {
      setTokenFound(true);
      if (isTokenFound) {
        getTokens(auth?.user?.id, auth?.token?.access, auth?.user).then(r => r);
      }
    }, [isTokenFound])
  
    useLayoutEffect(()=> {
      onMessageListener().then(payload => {
        console.log('payload here', payload);
        setShow(true);
        setNotification(true);
        setNotificationArray([payload,...notificationArray]);
        setData([payload,...data]);
      }).catch(err => console.log('failed: ', err));
    }, [notificationArray, show])
    const handleNotificationStatusUpdate = (e) => {
      var notificaitonIds = []
      data.map((item,index) => {
        notificaitonIds.push(item.data.notification_id);
      })
      axios.post(baseURL.api+'/notification/read_user_notification/',{'notification_ids': notificaitonIds
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth?.token?.access}`
        }
    })
    .then((response)=> {
      console.log(response);
      setData([]);
    })
    .catch((error)=> {console.log(error)})
    }

    return (
            <Dropdown className="notify_menu" onClick={ e => {setNotification(false); if(notification) handleNotificationStatusUpdate(e)}} isOpen={notificationDropdown} toggle={ () => setNotificationDropdown(!notificationDropdown)}>
            <DropdownToggle className="notification">
              <Icon icon="ic:baseline-notifications" />
              {notification && <span className="notify" />}
            </DropdownToggle>
            <DropdownMenu container="body" className="notify-open_menu">
              <DropdownItem key={0} header> { notificationArray?.length > 0  ? 'Notifications ('+ `${notificationArray?.length}` +')'  : 'No new Notificaitons'} </DropdownItem>
              <DropdownItem divider />
              {notificationArray?.map((item,index) => {
                return (
                  <div key={index}>
                  <DropdownItem key={index}>
                  <div className="notify_wrapper">
                  <Tippy animation="perspective" content={item.data?.from_user}>
                    {item.notification?.image  ? 
                      <i><img src={item.notification?.image} alt="user Profile" /></i> 
                    : 
                    <Icon icon="entypo:user" />
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
                })}
              </DropdownMenu>
            </Dropdown>
            
      );
}

export default Notification