import {Alert, Button, Form, FormFeedback, FormGroup, Input, Label, UncontrolledAlert} from "reactstrap";
import axios from "../../api/axios";
import {useEffect, useState} from "react";
import {baseURL} from "../../helpers/url";
import useAuth from "../../hooks/useAuth";
import PlacesAutocomplete from "../LocationSearchInput";


const UpdateProfile = (props) => {
    const {user} = props;
    const { setAuth } = useAuth();
    const [updateUser, setUpdatedUser] = useState()
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    
    const [userRegistration, setUserRegistration] = useState({
        first_name: "",
        last_name: "",
        email: "",
        location: "",
        place_uid:"",
        extra_fields: {
            address: "",
            lat: "",
            lng: "",
            countryCode: ""
        }
    });

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
        // console.log(user?.user?.location);
        setUpdatedUser(user?.user)
    }, [user?.user])

    const handleLocations = (location) => {
        setUpdatedUser({
            ...updateUser,
            location: location['address'],
            place_uid: location['placeId'],
            country_code: location['countryCode'],
            extra_fields: {
                lat: location['lat'],
                lng: location['lng'],
            }
        });
    }

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        await axios.patch(baseURL.api+'/users/user_profile/'+user?.user?.id+'/', {
            first_name: updateUser?.first_name,
            last_name: updateUser?.last_name,
            email: updateUser?.email,
            location: updateUser?.location,
            place_uid: updateUser?.place_uid,
            country_code: updateUser?.country_code,
            extra_fields: {
                lat: updateUser?.extra_fields?.lat,
                lng: updateUser?.extra_fields?.lng,
                
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token?.access}`
            },
            withCredentials: true,
        }).then((success) => {
            setSuccess(success)
            setAuth(prev => {
                return {
                    ...prev,
                    user: updateUser
                }
            });
        }).catch((error) => {
            console.log(error.response);
            setError(error.response)
        })
    }

    return(
        <>
            {success && success?.status === 200 &&
                <UncontrolledAlert variant="success" data-dismiss="alert" dismissible="true">
                    Profile updated successfully
                </UncontrolledAlert>
            }
            <Form onSubmit={handleProfileUpdate}>
                <FormGroup>
                    <Label htmlFor="first_name">First Name</Label>
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
                    <Label htmlFor="last_name">Last Name</Label>
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
                    <Label htmlFor="email">Email</Label>
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
                    <Label htmlFor="location">Location</Label>
                    {/* <Input type="select" name="location" onChange={(e)=>handleInput(e)}>
                        <option disabled defaultValue>
                            Please Select Your Country
                        </option>
                        <option value="Australia">Australia</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Canada">Canada</option>
                        <option value="Denmark">Denmark</option>
                    </Input> */}
                    <PlacesAutocomplete handleLocations={handleLocations} address={user?.user?.location}/>
                    <FormFeedback>{error?.data?.location}</FormFeedback>
                </FormGroup>
                <FormGroup className="profile-bottom-btn ">
                    <Button type="submit" className="save-btn">Save Changes</Button>
                </FormGroup>
            </Form>
        </>
    )
}
export default UpdateProfile;