import {axiosPrivate} from '../api/server';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    return async () => {
        const response = await axiosPrivate.post(process.env.REACT_APP_API_TOKEN_URL, {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.access);
            return {...prev, accessToken: response.data.access}
        });
        return response.data.access;
    };
};

export default useRefreshToken;