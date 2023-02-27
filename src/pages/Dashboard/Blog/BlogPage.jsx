import "../../../assets/scss/component/blog.scss"

import {useEffect, useState} from "react";

import {baseURL} from "../../../helpers/url";
import axios from "../../../api/axios";

import ListBlogTutorial from "../BlogTutorial/ListBlogTutorial";
import useObservationsData from "../../../hooks/useObservationsData";

const BlogPage = () => {
    const {setArticles, articles, triggerEvents} = useObservationsData();
    const [loader, setLoader] = useState(true);


    const getArticle = async () => {
        await axios.get(`${baseURL.get_blog}1`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            setArticles(response?.data?.data);
            setLoader(false);
        }).catch(error => {
            process.env.NODE_ENV === "development" && console.log('getArticle BlogPage: ', error)
        })
    }

    useEffect(() => {
        getArticle().then(r => r);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (triggerEvents) {
            getArticle().then(r => r);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerEvents]);


    return (
        <ListBlogTutorial content={articles}
                          type="blog"
                          isLoading={loader}
        />
    )
}

export default BlogPage;