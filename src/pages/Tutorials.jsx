import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import "../assets/scss/component/tutorials.scss";
import Images from "../static/images";
import { routeUrls } from './../helpers/url';

const Tutorials = () => {
  return (
    <>
      <section className="tutorial-main">
        <Container>
          <h2>User Tutorials</h2>
          <Row>
            <Col md={4}>
              <Link to={'/'+routeUrls.tutorialsDetail} title="Tutorial Title 1 Goes Here" className="d-inline-block">
                <div>
                  <img src={Images.TutorialTitle} alt="Users" />
                </div>
                <h3>Tutorial Title 1 Goes Here</h3>
                <p>
                  Short description lorem ipsum dolor sit amet conseqtetur
                  adipiscing elit tempor dolor.
                </p>
              </Link>
            </Col>
            <Col md={4}>
              <Link to={'/'+routeUrls.tutorialsDetail} title="Preparing Your Data Before Uploading Observation" className="d-inline-block">
                <div>
                  <img src={Images.TutorialTitle} alt="Users" />
                </div>
                <h3>Preparing Your Data Before Uploading Observation</h3>
                <p>
                  Short description lorem ipsum dolor sit amet conseqtetur
                  adipiscing elit tempor dolor.
                </p>
              </Link>
            </Col>
            <Col md={4}>
              <Link to={'/'+routeUrls.tutorialsDetail} title="Tutorial Title 3 Goes Here" className="d-inline-block">
                <div>
                  <img src={Images.TutorialTitle} alt="Users" />
                </div>
                <h3>Tutorial Title 3 Goes Here</h3>
                <p>
                  Short description lorem ipsum dolor sit amet conseqtetur
                  adipiscing elit tempor dolor.
                </p>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default Tutorials;
