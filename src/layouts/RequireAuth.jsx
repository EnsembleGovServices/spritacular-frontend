import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = (props) => {
    const { persist } = useAuth();
    const location = useLocation();

    const {setAuthValue} = props;
    
    setAuthValue(false);

    return (
        persist ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;