import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                if (persist) {
                    await refresh();
                }
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        !auth?.token?.access ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [auth, auth?.token?.access, refresh])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.token?.access)}`)
        console.log(`rT: ${JSON.stringify(auth?.token?.refresh)}`)
    }, [auth?.token?.access, auth?.token?.refresh, isLoading])

    return (
        <>
            {!persist ? (
                <>
                    <Header />
                    <Outlet />
                    <Footer/>
                </>
            ) : isLoading ? <p>Loading...</p> : (
                <>
                    <Header />
                    <Outlet />
                    <Footer/>
                </>
            )}
        </>
    )
}

export default PersistLogin;