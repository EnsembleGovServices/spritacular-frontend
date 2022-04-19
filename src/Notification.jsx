import React, {useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import {getTokens,onMessageListener} from './firebase';

const Notification = () => {
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({title: '', body: ''});
    const [isTokenFound, setTokenFound] = useState(false);
    
    
    useEffect(() =>{
      getTokens();
      if(isTokenFound === false){
      }
      setTokenFound(true);
    },[isTokenFound])
  
    onMessageListener().then(payload => {
      setShow(true);
      setNotification({title: payload.notification.title, body: payload.notification.body})
      console.log(payload);
    }).catch(err => console.log('failed: ', err));

    return (
        <div className="App">
            <h1>{notification.body}</h1>
            {/* <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
              position: 'absolute',
              top: 20,
              right: 20,
              minWidth: 200
            }}>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded mr-2"
                  alt=""
                />
                <strong className="mr-auto">{notification.title}</strong>
                <small>just now</small>
              </Toast.Header>
              <Toast.Body>{notification.body}</Toast.Body>
            </Toast> */}
          <header className="App-header">
            {/* {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
            {!isTokenFound && <h1> Need notification permission ❗️ </h1>} */}
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <button onClick={() => setShow(true)}>Show Toast</button>
          </header>
    
    
        </div>
      );
}

export default Notification