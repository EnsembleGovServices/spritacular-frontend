import { Outlet } from "react-router-dom";
import {useState, useEffect} from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import Loader from "../components/Shared/Loader";
import axios from "../api/axios";
import {baseURL} from "../helpers/url";

// const Header = lazy(()=> import('../components/Common/Header'))
// const Footer = lazy(()=> import('../components/Common/Footer'))
// const Loader = lazy(()=> import('../components/Shared/Loader'))

const PersistLogin = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist, setAuth } = useAuth();
    const { persistValue } = props;
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
        if (auth?.token?.access) {
            axios.get(baseURL.api + '/users/camera_setting/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.token?.access}`
                }
            }).then((response) => {
                setAuth(prev => {
                    return {
                        ...prev,
                        camera: response?.data
                    }
                });
            }).catch((error) => {
                console.log(error.response);
            })
        }
    }, [auth?.token?.access, setAuth])


    useEffect(() => {
        // console.log(`isLoading: ${isLoading}`)
        // console.log(`aT: ${JSON.stringify(auth?.token?.access)}`)
        // console.log(`rT: ${JSON.stringify(auth?.token?.refresh)}`)
    }, [auth?.token?.access, auth?.token?.refresh, isLoading])

    return (
        <>
            {!persist ? (
                <>
                    <Header />
                    <div className="main-content">
                        <Outlet />
                    </div>
                    <Footer />
                </>
            ) : isLoading ? <Loader fixContent={true} /> : (
                <>
                    <Header />
                    <div className="main-content">
                        <Outlet />
                    </div>
                    {persistValue && <Footer />}
                    
                </>
            )}
        </>
    )
}

export default PersistLogin;