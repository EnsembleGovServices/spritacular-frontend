import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import Loader from "../components/Shared/Loader";

// const Header = lazy(()=> import('../components/Common/Header'))
// const Footer = lazy(()=> import('../components/Common/Footer'))
// const Loader = lazy(()=> import('../components/Shared/Loader'))

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                if (persist && localStorage.getItem('refresh')) {
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
    }, [auth, auth?.token?.access, persist, refresh])

    useEffect(() => {
        // console.log(`isLoading: ${isLoading}`)
        // console.log(`aT: ${JSON.stringify(auth?.token?.access)}`)
        // console.log(`rT: ${JSON.stringify(auth?.token?.refresh)}`)
    }, [auth?.token?.access, auth?.token?.refresh, isLoading])


    return (
        <>
            {!persist ? (
                <>
                    {/* <Suspense fallback={''}> */}
                        <Header />
                    {/* </Suspense> */}
                    <div className="main-content">
                        <Outlet />
                    </div>
                    {/* <Suspense fallback={''}> */}
                        <Footer />
                    {/* </Suspense> */}
                </>
            ) : isLoading ? <Loader fixContent={true} /> : (
                <>
                    {/* <Suspense fallback={''}> */}
                        <Header />
                    {/* </Suspense> */}
                    <div className="main-content">
                        <Outlet />
                    </div>
                    <Footer />
                </>
            )}
        </>
    )
}

export default PersistLogin;