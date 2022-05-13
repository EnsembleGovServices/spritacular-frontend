import "../../../assets/scss/component/blog.scss"

import {useEffect, useState} from "react";

import {baseURL} from "../../../helpers/url";
import axios from "../../../api/axios";

import ListBlogTutorial from "../BlogTutorial/ListBlogTutorial";

const BlogPage = () => {
    const [articles, setArticles] = useState();

    const thead = [
        {name: 'ID'},
        {name: 'Title'},
        {name: 'Description'},
        {name: 'Action'}
    ]
    const getArticle = async () => {
        await axios.get(`${baseURL.get_blog}1`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            // console.log('response', response);
            setArticles(response?.data?.data);
        }).catch(error => {
            console.log('error', error)
        })
    }

    useEffect(() => {
        getArticle().then(r => r)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ListBlogTutorial content={articles}
                          thead={thead}
                          type="blog"
        />
    )
}

export default BlogPage;