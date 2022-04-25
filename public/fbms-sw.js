import firebase from "firebase/compat";
import {firebaseConfig} from "../src/helpers/firebase";

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = 'hello world';
    const notificationOptions = {
        body: payload.data.body,
        icon: '/firebase-logo.png'
    };
    // eslint-disable-next-line no-restricted-globals
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('notificationclick', event => {
    console.log(event)
    return event;
});