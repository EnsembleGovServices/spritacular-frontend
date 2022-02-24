import {Alert, Button, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import axios from "../../api/axios";
import {useEffect, useState} from "react";
import {baseURL} from "../../helpers/url";

const UpdateProfile = (props) => {
    const {user} = props;

    const [updateUser, setUpdatedUser] = useState()
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

    const handleInput = (e) => {
        e.preventDefault();
        let name = e.target.name,
            value = e.target.value;
        setUpdatedUser({
            ...updateUser,
            [name]:value
        })
    }
    useEffect(()=> {
        setUpdatedUser(user?.user)
    }, [user?.user])

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        await axios.patch(baseURL.api+'/users/user_profile/'+user?.user?.id+'/', {
            first_name: updateUser?.first_name,
            last_name: updateUser?.last_name,
            email: updateUser?.email,
            location: updateUser?.location
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token?.access}`
            },
            withCredentials: true,
        }).then((success) => {
            console.log(success);
            setSuccess(success)
        }).catch((error) => {
            console.log(error.response);
            setError(error.response)
        })
    }

    return(
        <>
            {success && success?.status === 200 &&
                <Alert variant="success">
                    Profile updated successfully
                </Alert>
            }
            <Form onSubmit={handleProfileUpdate}>
                <FormGroup>
                    <Label for="first_name">First Name</Label>
                    <Input
                        type="text"
                        name="first_name"
                        value={updateUser?.first_name ?? ""}
                        onChange={(e)=>handleInput(e)}
                        invalid={!!error?.data?.first_name}
                        placeholder="First Name"
                    />
                    <FormFeedback>{error?.data?.first_name}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="last_name">Last Name</Label>
                    <Input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={updateUser?.last_name ?? ""}
                        invalid={!!error?.data?.last_name}
                        onChange={(e)=>handleInput(e)}
                    />
                    <FormFeedback>{error?.data?.last_name}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        value={updateUser?.email ?? ""}
                        invalid={!!error?.data?.email}
                        onChange={(e)=>handleInput(e)}
                    />
                    <FormFeedback>{error?.data?.email}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="location">Location</Label>
                    <Input type="select" name="location" onChange={(e)=>handleInput(e)}>
                        <option disabled defaultValue>
                            Please Select Your Country
                        </option>
                        <option value="Australia">Australia</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Canada">Canada</option>
                        <option value="Denmark">Denmark</option>
                    </Input>
                </FormGroup>
                <FormGroup className="profile-bottom-btn ">
                    <Button type="submit" className="save-btn">Save Changes</Button>
                </FormGroup>
            </Form>
        </>
    )
}
export default UpdateProfile;