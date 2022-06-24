import axios from '../api/axios';
import {baseURL} from '../helpers/url';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const {setAuth} = useAuth();
    return async () => {
        const response = await axios.post(process.env.REACT_APP_API_REFRESH_URL, {refresh: localStorage.getItem('refresh')}, {
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
        await axios.get(baseURL.api + '/observation/get_category_list/', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                setAuth(prev => {
                    return {
                        ...prev,
                        categoryList: response.data,
                    }
                });
            })
            .catch((error) => {
                console.log(error)
            })

        return response.data;
    };
};

export default useRefreshToken;