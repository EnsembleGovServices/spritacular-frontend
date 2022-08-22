import "../../../assets/scss/component/blog.scss"

import {useEffect, useState} from "react";

import {baseURL} from "../../../helpers/url";
import axios from "../../../api/axios";

import ListBlogTutorial from "../BlogTutorial/ListBlogTutorial";
import useObservationsData from "../../../hooks/useObservationsData";

const TutorialPage = () => {
    const {tutorials, setTutorials, triggerEvents} = useObservationsData();
    const [loader, setLoader] = useState(true);

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

    useEffect(() => {
        if (triggerEvents) {
            getTutorials().then(r => r)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerEvents])

    return (
        <ListBlogTutorial content={tutorials}
                          type="tutorial"
                          isLoading={loader}
        />
    )
}
export default TutorialPage;