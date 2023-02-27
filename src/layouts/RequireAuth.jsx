import {useEffect} from 'react';
import {useLocation, Navigate, Outlet, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {baseURL, routeUrls} from '../helpers/url';
import PageMeta from "../meta/PageMeta";

const RequireAuth = (props) => {
    const {persist, auth} = useAuth();
    const {setAuthValue, allowedRoles} = props;
    const location = useLocation();
    const navigate = useNavigate();
    const route = location.pathname.replace('/', '').toLowerCase();

    useEffect(() => {
        setAuthValue(false);
    }, [setAuthValue])

    useEffect(() => {
        if (route === 'dashboard' && !(allowedRoles.superuser)) {
            navigate('/unauthorized', {replace: true});
            return true;
        }
    }, [allowedRoles, navigate, route])


    return (
        persist && auth ? <>
            <PageMeta title={baseURL.appName} description="Authorized users only!" noIndex={true}/>
            <Outlet/>
        </> : <Navigate to={routeUrls.login} state={{from: location}} replace/>
    );
}

export default RequireAuth;