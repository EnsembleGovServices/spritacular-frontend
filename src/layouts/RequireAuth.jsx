import {useEffect} from 'react';
import {useLocation, Navigate, Outlet, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {routeUrls} from '../helpers/url';

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
        persist && auth?.user?.id ? <Outlet/> : <Navigate to={routeUrls.login} state={{from: location}} replace/>
    );
}

export default RequireAuth;