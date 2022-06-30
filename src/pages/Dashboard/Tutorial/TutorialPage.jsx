import "../../../assets/scss/component/blog.scss"

import {useEffect, useState} from "react";

import {baseURL} from "../../../helpers/url";
import axios from "../../../api/axios";

import ListBlogTutorial from "../BlogTutorial/ListBlogTutorial";

const TutorialPage = () => {
    const [tutorials, setTutorials] = useState();
    const [loader, setLoader] = useState(true);

    const thead = [
        {name: 'ID'},
        {name: 'Title'},
        {name: 'Description'},
        {name: 'Action'}
    ]
    const getTutorials = async () => {
        await axios.get(`${baseURL.get_blog}2`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            setTutorials(response?.data?.data);
            setLoader(false);
        }).catch(error => {
            process.env.NODE_ENV === "development" && console.log('getTutorial TutorialPage:', error)
        })
    }

    useEffect(() => {
        getTutorials().then(r => r)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ListBlogTutorial content={tutorials}
                          thead={thead}
                          type="tutorial"
                          isLoading={loader}
        />
    )
}
export default TutorialPage;