import {getMessaging, onMessage, getToken} from 'firebase/messaging';

import {initializeApp} from 'firebase/app';
import axios from "../../api/axios";
import {baseURL} from "../../helpers/url";
import {firebaseConfig} from "../../helpers/firebase";

const firebaseApp = initializeApp(firebaseConfig);
const messaging = navigator && navigator?.serviceWorker !== undefined && getMessaging(firebaseApp);

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });


export const getTokens = async (userId, token, auth) => {
    if (navigator?.serviceWorker !== undefined) {
        return getToken(messaging, {vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY}).then((currentToken) => {
            if (currentToken && auth) {
                axios.post(baseURL.api + '/devices/', {
                    "user": userId,
                    "registration_id": currentToken,
                    "type": "web"
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }).then((response) => {
                    // process.env.NODE_ENV === "development" && console.log('found response', response);
                }).catch((error) => {
                    // process.env.NODE_ENV === "development" && console.log('NotificationComponent error, Request permission to generate one.');
                })

            }
        }).catch((err) => {
            // shows on the UI that permission is required
            // process.env.NODE_ENV === "development" && console.log('NotificationComponent permission denied. Request permission to generate one.');
            // process.env.NODE_ENV === "development" && console.log('An error occurred while retrieving token. ', err);
            // catch error while creating client token
        });
    }
    return false;
}
