import { Button, Form, FormGroup, FormFeedback, Input } from "reactstrap";
import axios from "../../api/axios";
import { baseURL } from "../../helpers/url";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = (props) => {
    const { token } = props;
    const navigate = useNavigate();
    const [user, setUser] = useState({
        token: "",
        password: ""
    });
    const [error, setError] = useState('');

    // To store changed password in state
    const handleInput = (e) => {
        e.preventDefault();
        let name = e.target.name,
            value = e.target.value;
        setUser({
            ...user,
            [name]: value
        })
    }

    // To store token in state
    useEffect(() => {
        setUser({
            ...user,
            ['token']: token
        })
    }, [token]);

    // To confirm reset password to db and login user
    const handleLogin = async (e) => {
        e.preventDefault();
        await axios.post(baseURL.api + '/users/password_reset/confirm/', user)
            .then((response) => {
                setError('');
                navigate('/');
            })
            .catch((error) => {
                if (!error?.response) {
                    process.env.NODE_ENV === "development" && console.log('ResetPassword: Server error occurred')
                }
                else if (error?.response) {
                    setError({
                        'status': error.response.status,
                        'message': error.response.statusText,
                        'data': error.response.data
                    });
                }
                else {
                    process.env.NODE_ENV === "development" && console.log('ResetPassword Error:', error?.response?.statusText)
                }
            })
    }
    
    return (
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
                        onChange={(e) => handleInput(e)}
                        invalid={!!error?.data?.password}
                    />
                    <FormFeedback>{error?.data?.password}</FormFeedback>
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