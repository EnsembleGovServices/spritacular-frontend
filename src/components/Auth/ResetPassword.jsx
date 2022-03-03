import {Button, Form, FormGroup, FormText, Input} from "reactstrap";
import axios from "../../api/axios";
import {baseURL} from "../../helpers/url";
import {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";

const ResetPassword = (props) => {
    const {cp,token} = props;
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const [user, setUser] = useState({
        token: "",
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

    
    useEffect(() => {
        setUser({
            ...user,
            ['token']:token
        })
    },[token]);
    const handleLogin = async (e) => {
        e.preventDefault();
        await axios.post(baseURL.api+'/users/password_reset/confirm/', user)
            .then((response) => {
                setError('');
                navigate('/');
            })
            .catch((error) => {
                if (!error?.response) {
                    console.log('server error occurred')
                }
                else if (error?.response) {
                    setError({
                        'status': error.response.status,
                        'message': error.response.statusText,
                        'data': error.response.data
                    });
                }
                else {
                    console.log(error?.response?.statusText)
                }
            })
    }
    return(
        <>
            {error?.data &&
                <p className="text-danger small mb-4 fw-bolder">{error?.data?.detail}</p>
            }
            <Form onSubmit={handleLogin}>
                <FormGroup>
                    <Input
                        type="password"
                        name="password"
                        placeholder=" New Password"
                        required
                        onChange={(e)=>handleInput(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Button type="submit" className="modal-btn" disabled={!(user?.password)}>
                        Change Password
                    </Button>
                </FormGroup>
            </Form>
        </>
    )
}
export default ResetPassword;