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



const Notification = () => {
  const {auth} = useAuth();
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState(false);
    const [isTokenFound, setTokenFound] = useState(false);
    
    const [notificationDropdown, setNotificationDropdown] = useState(false);
    const [notificationArray,setNotificationArray] = useState([]);
    const [data,setData] = useState([]);

    useLayoutEffect(()=> {
      setTokenFound(true);
      if (isTokenFound) {
        getTokens(auth?.user?.id, auth?.token?.access, auth?.user).then(r => r);
      }
    }, [isTokenFound])
  
    onMessageListener().then(payload => {
      console.log('payload here', payload);
      setShow(true);
      setNotification(true);
      setNotificationArray([payload.notification,...notificationArray]);
      setData([payload.data]);
    }).catch(err => console.log('failed: ', err));

    return (
            <Dropdown className="notify_menu" onClick={ e => setNotification(false)} isOpen={notificationDropdown} toggle={ () => setNotificationDropdown(!notificationDropdown)}>
              <DropdownToggle className="notification">
                <Icon icon="ic:baseline-notifications" />
                {notification && <span className="notify" />}
              </DropdownToggle>
              <DropdownMenu container="body" className="notify-open_menu">
                <DropdownItem key={0} header> { notificationArray  ? `Notifications ${notificationArray?.length}`  : 'No new Notifications'} </DropdownItem>
                <DropdownItem divider />
                {notificationArray?.map((item,index) => {
                  return (
                      <div key={index}>
                        <DropdownItem key={index}>
                          <div className="notify_wrapper">
                            <Tippy animation="perspective" content={data[0]?.from_user}>
                              <i><img src={item?.image} alt="user Profile" /></i>
                            </Tippy>

                            <div className="comment_wrapper">
                              <div className="comment_details">
                                <h4>{item.title}</h4>
                                <p>{item.body}</p>
                              </div>
                              <span>5m</span>
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