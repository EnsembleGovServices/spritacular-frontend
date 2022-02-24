import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {AuthProvider} from "./context/AuthProvider";



ReactDOM.render(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>,
  document.getElementById("root")
);