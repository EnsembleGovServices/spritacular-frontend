import "../../../assets/scss/component/blog.scss";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import axios from "../../../api/axios";
import {baseURL} from "../../../helpers/url";

import ViewBlogTutorial from "../BlogTutorial/ViewBlogTutorial";

const TutorialView = () => {
    const {slug} = useParams();
    const navigate = useNavigate();
    const [tutorial, setTutorial] = useState();
    const [readMode, setReadMode] = useState(false);

    const getTutorialDetails = async () => {
        await axios.get(`${baseURL.get_single_blog}${slug}/`, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            // console.log(response);
            setTutorial(response?.data?.data);
            // console.log(response?.data?.data);
        }).catch(error => {
            // console.log(error);
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
            />
        </>
    )
}
export default TutorialView;