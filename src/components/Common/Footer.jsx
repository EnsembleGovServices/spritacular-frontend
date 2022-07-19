import "../../assets/scss/component/footer.scss";
import { Link } from "react-router-dom";
import { Col, Container, Row, List } from "reactstrap";
import { cdn, routeUrls } from '../../helpers/url';
import { Icon } from "@iconify/react";

const Footer = () => {
    return (
        <footer className="footer bg-black position-relative">
            <div className="footer-wrapper">
                <Container>
                    <Row className="gy-2 gy-md-3">
                        <Col lg={12}>
                            <Link
                                to={routeUrls.home}
                                title="Spritacular"
                                className="d-inline-block mb-3"
                            >
                                <img width={150} height={40} src={`${cdn.url}/Spritacular-white.png`}
                                    alt="spritacular" />
                            </Link>
                        </Col>
                        <Col lg={4}>
                            <Row className="mb-2 mt-4 mb-md-5 align-items-center">
                                <Col className="nasa-img col-12 col-sm-6">
                                    <div className="footer-brand">
                                        <img width={130} height={80} src={`${cdn.url}/catholic.png`}
                                            alt="spritacular" />
                                    </div>
                                </Col>
                                <Col className="col-12 col-sm-6">
                                    <div className="footer-brand">
                                        <img width={130} height={130} src={`${cdn.url}/nasa.png`} alt="spritacular" />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={8}>
                            <Row className="mb-2 mb-md-5 ">
                                <Col className="col-12 col-sm-4">
                                    <div className="footer-links">
                                        <p className="title-p">About</p>
                                        <List type="unstyled">
                                            <li>
                                                <Link
                                                    to={routeUrls.about}
                                                    className="d-inline-block mb-3"
                                                    title="What is Spritacular?"
                                                >
                                                    What is Spritacular?
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={routeUrls.policy}
                                                    className="d-inline-block mb-3"
                                                    title="Policy"
                                                >
                                                    Policy
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={routeUrls.policy}
                                                    className="d-inline-block mb-3"
                                                    title="Code of Conduct"
                                                >
                                                    Code of Conduct
                                                </Link>
                                            </li>
                                        </List>
                                    </div>
                                </Col>
                                <Col className="col-12 col-sm-4">
                                    <div className="footer-links">
                                        <List type="unstyled">
                                            <li>
                                                <Link
                                                    to={routeUrls.getStarted}
                                                    className="d-inline-block mb-3"
                                                    title="Get Started"
                                                >
                                                    Get Started
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={routeUrls.gallery}
                                                    className="d-inline-block mb-3"
                                                    title="Gallery"
                                                >
                                                    Gallery
                                                </Link>
                                            </li>
                                        </List>
                                        <p className="title-p">Resources</p>
                                        <List type="unstyled">
                                            <li>
                                                <Link
                                                    to={routeUrls.blog}
                                                    className="d-inline-block mb-3"
                                                    title="Blog"
                                                >
                                                    Blog
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={routeUrls.tutorials}
                                                    className="d-inline-block mb-3"
                                                    title="Tutorials"
                                                >
                                                    Tutorials
                                                </Link>
                                            </li>
                                        </List>
                                    </div>
                                </Col>
                                <Col className="col-12 col-sm-4">
                                    <div className="footer-links footer-long-links">
                                        <p className="title-p">Community</p>
                                        <List type="unstyled">
                                            <li>
                                                <Link
                                                    to={routeUrls.pages.meetTheTeam}
                                                    className="d-inline-block mb-3"
                                                    title="Meet the Team"
                                                >
                                                    Meet the Team
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={routeUrls.pages.becomeAnAmbasador}
                                                    className="d-inline-block mb-3"
                                                    title="Become an Ambassador"
                                                >
                                                    Become an Ambassador
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={routeUrls.pages.spritacularGoogleGroup}
                                                    className="d-inline-block mb-3"
                                                    title="Spritacular Google Group"
                                                >
                                                    Spritacular Google Group
                                                </Link>
                                            </li>
                                        </List>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={12}>
                            <Row className="align-items-center">
                                <Col className="col-12 col-sm-6">
                                    <p className="text-white">
                                        © 2022 Spritacular. All rights reserved.
                                    </p>
                                </Col>
                                <Col className="col-12 col-sm-6">
                                    <List
                                        type="unstyled"
                                        className="d-flex m-0 footer-social-links"
                                    >
                                        <li>
                                            <a href="https://twitter.com/spritacular" target="_blank" rel="noreferrer" className="d-inline-block ms-3">
                                                <Icon icon="logos:twitter" color="#fff" width="44" height="44" />
                                            </a>
                                        </li>
                                    </List>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12}>
                            <a href="https://www.ensembleconsultancy.com/" target="_blank" rel="noreferrer"
                                className="d-inline-block w-100">
                                Powered by <img alt="Ensemble" src={`${cdn.url}/ensemble.png`} width={100} height={20}
                                    className="ms-2" />
                            </a>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
};
export default Footer;
