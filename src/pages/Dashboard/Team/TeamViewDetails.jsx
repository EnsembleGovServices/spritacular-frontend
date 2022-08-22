import "../../../assets/scss/component/blog.scss";
import {useParams} from "react-router-dom";
import {baseURL} from "../../../helpers/url";
import axios from "../../../api/axios";
import {useEffect, useState} from "react";
import useAuth from "../../../hooks/useAuth";

import ViewBlogTutorial from "../BlogTutorial/ViewBlogTutorial";
import useObservationsData from "../../../hooks/useObservationsData";

const BlogView = () => {
    const {id} = useParams();
    const {auth} = useAuth();
    const {setTeamDetails, teamDetails} = useObservationsData();
    const [readMode, setReadMode] = useState(false);

    const getTeamDetails = async () => {
        await axios.get(`${baseURL.team_view}${id}/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token?.access}`,
            },
        }).then(response => {
            setTeamDetails(response?.data)
        }).catch(error => {
            console.log('error', error)
            // if (error?.response?.statusCode !== 200) {
            //     navigate('/404', {replace: true});
            // }
        })
    }

    useEffect(() => {
        getTeamDetails().then(r => r)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ViewBlogTutorial setReadMode={setReadMode}
                          readMode={readMode}
                          content={teamDetails}
                          slug={id}
                          type="team"
        />
    )
}

export default BlogView;