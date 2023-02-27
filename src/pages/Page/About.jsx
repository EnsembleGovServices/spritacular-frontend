import {Col, Container, Row} from "reactstrap";
import "../../assets/scss/component/about.scss";
import PageMeta from "../../meta/PageMeta";

const About = () => {
    return (
        <>
            <PageMeta
                title="About us"
                description="citizen science project that aims to collect observations of sprites and other optical phenomena occurring above the thunderstorms - collectively known as Transient Luminous Events (TLEs)."
            />
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
                                        We Collect, Present, and Manage a Database of TLE Observations
                                    </h3>
                                </Col>
                                <Col md={8}>
                                    <h4>
                                        What is Spritacular?
                                    </h4>
                                    <p className="mb-3">
                                        Spritacular is a citizen science project that aims to collect observations of
                                        sprites and other optical
                                        phenomena occurring above the thunderstorms - collectively known as <a
                                        target="_blank" referrerPolicy="no-referrer" rel="noreferrer"
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
                                    <Col>
                                        <h5>
                                            If you have any questions or comments please email us at
                                            <a className="mx-2" href="mailto:info.spritacular@gmail.com."
                                               target="_blank" rel="noreferrer">
                                                info.spritacular@gmail.com.
                                            </a>
                                            Remember that your opinion matters and we would love to hear from you!
                                        </h5>
                                    </Col>

                                </Row>
                            </div>
                            <div className="mt-5">
                                <div className="row c-h-card">
                                    <div className="mb-4 col-sm-12">
                                        <div className="card">
                                            <div className="card-header border-bottom-0">
                                                <h3 className="mb-0">Why do we need a TLE database?</h3>
                                            </div>
                                            <div className="pt-0 card-body">
                                                <p className="card-text">
                                                    With this project, we will build an event database of TLEs that
                                                    will
                                                    significantly
                                                    complement current and future science missions by providing
                                                    ground-based
                                                    observational data. Not only that, scientific community will be
                                                    presented
                                                    and benefit
                                                    from the exceptional imagery of sprites/TLEs captured by our
                                                    community. This
                                                    database will serve as an invaluable resource for researchers
                                                    allowing them
                                                    to find
                                                    interesting cases, perform studies in conjunction with other
                                                    scientific
                                                    data, and
                                                    conduct broad statistical studies.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4 col-sm-12">
                                        <div className="card">
                                            <div className="card-header border-bottom-0">
                                                <h3 className="mb-0">What is citizen science?</h3>
                                            </div>
                                            <div className="pt-0 card-body">
                                                <p className="card-text">
                                                    Simply put, it is science for all! <br/>
                                                    NASA Science Mission Directorate (SMD)
                                                    <a className="mx-1"
                                                       href="https://smd-prod.s3.amazonaws.com/science-red/s3fs-public/atoms/files/SPD%2033%20Citizen%20Science.pdf"
                                                       target="_blank" rel="noreferrer">
                                                        Policy on Citizen Science
                                                    </a>
                                                    defines it as “a
                                                    form of open collaboration in which individuals or organizations
                                                    participate

                                                    voluntarily in the scientific process”. The database that we
                                                    generate
                                                    through Spritacular will not only lead to opportunities for
                                                    joint studies across many science disciplines, it will create
                                                    paths
                                                    for
                                                    collaboration
                                                    among communities!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="card">
                                            <div className="card-header border-bottom-0">
                                                <h3 className="mb-0">Are you interested in learning more about NASA
                                                    citizen science
                                                    projects?</h3>
                                            </div>
                                            <div className="pt-0 card-body">
                                                <p className="card-text">
                                                    Check out this
                                                    <a className="mx-1"
                                                       href="https://science.nasa.gov/citizenscience"
                                                       target="_blank" rel="noreferrer">
                                                        website
                                                    </a>
                                                    , there is a wealth of information on various exciting projects!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Container>
                </section>
            </div>
        </>
    );
};
export default About;
