import {Button, Col, Container, Row} from "reactstrap";
import "../assets/scss/component/about.scss";

const About = () => {
    return (
        <>
            <div className="about_page position-relative">
                <div className="common-banner about-common-banner"></div>
                <section className={'banner-content'}>
                    <Container className={'position-relative'}>
                        <div className="banner-inner">
                            <Row>
                                <Col xs={12}>
                                    <h2 className="text-white">About</h2>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </section>
                <section className="about-content">
                    <Container>
                        <div className="about-content-inner">
                            <Row>
                                <Col md={4}>
                                    <h3>
                                        We Collect, Present, and Manage a Database of Sprites
                                        Observations
                                    </h3>
                                </Col>
                                <Col md={8}>
                                    <h4>
                                        What is Spritacular?
                                    </h4>
                                    <p className="mb-3">
                                        Spritacular is a community science project that aims to collect observations of
                                        sprites and other optical
                                        phenomena occurring above the thunderstorms - collectively known as <a
                                        target="_blank" referrerPolicy="no-referrer"
                                        href="https://www.nasa.gov/mission_pages/station/research/Once_Upon_a_Time_in_a_Thunderstorm">Transient
                                        Luminous Events</a> (TLEs).
                                        The database generated from these observations will lay the groundwork for
                                        first-ever event catalog of
                                        TLEs that will greatly contribute to advancement of scientific studies.
                                    </p>
                                    <p>
                                        Over the last two decades, good quality cameras have become increasingly
                                        affordable which allowed more people than
                                        ever before to have access to the tools capable of documenting these powerful
                                        atmospheric events. Because of this,
                                        Spritacular project strives to establish a collaborative bridge among
                                        communities that are actively engaged in chasing
                                        these elusive phenomena, newcomers looking to learn more, and the researchers of
                                        atmospheric and space electricity.
                                    </p>
                                    <h5 className="fw-bold">
                                        We welcome all interested members of the public and there are many ways you can
                                        participate!
                                    </h5>
                                </Col>
                            </Row>
                            <div className="about-col">
                                <Row>
                                    <Col md={4}>
                                        <h3>Sprites Observations</h3>
                                        <p>
                                            Sprites or red sprites are large-scale electric discharges
                                            that occur high above thunderstorm clouds, they appear as
                                            luminous reddish-orange flashes.
                                        </p>
                                    </Col>
                                    <Col md={4}>
                                        <h3>Citizen Scientists</h3>
                                        <p>
                                            Storm chasers who take images and collect data on Sprite
                                            events and other Transient Luminous Events (TLEs). They want
                                            to share their work and be part of the broader scientific
                                            community in collaboration with NASA.
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Container>
                </section>
            </div>
        </>
    );
};
export default About;
