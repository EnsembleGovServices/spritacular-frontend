// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBJpdPnsci63VmZOCMZ0NvNSzMq5D0424I",
    authDomain: "spritacular-a130e.firebaseapp.com",
    projectId: "spritacular-a130e",
    storageBucket: "spritacular-a130e.appspot.com",
    messagingSenderId: "656679339522",
    appId: "1:656679339522:web:eed28084c22f65f585c91b",
    measurementId: "G-8KJQ3TYZYB"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    // console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(notificationTitle,
        notificationOptions);
});