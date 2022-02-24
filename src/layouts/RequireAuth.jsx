import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { persist } = useAuth();
    const location = useLocation();

    return (
        persist ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;