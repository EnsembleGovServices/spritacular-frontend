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
    const { auth, persist } = useAuth();

    localStorage.setItem("persist", persist ? persist : false);

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setIsLoading(false);
            }
        }
        console.log(isLoading);

        !auth?.access ? verifyRefreshToken() : setIsLoading(false);
    }, [])

    useEffect(() => {
        localStorage.setItem('refresh', auth?.refresh)
        console.log(`aT: ${JSON.stringify(auth?.access)}`)
        console.log(`rT: ${JSON.stringify(auth?.refresh)}`)
    }, [auth])

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