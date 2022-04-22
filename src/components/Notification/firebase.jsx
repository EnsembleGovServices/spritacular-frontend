import { getMessaging, onMessage, getToken} from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import axios from "../../api/axios";
import {baseURL} from "../../helpers/url";
import {firebaseConfig} from "../../helpers/firebase";

  const firebaseApp = initializeApp(firebaseConfig);
  const messaging = getMessaging(firebaseApp);

  export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

  export const getTokens = (userId,token) => {
    return getToken(messaging, {vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        axios.post(baseURL.api+'/devices/',{"user": userId, "registration_id": currentToken, "type": "web"}, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      })
      .then((response)=> {
        console.log(response);
      })
      .catch((error)=> {console.log(error)})
        // setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        // setTokenFound(false);
        // setTokenFound(true);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
        // shows on the UI that permission is required 

      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  
}
