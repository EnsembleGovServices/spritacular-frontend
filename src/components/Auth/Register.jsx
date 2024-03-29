import {Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";

import {useEffect, useState} from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import {baseURL} from "../../helpers/url";
import PlacesAutocomplete from "../LocationSearchInput";
import {Link} from "react-router-dom";
import {routeUrls} from '../../helpers/url';


const Register = (props) => {
    const {handleLogin} = props;
    const {setAuth, persist, setPersist} = useAuth();
    const [userRegistration, setUserRegistration] = useState({
        first_name: "",
        last_name: "",
        email: "",
        location: "",
        place_uid: "",
        location_metadata: {
            address: "",
            lat: "",
            lng: "",
            countryCode: ""
        }
    });
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

    // To store user data 
    const handleInput = (e) => {
        let name = e.target.name,
            value = e.target.value;
        setUserRegistration({
            ...userRegistration,
            [name]: value,
        });
    };

    // For storing location coords.
    const handleLocations = (location) => {
        console.log('location', location)
        setUserRegistration({
            ...userRegistration,
            location: location['address'],
            place_uid: location['placeId'],
            country_code: location['countryCode'],
            location_metadata: {
                lat: location['lat'],
                lng: location['lng'],

            }
        });
    }

    // For T&C checkbox
    const handleCheck = (e) => {
        setUserRegistration({
            ...userRegistration,
            agreeTerms: !!e.target.checked,
        });
    };

    // To register new user and store in db
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
                    process.env.NODE_ENV === "development" && console.log('NewUser Signup Res:', response?.statusText);
                }
            })
            .catch((error) => {
                setSuccess(null);
                if (!error?.response) {
                    process.env.NODE_ENV === "development" && console.log('RegisterPage: Server error occurred')
                } else {
                    setError({
                        status: error.response.status,
                        message: error.response.statusText,
                        data: error.response.data,
                    });
                    process.env.NODE_ENV === "development" && console.log('RegisterPage status code:', error?.response?.statusText)
                }
                if (error) {
                    process.env.NODE_ENV === "development" && console.log('RegisterPage response:', error.response);
                }
            });
    };

    // For storing login user and token context after successfully regiserted
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
                setUserRegistration(null);
                localStorage.setItem('refresh', response?.data?.refresh)
            })
            .catch((err) => {
                process.env.NODE_ENV === "development" && console.log('Something went wrong', err)
            });
    };

    // To toggle enable/disable for register modal.
    const handleDisabled = () => {
        return !(userRegistration?.agreeTerms && userRegistration?.password === userRegistration?.password_confirmation);
    }

    // persists user 
    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (
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
                            <Input
                                required
                                type="password"
                                name="password_confirmation"
                                placeholder="Confirm Password"
                                onChange={(e) => handleInput(e)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <PlacesAutocomplete handleLocations={handleLocations} error={error}/>
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
                                <Link to={`/${routeUrls.policy}`}>Privacy Policy</Link> and <Link
                                to={`/${routeUrls.policy}`}>Terms.</Link>
                            </Label>
                        </FormGroup>
                    </Col>
                </Row>
                <Button
                    type="submit"
                    className="modal-btn"
                    disabled={handleDisabled()}
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