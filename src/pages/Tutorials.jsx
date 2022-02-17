import { Col, Container, Row } from "reactstrap";
import "../assets/scss/component/tutorials.scss";
import Images from "../static/images";

const Tutorials = () => {
  return (
    <>
      <section className="tutorial-main">
        <Container>
          <h2>User Tutorials</h2>
          <Row>
            <Col md={4}>
              <div>
                <img src={Images.TutorialTitle} alt="Users" />
              </div>
              <h3>Tutorial Title 1 Goes Here</h3>
              <p>
                Short description lorem ipsum dolor sit amet conseqtetur
                adipiscing elit tempor dolor.
              </p>
            </Col>
            <Col md={4}>
              <div>
                <img src={Images.TutorialTitle} alt="Users" />
              </div>
              <h3>Tutorial Title 1 Goes Here</h3>
              <p>
                Short description lorem ipsum dolor sit amet conseqtetur
                adipiscing elit tempor dolor.
              </p>
            </Col>
            <Col md={4}>
              <div>
                <img src={Images.TutorialTitle} alt="Users" />
              </div>
              <h3>Tutorial Title 3 Goes Here</h3>
              <p>
                Short description lorem ipsum dolor sit amet conseqtetur
                adipiscing elit tempor dolor.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default Tutorials;
