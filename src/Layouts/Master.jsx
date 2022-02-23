import {Outlet} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export const baseURL = {
    'base': process.env.REACT_APP_BASE_REMOTE,
    'api': process.env.REACT_APP_API_URL
}

const Master = () => {
    const  {auth} = useAuth();
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUsers = async () => {
            try {
                if (auth) {
                    const response = await axiosPrivate.get(process.env.REACT_APP_API_USER_URL, {
                        signal: controller.signal,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${auth?.token?.access}`
                        },
                        withCredentials: true,
                    });
                    console.log(response.data);
                    isMounted && setUsers(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        }

        getUsers().then(r => r);

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [auth, axiosPrivate, location, navigate])
    return <Outlet />;
}
export default Master;