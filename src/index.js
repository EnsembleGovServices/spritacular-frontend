import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider} from "./context/AuthProvider";
import {registerServiceWorker} from "./serviceWorker";

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path="/*" element={<App/>}/>
            </Routes>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
const worker = navigator;

if (worker.serviceWorker !== undefined) {
    registerServiceWorker().then(r => r);
} else {
    console.log('service worker is not supported in browser')
}
