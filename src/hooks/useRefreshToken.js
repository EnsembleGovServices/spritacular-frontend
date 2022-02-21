import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    return async () => {
        const response = await axios.post(process.env.REACT_APP_API_REFRESH_URL,{refresh: localStorage.getItem('refresh')}, {
            withCredentials: true
        });
        localStorage.setItem('refresh', response?.data?.refresh);

        await axios.get(process.env.REACT_APP_API_USER_URL, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${response?.data?.access}`
            },
        }).then((response) => {
            setAuth(prev => {
                return {
                    ...prev,
                    user: response?.data
                }
            });
        })

        setAuth(prev => {
            return {
                ...prev,
                token: response.data,
            }
        });

        return response.data;
    };
};

export default useRefreshToken;