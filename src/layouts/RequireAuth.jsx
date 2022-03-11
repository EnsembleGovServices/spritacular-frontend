import { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { routeUrls } from './../helpers/url';

const RequireAuth = (props) => {
    const { persist } = useAuth();
    const location = useLocation();

    const {setAuthValue} = props;
    
    useEffect(()=>{
        setAuthValue(false);
    }, [setAuthValue])

    return (
        persist ? <Outlet /> : <Navigate to={routeUrls.home} state={{ from: location }} replace />
    );
}

export default RequireAuth;