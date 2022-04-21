
import { getMessaging, onMessage, getToken} from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import axios from "./api/axios";
import {baseURL} from "./helpers/url";

const firebaseConfig = {
    apiKey: "AIzaSyBJpdPnsci63VmZOCMZ0NvNSzMq5D0424I",
    authDomain: "spritacular-a130e.firebaseapp.com",
    projectId: "spritacular-a130e",
    storageBucket: "spritacular-a130e.appspot.com",
    messagingSenderId: "656679339522",
    appId: "1:656679339522:web:eed28084c22f65f585c91b",
    measurementId: "G-8KJQ3TYZYB"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);



//   export const onMessageListener = () =>
//   new Promise((resolve) => {
//     messaging.onMessage(messaging, (payload) => {
//       console.log("payload", payload)
//       resolve(payload);
//     });
//   });

  export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});

  export const getTokens = (userId,token) => {
    return getToken(messaging, {vapidKey:'BHJd0Y2Y1ZUvZ40ZuoL7memg_6g_ACYqk3M6oM9ebRn5rzQ2O_WqDgURWls5A8WyWPyHCyIT5SGA6DyU6hLQwzI'}).then((currentToken) => {
        console.log(currentToken);
      if (currentToken) {
        console.log('current token for client: ', currentToken);

        axios.post('http://127.0.0.1:8000/devices/',{"user": userId, "registration_id":currentToken, "type": "web"}, {
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
