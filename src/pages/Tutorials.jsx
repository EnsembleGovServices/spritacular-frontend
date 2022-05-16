import "../assets/scss/component/tutorials.scss";
import {Link} from "react-router-dom";
import {Col, Container, Row} from "reactstrap";
import Images from "../static/images";
import {routeUrls} from '../helpers/url';

const Tutorials = () => {
    return (
        <>
            <div className="tutorial_page position-relative">
                <div className="common-banner"></div>
                <section className="tutorial-main">
                    <Container>
                        <h2>User Tutorials</h2>
                        <Row className='gx-5 gy-3'>
                            <Col md={4}>
                                <Link to={'/' + routeUrls.tutorialsDetail} title="Tutorial Title 1 Goes Here"
                                      className="d-inline-block">
                                    <div className='tutorial-img'>
                                        <img src={Images.HowitworksSecond} alt="Users"/>
                                    </div>
                                    <h3>Tutorial Title 1 Goes Here</h3>
                                    <p>
                                        Short description lorem ipsum dolor sit amet conseqtetur
                                        adipiscing elit tempor dolor.
                                    </p>
                                </Link>
                            </Col>

                        </Row>
                    </Container>
                </section>
            </div>
        </>
    );
};
export default Tutorials;
