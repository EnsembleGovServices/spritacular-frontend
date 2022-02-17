import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import {Toaster} from "react-hot-toast";
import React from "react";

const Master = () => {
    return(
        <>
            <Toaster />
            <Header />
            <main role="main">
                <Outlet />
            </main>
            <Footer/>
        </>
    )
}
export default Master;