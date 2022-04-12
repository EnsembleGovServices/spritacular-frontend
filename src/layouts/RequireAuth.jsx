import { useEffect } from 'react';
import {useLocation, Navigate, Outlet, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { routeUrls } from '../helpers/url';

const RequireAuth = (props ) => {
    const { persist } = useAuth();
    const {setAuthValue, allowedRoles} = props;
    const location = useLocation();
    const navigate = useNavigate();
    const route = location.pathname.replace('/', '').toLowerCase();

    useEffect(()=>{
        setAuthValue(false);
    }, [setAuthValue])

    useEffect(()=> {
        if (route === 'dashboard' && !(allowedRoles.superuser)) {
           navigate('/unauthorized', {replace: true});
           return true;
        }
        if (route === 'observations' && (allowedRoles.superuser)) {
            navigate('/unauthorized', {replace: true});
            return true;
         }
        return true;
    }, [allowedRoles, navigate, route])


    return (
        persist ? <Outlet /> : <Navigate to={routeUrls.home} state={{ from: location }} replace />
    );
}

export default RequireAuth;