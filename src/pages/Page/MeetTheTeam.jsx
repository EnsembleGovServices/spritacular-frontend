import "../../assets/scss/component/blog.scss";
import { Button, Card, CardBody, CardColumns, CardGroup, CardImg, CardSubtitle, CardText, CardTitle, Col, Row } from "reactstrap";
import principalInvestigator from '../../assets/images/principal-investigator.png';
import coInvestigator from '../../assets/images/co-Investigator.png';
import techConsultant from '../../assets/images/technical-consultant.png';
import uxDesign from '../../assets/images/ux-design.png';
import scienceCommunication from '../../assets/images/science-communication.png';
import ensembleConsultancy1 from '../../assets/images/ensemble-consultancy-1.png';
import ensembleConsultancy2 from '../../assets/images/ensemble-consultancy-2.png';
import ensembleConsultancy3 from '../../assets/images/ensemble-consultancy-3.png';

const MeetTheTeam = () => {
    const spritacular_team = [
        { person_img: principalInvestigator, person_name: "Dr. Burcu Kosar", designation: "Principal Investigator" },
        { person_img: coInvestigator, person_name: "Dr. Jia Yue", designation: "Co-Investigator" },
        { person_img: techConsultant, person_name: "Dr. Jozsef Bor", designation: "Technical Consultant" },
        { person_img: uxDesign, person_name: "Sean Simmons", designation: "UX Design" },
        { person_img: scienceCommunication, person_name: "Rachel Lense", designation: "Science Communication" },
        { person_img: ensembleConsultancy1, person_name: "Oliver Gerland", designation: "Website Development" },
        { person_img: ensembleConsultancy2, person_name: "Aleigh Meredith", designation: "Website Development" },
        { person_img: ensembleConsultancy3, person_name: "Adam Karides", designation: "Website Development" }
    ]

    return (
        <div className="blog_page">
            <div className="common-banner"></div>
            <section className="blog-main">
                <div className="container">
                    <h2 className="text-center mb-2">Meet The Team</h2>
                    <p className="text-center mb-5">Spritacular project is developed and managed by a dedicated team!</p>
                    <Row className="g-4">
                        <Col md={12}>
                            <Card className="border-0 shadow-sm p-md-5 p-4">
                                <CardGroup className="mt-4 text-center mb-3">
                                    {spritacular_team && spritacular_team.map((member, team_index) => (
                                        team_index < 5 &&
                                        (<Card className="align-items-center border-0 p-3" key={team_index}>
                                            <CardImg className="w-75 h-100" alt={member.designation} src={member.person_img} top />
                                            <CardBody>
                                                <CardTitle tag="h4">{member.person_name}</CardTitle>
                                                <CardSubtitle className="mb-2 text-muted" tag="h6">{member.designation}</CardSubtitle>
                                            </CardBody>
                                        </Card>)
                                    ))}
                                </CardGroup>

                                {/* Ensemble Consultancies */}
                                <CardGroup className="mt-5 text-center justify-content-around">
                                    {spritacular_team && spritacular_team.map((member, team_index) => (
                                        team_index >= 5 &&
                                        (<Card className="align-items-center py-3 border-0 h-100" style={{maxWidth:'25%'}}>
                                            <CardImg alt="Ensemble Consultancy - 1" src={member.person_img} top className="w-50" />
                                            <CardBody className="text-center">
                                                <CardTitle tag="h4">{member.person_name}</CardTitle>
                                                <CardSubtitle className="mb-2 text-muted" tag="h6">Ensemble Consultancy</CardSubtitle>
                                                <CardText>{member.designation}</CardText>
                                            </CardBody>
                                        </Card>)
                                    ))}
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