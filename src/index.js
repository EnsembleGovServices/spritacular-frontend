import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider} from "./context/AuthProvider";
import {registerServiceWorker} from "./serviceWorker";
// import ScrollToTop from "./helpers/ScrollToTop";

ReactDOM.render(
    <BrowserRouter>
        {/*<ScrollToTop />*/}
        <AuthProvider>
            <Routes>
                <Route path="/*" element={<App/>}/>
            </Routes>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById("root")
);

registerServiceWorker();