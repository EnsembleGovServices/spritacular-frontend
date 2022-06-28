import {useState} from "react";
import {Alert, Button, Col, Form, FormGroup, Input, Row} from "reactstrap";
import axios from "axios";
import {baseURL} from "../../helpers/url";
import PropTypes from "prop-types";
import ChangePasswordPopup from "../Popup/ChangePasswordPopup";

const ChangePassword = (props) => {
    const { user } = props;
    const [password, setPassword] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [error, setError] = useState(null);

    // To update changed password to db.
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError('')
        setUpdated('')
        await axios.put(baseURL.api+'/users/change-password/'+user?.user?.id+'/', password, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token?.access}`
            },
            withCredentials: true,
        }).then((res) => {
            setUpdated(res?.data);
            setError('');
        }).catch((err) => {
            setError(err?.response?.data);
        })
    }

    // Store's changed password in state.
    const handleInput = (e) => {
        e.preventDefault();
        let name = e.target.name,
            value = e.target.value;
        setPassword({
            ...password,
            [name]:value,
        })
    }

    // To enable/disable button as per data entered.
    const passwordMatchCheck = () => {
        if (password?.confirm_password !== password?.new_password) {
            return true;
        } else if (password?.old_password === "") {
            return true;
        }
        return false;
    }

    return(
        <>
            <Form onSubmit={handleChangePassword}>
                <Row>
                    <Col sm={12}>
                        {error?.detail &&
                            <Alert color="danger">
                                {error?.detail}
                            </Alert>
                        }
                        {error?.details &&
                            <Alert color="danger">
                                <ul className="small mb-0 ps-2">
                                    {error?.details.map((item, i) => {
                                        return(
                                            <li key={i}>{item}</li>
                                        )
                                    })}
                                </ul>
                            </Alert>
                        }

                        {updated &&
                            <Alert color={"success"}>
                                {updated?.message}
                            </Alert>
                        }
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <Input
                                type="password"
                                name="old_password"
                                placeholder="Old Password"
                                required
                                onChange={(e)=>handleInput(e)}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <Input
                                type="password"
                                name="new_password"
                                placeholder="New Password"
                                required
                                onChange={(e)=>handleInput(e)}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <Input
                                type="password"
                                name="confirm_password"
                                placeholder="Confirm New Password"
                                required
                                onChange={(e)=>handleInput(e)}
                            />
                            {error?.new_password &&
                                <span className="text-danger small mt-2 d-block">
                                  {error?.new_password?.map((item, i)=> {
                                      return(
                                          <div key={i}>
                                              <span>{item}</span><br/>
                                          </div>
                                      )
                                  })}
                                </span>
                            }
                        </FormGroup>
                    </Col>
                    <Col md={12}>
                        <Button type="submit" className="modal-btn mb-3" disabled={passwordMatchCheck()}>
                            Update Password
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

ChangePasswordPopup.propTypes = {
    passwordMatchCheck: PropTypes.bool
};

export default ChangePassword;