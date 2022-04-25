export const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./fbms-sw.js')
            .then(function (registration) {
                console.log('[SW]: SCOPE: ', registration.scope);
                return registration.scope;
            })
            .catch(function (err) {
                return err;
            });
    }
    else {
        console.log('Service workers are not supported.');
    }
};