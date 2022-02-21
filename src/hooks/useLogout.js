import axios from "../api/server";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    return async () => {
        setAuth({});
        try {
            await axios('/', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    };
}

export default useLogout