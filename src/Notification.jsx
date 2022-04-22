import React, {useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import {getTokens,onMessageListener} from './firebase';
import {
  Button,
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem
} from "reactstrap";
import Images from "./static/images";
import { Icon } from "@iconify/react";
import useAuth from "./hooks/useAuth";
import Tippy from "@tippyjs/react";
import moment from "moment";


const Notification = () => {
  const {auth} = useAuth();
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState(false);
    const [isTokenFound, setTokenFound] = useState(false);
    
    const [notificationDropdown, setNotificationDropdown] = useState(false);
    const [notificationArray,setNotificationArray] = useState([]);
    const [data,setData] = useState([]);
    useEffect(() =>{
      getTokens(auth?.user?.id,auth?.token?.access);
      if(isTokenFound === false){
      }
      setTokenFound(true);
    },[isTokenFound])
  
    onMessageListener().then(payload => {
      setShow(true);
      setNotification(true);
      console.log(payload);
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
                <DropdownItem key={0} header> { notificationArray?.length > 0  ? 'Notifications ('+ `${notificationArray?.length}` +')'  : 'No new Notificaitons'} </DropdownItem>
                <DropdownItem divider />
                {notificationArray?.map((item,index) => {
                  return (
                    <>
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
                        <span>{moment(data[0]?.sent_at).fromNow(true)}</span>
                      </div>
                    </div>
                  </DropdownItem>
                  <DropdownItem divider />
                  </>
                  )
                })}
                
                {/* <DropdownItem>
                  <div className="notify_wrapper">
                    <i><img src={Images.UserProfile} alt="user Profile" /></i>
                    <div className="comment_wrapper">
                      <div className="comment_details">
                        <h4>New vote</h4>
                        <p>John votes your Sprite Observation</p>
                      </div>
                      <span>1h</span>
                    </div>
                  </div>
                </DropdownItem>
               
                <DropdownItem>
                  <div className="notify_wrapper">
                    <i><img src={Images.UserProfile} alt="user Profile" /></i>
                    <div className="comment_wrapper">
                      <div className="comment_details">
                        <h4>Emily replied to your comment</h4>
                        <p>Thank you!</p>
                      </div>
                      <span>1h</span>
                    </div>
                  </div>
                </DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
            
      );
}

export default Notification