import "../../../assets/scss/component/blog.scss";
import {Link, useNavigate, useParams} from "react-router-dom";
import {baseURL} from "../../../helpers/url";
import axios from "../../../api/axios";
import {useEffect, useState} from "react";
import useAuth from "../../../hooks/useAuth";

import ViewBlogTutorial from "../BlogTutorial/ViewBlogTutorial";

const BlogView = () => {
    const {slug} = useParams();
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [article, setArticle] = useState();
    const [readMode, setReadMode] = useState(false);

    const getArticleDetails = async () => {

        await axios.get(`${baseURL.get_single_blog}${slug}/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token?.access}`,
            },
        }).then(response => {
            // console.log(response);
            setArticle(response?.data?.data);
            // console.log(response?.data?.data);
        }).catch(error => {
            // console.log(error);
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
                          content={article}
                          slug={slug}
        />
    )
}

export default BlogView;