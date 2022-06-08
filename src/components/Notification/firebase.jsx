import {getMessaging, onMessage, getToken} from 'firebase/messaging';

import {initializeApp} from 'firebase/app';
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


export const getTokens = (userId, token, auth) => {
    return getToken(messaging, {vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY}).then((currentToken) => {
        if (currentToken && auth) {
            // console.log('current token for client: ', currentToken);
            axios.post(baseURL.api + '/devices/', {"user": userId, "registration_id": currentToken, "type": "web"}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                // console.log('found response', response);
            }).catch((error) => {
                // console.log('NotificationComponent error, Request permission to generate one.');
            })

        }
    }).catch((err) => {
        // shows on the UI that permission is required 
        // console.log('NotificationComponent permission denied. Request permission to generate one.');
        // console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });

}
