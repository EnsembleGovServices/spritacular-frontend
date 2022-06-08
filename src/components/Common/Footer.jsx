import "../../assets/scss/component/footer.scss";
import {Link} from "react-router-dom";
import {Col, Container, Row, List} from "reactstrap";
import {cdn, routeUrls} from '../../helpers/url';
import {Icon} from "@iconify/react";

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
                                <img src={`${cdn.url}/Spritacular-white.png`} alt="spritacular"/>
                            </Link>
                        </Col>
                        <Col lg={4}>
                            <Row className="mb-2 mt-4 mb-md-5 align-items-center">
                                <Col className="nasa-img col-12 col-sm-6">
                                    <div className="footer-brand">
                                        <img src={`${cdn.url}/catholic.png`} alt="spritacular"/>
                                    </div>
                                </Col>
                                <Col className="col-12 col-sm-6">
                                    <div className="footer-brand">
                                        <img src={`${cdn.url}/nasa.png`} alt="spritacular"/>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={8}>
                            <Row className="mb-2 mb-md-5 ">
                                <Col className="col-12 col-sm-4">
                                    <List type="unstyled" className="footer-links">
                                        <h6>About</h6>
                                        <li>
                                            <Link
                                                to={routeUrls.about}
                                                className="d-inline-block mb-4"
                                                title="What is Spritacular?"
                                            >
                                                What is Spritacular?
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={routeUrls.policy}
                                                className="d-inline-block mb-4"
                                                title="Policy"
                                            >
                                                Policy
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={routeUrls.policy + '?code=true'}
                                                className="d-inline-block mb-4"
                                                title="Code of Conduct"
                                            >
                                                Code of Conduct
                                            </Link>
                                        </li>
                                    </List>
                                </Col>
                                <Col className="col-12 col-sm-4">
                                    <List type="unstyled" className="footer-links">
                                        <li>
                                            <Link
                                                to={routeUrls.getStarted}
                                                className="d-inline-block mb-4"
                                                title="Get Started"
                                            >
                                                Get Started
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={routeUrls.gallery}
                                                className="d-inline-block mb-4"
                                                title="Gallery"
                                            >
                                                Gallery
                                            </Link>
                                        </li>
                                    </List>
                                    <List type="unstyled" className="footer-links">
                                        <h6>Resources</h6>
                                        <li>
                                            <Link
                                                to={routeUrls.blog}
                                                className="d-inline-block mb-4"
                                                title="Blog"
                                            >
                                                Blog
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={routeUrls.tutorials}
                                                className="d-inline-block mb-4"
                                                title="Tutorials"
                                            >
                                                Tutorials
                                            </Link>
                                        </li>
                                    </List>
                                </Col>
                                <Col className="col-12 col-sm-4">
                                    <List type="unstyled" className="footer-links footer-long-links">
                                        <h6>Community</h6>
                                        <li>
                                            <Link
                                                to={routeUrls.home}
                                                className="d-inline-block mb-4"
                                                title="Meet the Team"
                                            >
                                                Meet the Team
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={routeUrls.home}
                                                className="d-inline-block mb-4"
                                                title="Volunteer Profiles"
                                            >
                                                Volunteer Profiles
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={routeUrls.home}
                                                className="d-inline-block mb-4"
                                                title="Become an Ambassador"
                                            >
                                                Become an Ambassador
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={routeUrls.home}
                                                className="d-inline-block mb-4"
                                                title="Join Spritacular Google Group"
                                            >
                                                Join Spritacular Google Group
                                            </Link>
                                        </li>
                                    </List>
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
                                            <Link
                                                to={routeUrls.home}
                                                className="d-inline-block ms-3"
                                                title="Twitter"
                                            >
                                                <Icon icon="arcticons:twitter" color="#fff" width="28" height="28"/>
                                            </Link>
                                        </li>
                                    </List>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12}>
                            <a href="https://www.ensembleconsultancy.com/" target="_blank" rel="noreferrer"
                               className="d-inline-block w-100">
                                Powered by <img alt="Ensemble" src={`${cdn.url}/ensemble.png`} width="120"
                                                className="ms-2"/>
                            </a>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
};
export default Footer;
