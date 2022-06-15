
import "../../assets/scss/component/blog.scss";
import { Card, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle, Col, Row } from "reactstrap";
import { meetTheTeamData } from "../../helpers/frontPage";
import { useEffect } from "react";

const MeetTheTeam = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className="blog_page">
            <div className="common-banner"></div>
            <section className="blog-main">
                <div className="container">
                    <h2 className="text-center mb-2">Meet The Team</h2>
                    <p className="text-center mb-5">Spritacular project is developed and managed by a dedicated
                        team!</p>
                    <Row className="g-4">
                        <Col md={12}>
                            <Card className="border-0 shadow-sm p-md-5 p-4 team-card-box">
                                <CardGroup className="mt-4 text-center mb-3">
                                    <Row className="g-0 justify-content-center w-100">
                                        {meetTheTeamData && meetTheTeamData.map((member, team_index) => (
                                            team_index < 5 &&
                                            (
                                                <Col xl="2" md="4" sm="6" key={team_index}>
                                                    <Card className="align-items-center border-0 p-3">
                                                        <div className=" align-middle">
                                                            <CardImg className="w-75" alt={member.designation} src={member.person_img} top />
                                                        </div>
                                                        <CardBody>
                                                            <CardTitle tag="h4" className="fs-5">{member.person_name}</CardTitle>
                                                            <CardSubtitle className="mb-2 text-muted"
                                                                tag="h6">{member.designation}</CardSubtitle>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            )))}
                                    </Row>
                                </CardGroup>

                                {/* Ensemble Consultancies */}
                                <CardGroup className="mt-5 text-center">
                                    <Row className="g-0 justify-content-evenly w-100">
                                        {meetTheTeamData && meetTheTeamData.map((member, team_index) => (
                                            team_index >= 5 &&
                                            (
                                                <Col xl="2" md="4" sm="6" key={team_index}>
                                                    <Card className="align-items-center border-0 p-3">
                                                        <CardImg className="w-75" alt="Ensemble Consultancy - 1" src={member.person_img} top />
                                                        <CardBody className="text-center">
                                                            <CardTitle tag="h4" className="fs-5">{member.person_name}</CardTitle>
                                                            <CardSubtitle className="mb-2 text-muted" tag="h6">Ensemble
                                                                Consultancy</CardSubtitle>
                                                            <CardText>{member.designation}</CardText>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            )))}
                                    </Row>
                                </CardGroup>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </section>
        </div>
    )
}

export default MeetTheTeam;