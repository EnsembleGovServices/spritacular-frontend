import {Outlet} from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import {Toaster} from "react-hot-toast";
import React, {useEffect, useState} from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";


const Master = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();


    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                if (auth) {
                    await refresh();
                }
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setIsLoading(false);
            }
        }

        if (isLoading && localStorage.getItem('refresh')) {
            !auth?.token?.access ? verifyRefreshToken() : setIsLoading(false)
        }

    }, [auth, isLoading, refresh])


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