import axios from "../../../api/axios";
import {baseURL, routeUrls} from "../../../helpers/url";
import useAuth from "../../../hooks/useAuth";
import useObservationsData from "../../../hooks/useObservationsData";
import Loader from "../../../components/Shared/Loader";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const DeleteBlogTutorial = ({slug, type}) => {
    const {auth} = useAuth();
    const {setTriggerEvents} = useObservationsData();
    const superUser = auth?.user?.is_superuser;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const deleteBlogTutTrigger = async () => {
        setLoading(true);
        setTriggerEvents((prev) => {
            return {
                ...prev,
                deleted: false
            }
        })
        if (superUser) {
            await axios.delete(`${baseURL.blog_tut_delete}${slug}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth?.token?.access}`,
                },
            }).then((response) => {
                if (response?.status === 200) {
                    setLoading(false);
                    setTriggerEvents((prev) => {
                        return {
                            ...prev,
                            deleted: true
                        }
                    });
                    navigate(`${routeUrls.dashboard}/${type}`, {replace: true});
                }

            }).catch((error) => {
                setLoading(false);
                console.log('error in delete blog button', error);
            })
        } else {
            console.log('You\'re not allowed to perform this task')
            return false;
        }
    }

    return (
        <>
            <button className="btn btn-sm btn-danger px-4" onClick={() => deleteBlogTutTrigger(slug)}>Delete</button>
            {loading &&
                <Loader fixContent={true}/>
            }
        </>
    )
}

export default DeleteBlogTutorial;