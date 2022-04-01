import { Button, Form, FormFeedback, FormGroup, Input, Label, UncontrolledAlert} from "reactstrap";
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

    const handleLocations = (location) => {
        setUpdatedUser({
            ...updateUser,
            location: location['address'],
            place_uid: location['placeId'],
            country_code: location['countryCode'],
            location_metadata: {
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
            location_metadata: {
                lat: updateUser?.location_metadata?.lat,
                lng: updateUser?.location_metadata?.lng,
                
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