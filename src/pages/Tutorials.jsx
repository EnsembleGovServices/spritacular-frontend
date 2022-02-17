import { Col, Container, Row } from "reactstrap";
import "../assets/scss/component/tutorials.scss";

const Tutorials = () => {
  return (
    <>
      <section className="tutorial-main">
        <Container>
          <h2>User Tutorials</h2>
          <Row>
            <Col md={4}></Col>
            <Col md={4}></Col>
            <Col md={4}></Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default Tutorials;
