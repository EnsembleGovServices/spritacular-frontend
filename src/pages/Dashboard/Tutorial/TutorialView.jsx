import "../../../assets/scss/component/blog.scss";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import axios from "../../../api/axios";
import {baseURL} from "../../../helpers/url";

import ViewBlogTutorial from "../BlogTutorial/ViewBlogTutorial";
import useObservationsData from "../../../hooks/useObservationsData";

const TutorialView = () => {
    const {slug} = useParams();
    const navigate = useNavigate();
    const {setATDetails, atDetails} = useObservationsData();
    const [readMode, setReadMode] = useState(false);
    const tutorial = atDetails?.tutorial;

    const getTutorialDetails = async () => {
        await axios.get(`${baseURL.get_single_blog}${slug}/`, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            setATDetails((prev) => {
                return {
                    ...prev,
                    tutorial: response?.data?.data
                }
            })
        }).catch(error => {
            if (error?.response?.statusCode !== 200) {
                navigate('/404', {replace: true});
            }
        })
    }

    useEffect(() => {
        getTutorialDetails().then(r => r)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <ViewBlogTutorial setReadMode={setReadMode}
                              readMode={readMode}
                              content={tutorial}
                              slug={slug}
                              type="tutorial"
            />
        </>
    )
}
export default TutorialView;