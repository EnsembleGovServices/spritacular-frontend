import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { routeUrls, cdn } from '../../helpers/url';

const GetStarted = () => {
    return (
        <section className="get-started-section">
            <div className="top-polygone">
                <img src={`${cdn.url}/how-it-works-top.png`} alt="Shape" />
            </div>
            <Container>
                <Row className="align-items-center">
                    <div className="top-text-polygon">
                        <img src={`${cdn.url}/Learn-observe-polygon.png`} alt="Shape" />
                    </div>
                    <Col md={6} xs={12} className="works-gap">
                        <div className="how-it-work-text-info">
                            <h3>
                                Join our global community and contribute your observations!
                            </h3>
                        </div>
                    </Col>
                    <Col md={6} xs={12}>
                        <Link to={routeUrls.getStarted} className="btn btn-secondary get-start">Get Started</Link>
                    </Col>
                    <div className="bottom-text-polygon">
                        <img src={`${cdn.url}/Learn-observe-polygon.png`} alt="Shape" />
                    </div>
                </Row>
            </Container>
        </section>
    );
};

export default GetStarted;
