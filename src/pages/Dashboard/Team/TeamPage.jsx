import "../../../assets/scss/component/blog.scss"
import useObservationsData from "../../../hooks/useObservationsData";
import {useState, useEffect} from "react";
import axios from "../../../api/axios";
import {baseURL, routeUrls} from "../../../helpers/url";
import {Link} from "react-router-dom";
import {Container} from "reactstrap";
import Loader from "../../../components/Shared/Loader";
import NotFound from "../../../components/Common/NotFound";
import TeamListContent from "./TeamListContent";

const TeamPage = () => {
    const {setTeam, team, triggerEvents} = useObservationsData();
    const [loader, setLoader] = useState(true);

    const getTeam = async () => {
        setLoader(true);
        await axios.get(`${baseURL.team_list}`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            setTeam(response?.data);
            setLoader(false);
        }).catch(error => {
            setLoader(false);
            process.env.NODE_ENV === "development" && console.log('TeamPage: ', error)
        })
    }

    useEffect(() => {
        getTeam().then(r => r);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (triggerEvents) {
            getTeam().then(r => r);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerEvents]);

    return (
        <div className="blog_page position-relative">
            <div className="common-banner"></div>
            <section className="blog-main">
                <Container>
                    <div className="position-relative">
                        <div className="d-flex align-items-center justify-content-between">
                            <h2 className="mb-0 text-capitalize">Manage team</h2>
                            <Link
                                to={`${routeUrls.dashboard}/team/create`}
                                className="btn btn-primary px-4 text-capitalize">Create team</Link>
                        </div>
                    </div>

                    <div className="mt-5">
                        {
                            team?.length > 0 ? (
                                <div className="row">
                                    <TeamListContent teams={team} type="team"/>
                                </div>
                            ) : loader ? (
                                <Loader loaderClass="h-100 position-relative"/>
                            ) : <NotFound/>
                        }
                    </div>
                </Container>
            </section>
        </div>
    )
}
export default TeamPage;