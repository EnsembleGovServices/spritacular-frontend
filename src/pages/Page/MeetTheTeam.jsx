import "../../assets/scss/component/blog.scss";
import {Card, Col, Row} from "reactstrap";
import {useEffect, useState} from "react";
import PageMeta from "../../meta/PageMeta";
import useObservationsData from "../../hooks/useObservationsData";
import axios from "../../api/axios";
import {baseURL} from "../../helpers/url";
import Loader from "../../components/Shared/Loader";
import NotFound from "../../components/Common/NotFound";
import TeamList from "./TeamList";

const MeetTheTeam = () => {

    const {setTeam, team} = useObservationsData();
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
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className="blog_page">
            <PageMeta
                title="Meet The Team"
                description="Spritacular project is developed and managed by a dedicated team!"
            />
            <div className="common-banner"></div>
            <section className="blog-main">
                <div className="container">
                    <h2 className="text-center mb-2">Meet The Team</h2>
                    <p className="text-center mb-5">Spritacular project is developed and managed by a dedicated
                        team!</p>
                    <Row className="g-4">
                        <Col md={12}>
                            <Card className="team-card-box">
                                {
                                    team?.length > 0 ? (
                                        <TeamList teams={team}/>
                                    ) : loader ? (
                                        <Loader loaderClass="h-100 position-relative"/>
                                    ) : <NotFound/>
                                }
                            </Card>
                        </Col>
                    </Row>
                </div>
            </section>
        </div>
    )
}

export default MeetTheTeam;