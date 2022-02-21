import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth, persist } = useAuth();

    return async () => {
        if (persist) {
            const response = await axios.post(process.env.REACT_APP_API_REFRESH_URL,{refresh: localStorage.getItem('refresh')}, {
                withCredentials: true
            });
            localStorage.setItem('refresh', response?.data?.refresh);
            setAuth(response?.data);
            return response.data;
        }
    };
};

export default useRefreshToken;