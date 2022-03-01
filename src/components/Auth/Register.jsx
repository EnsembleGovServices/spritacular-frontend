import {Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";

import {useEffect, useState} from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import {baseURL} from "../../helpers/url";
// import Autocomplete from 'react-google-autocomplete';

const Register = (props) => {
    const { handleLogin } = props;
    const { setAuth, persist, setPersist } = useAuth();
    const [userRegistration, setUserRegistration] = useState({
        first_name: "",
        last_name: "",
        email: "",
        location: "",
    });
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

    const handleInput = (e) => {
        let name = e.target.name,
            value = e.target.value;
        setUserRegistration({
            ...userRegistration,
            [name]: value,
        });
    };

    const handleCheck = (e) => {
        setUserRegistration({
            ...userRegistration,
            agreeTerms: !!e.target.checked,
        });
    };

    const createNewUser = async (e) => {
        e.preventDefault();
        await axios
            .post(baseURL.register, userRegistration)
            .then((response) => {
                if (response.status === 201) {
                    setError(null);
                    setSuccess({
                        status: response.status,
                        data: response.data,
                    });
                    LoginUser();
                } else {
                    console.log(response?.statusText);
                }
            })
            .catch((error) => {
                setSuccess(null);
                if (!error?.response) {
                    console.log('Server error occurred')
                } else {
                    setError({
                        status: error.response.status,
                        message: error.response.statusText,
                        data: error.response.data,
                    });
                    console.log(error?.response?.statusText)
                }
                if (error) {
                    console.log(error.response);
                }
            });
    };

    const LoginUser = async () => {
        await axios
            .post(baseURL.token, {
                email: userRegistration.email,
                password: userRegistration.password,
            })
            .then((response) => {
                setPersist(prev => !prev);
                setAuth(prev => {
                    return {
                        ...prev,
                        token: {
                            access: response?.data?.access,
                            refresh: response?.data?.refresh
                        },
                        user: response?.data
                    }
                });
                // toast.success(`Welcome, ${response.data.first_name}`, toastConfig());
                setUserRegistration(null);
                localStorage.setItem('refresh', response?.data?.refresh)
            })
            .catch((err) => {
                console.log('Something went wrong')
            });
    };

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    const handleLoginModalClick= () => {
        handleLogin();
    }
    return(
        <>
            {success && (
                <p className="text-success small mb-4 fw-bolder">
                    Signed up successfully
                </p>
            )}
            <Form onSubmit={createNewUser}>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <Input
                                required
                                type="text"
                                name="first_name"
                                placeholder="First name"
                                value={userRegistration?.first_name ?? ""}
                                onChange={(e) => handleInput(e)}
                                invalid={!!error?.data?.first_name}
                            />
                            <FormFeedback>{error?.data?.first_name}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col sm={6} className="">
                        <FormGroup>
                            <Input
                                required
                                type="text"
                                name="last_name"
                                placeholder="Last name"
                                value={userRegistration?.last_name ?? ""}
                                invalid={!!error?.data?.last_name}
                                onChange={(e) => handleInput(e)}
                            />
                            <FormFeedback>{error?.data?.last_name}</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <FormGroup>
                            <Input
                                required
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={userRegistration?.email ?? ""}
                                invalid={!!error?.data?.email}
                                onChange={(e) => handleInput(e)}
                            />
                            <FormFeedback>{error?.data?.email}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Input
                                required
                                type="password"
                                name="password"
                                placeholder="Password"
                                invalid={!!error?.data?.password}
                                onChange={(e) => handleInput(e)}
                            />
                            <FormFeedback>{error?.data?.password}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            {/* <Autocomplete
                                style={{
                                    width: '100%',
                                    height: '40px',
                                    paddingLeft: '16px',
                                    marginTop: '2px',
                                    marginBottom: '500px'
                                }}
                                // onPlaceSelected={ this.onPlaceSelected }
                                types={['(regions)']}
                            /> */}
                            <Input
                                required
                                type="select"
                                name="location"
                                onChange={(e) => handleInput(e)}
                            >
                                <option value="Ahmedabad">Ahmedabad</option>
                                <option value="Pune">Pune</option>
                                <option value="Bombay">Bombay</option>
                            </Input>
                            <FormFeedback>Location is required</FormFeedback>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input
                                    required
                                    type="checkbox"
                                    name="agreeTerms"
                                    checked={userRegistration?.agreeTerms === true}
                                    onChange={(e) => handleCheck(e)}
                                />
                                Creating an account means you agree with our with our{" "}
                                <a href="/">Privacy Policy</a> and <a href="/">Terms.</a>
                            </Label>
                        </FormGroup>
                    </Col>
                </Row>
                <Button
                    type="submit"
                    className="modal-btn"
                    disabled={
                        userRegistration ? userRegistration?.agreeTerms !== true : false
                    }
                >
                    Create Account
                </Button>
            </Form>
            <p className="bottom-text">
                Already have an account? <span onClick={() => handleLogin()} className="pointer fw-bold">Login</span>
            </p>
        </>
    )
}
export default Register;