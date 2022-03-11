import {Button, Form, FormGroup, FormText, Input} from "reactstrap";
import axios from "../../api/axios";
import {baseURL} from "../../helpers/url";
import {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import { routeUrls } from './../../helpers/url';

const Login = (props) => {
    const {cp} = props;
    const { setAuth, persist, setPersist } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || routeUrls.home;

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState('');

    const handleInput = (e) => {
        e.preventDefault();
        let name = e.target.name,
            value = e.target.value;
        setUser({
            ...user,
            [name]:value
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        await axios.post(baseURL.token, user)
            .then((response) => {
                setPersist(prev => !prev);
                setError('');
                setAuth({
                    token: {
                        access: response?.data?.access,
                        refresh: response?.data?.refresh,
                    },
                    user: response?.data
                })

                navigate(from, { replace: true });
                // toast.success('Logged in successfully', toastConfig());
                localStorage.setItem('refresh', response?.data?.refresh)
            })
            .catch((error) => {
                if (!error?.response) {
                    console.log(error?.message)
                    setError(prev => {
                        return {
                            ...prev,
                            server: error?.message
                        }
                    });
                }
                else if (error?.response) {
                    setError({
                        'status': error.response.status,
                        'message': error.response.statusText,
                        'data': error.response.data
                    });
                }
                else if (error?.response?.status === 401) {
                    console.log('unauthorized')
                }
                else {
                    console.log(error?.response?.statusText)
                }
            })
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return(
        <>
            {error?.data &&
                <p className="text-danger small mb-4 fw-bolder">{error?.data?.detail}</p>
            }
            {error?.server &&
                <p className="text-danger text-center small mb-4 fw-bolder">{error?.server}</p>
            }
            <Form onSubmit={handleLogin}>
                <FormGroup>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        autoComplete="off"
                        required
                        onChange={(e)=>handleInput(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={(e)=>handleInput(e)}
                    />
                </FormGroup>
                <FormText className="forgot-password">
                    <Button type="button" onClick={()=> cp()}>Forgot Password?</Button>
                </FormText>
                <FormGroup>
                    <Button type="submit" className="modal-btn" disabled={!(user?.email && user?.password)}>
                        Login
                    </Button>
                </FormGroup>
            </Form>
        </>
    )
}
export default Login;