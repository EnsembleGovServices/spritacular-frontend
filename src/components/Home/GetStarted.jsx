import { Container, Row, Col, Button } from "reactstrap";
import Images from "../../static/images";

const GetStarted = () => {
  return (
    <>
      <div className="get-started-section">
        <div className="top-polygone">
          <img src={Images.Topimage} alt="Shape" />
        </div>
        <Container>
          <Row className="align-items-center">
            <div className="top-text-polygon">
              <img src={Images.Observepolygon} alt="Shape" />
            </div>
            <Col md={6} xs={12} className="works-gap">
              <div className="how-it-work-text-info">
                <h3>
                  Join Our Global Community and Participate in Sprites
                  Observations!
                </h3>
              </div>
            </Col>
            <Col md={6} xs={12}>
              <Button className="get-start">Get Started</Button>
            </Col>
            <div className="bottom-text-polygon">
              <img src={Images.Observepolygon} alt="Shape" />
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default GetStarted;
