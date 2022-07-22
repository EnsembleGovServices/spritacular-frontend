import "../../../assets/scss/component/blog.scss";
import {useNavigate, useParams} from "react-router-dom";
import {baseURL} from "../../../helpers/url";
import axios from "../../../api/axios";
import {useEffect, useState} from "react";
import useAuth from "../../../hooks/useAuth";

import ViewBlogTutorial from "../BlogTutorial/ViewBlogTutorial";
import useObservationsData from "../../../hooks/useObservationsData";

const BlogView = () => {
    const {slug} = useParams();
    const {auth} = useAuth();
    const {setATDetails, atDetails} = useObservationsData();
    const navigate = useNavigate();
    const [readMode, setReadMode] = useState(false);

    const getArticleDetails = async () => {
        await axios.get(`${baseURL.get_single_blog}${slug}/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token?.access}`,
            },
        }).then(response => {
            setATDetails((prev) => {
                return {
                    ...prev,
                    article: response?.data?.data
                }
            })
        }).catch(error => {
            if (error?.response?.statusCode !== 200) {
                navigate('/404', {replace: true});
            }
        })
    }

    useEffect(() => {
        getArticleDetails().then(r => r)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ViewBlogTutorial setReadMode={setReadMode}
                          readMode={readMode}
                          content={atDetails?.article}
                          slug={slug}
                          type="blog"
        />
    )
}

export default BlogView;