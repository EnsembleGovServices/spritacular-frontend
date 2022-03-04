import {createContext, useMemo, useState} from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return(
        <AuthContext.Provider value={useMemo(()=> ({auth, setAuth,  persist, setPersist}), [auth, setAuth,  persist, setPersist])}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;