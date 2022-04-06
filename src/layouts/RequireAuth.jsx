import { useEffect } from 'react';
import {useLocation, Navigate, Outlet, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { routeUrls } from '../helpers/url';

const RequireAuth = (props, { allowedRoles }) => {
    const { persist, auth } = useAuth();
    const {setAuthValue} = props;
    const location = useLocation();
    const navigate = useNavigate();
    const route = location.pathname.replace('/', '').toLowerCase();

    const Roles = {
        'superuser' : auth?.user?.is_superuser,
        'trained' : auth?.user?.is_trained,
        'user' : auth?.user?.is_user,
    }

    useEffect(()=>{
        setAuthValue(false);
    }, [setAuthValue])

    useEffect(()=> {
        console.log(Roles?.user);

        if (route === 'dashboard' && Roles?.user) {
           navigate('/unauthorized');
           return true;
        }
        return false;
    }, [Roles?.user, auth.user, navigate, route])

    return (
        persist ? <Outlet /> : <Navigate to={routeUrls.home} state={{ from: location }} replace />
    );
}

export default RequireAuth;