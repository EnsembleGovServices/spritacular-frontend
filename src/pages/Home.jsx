import { Button, Col, Container, Row } from "reactstrap";
import Images from "../static/images";

const Home = () => {
  return (
    <>
      <div className="hero-banner">
        <Container>
          <div className="hero-banner-inner">
            <div className="border-line"></div>
            <div className="banner-text">
              <h2>Explore Sprites Observations!</h2>
              <p>
                Learn about sprites and other Transient Luminous Events (TLEs),
                upload your own observations, and engage with our citizen
                scientist community.
              </p>
              <Button className="explore-btn">Explore Now</Button>
            </div>
          </div>
        </Container>
      </div>
      <div className="counter-main">
        <Container>
          <Row>
            <Col>
              <div className="counter-inner">
                <div className="left-image">
                  <img src={Images.User} alt="Users" />
                </div>
                <div className="right-counter">
                  <h3>22,500</h3>
                  <p>Storm chasers</p>
                </div>
              </div>
            </Col>
            <Col>
              <div className="counter-inner">
                <div className="left-image">
                  <img src={Images.Submit} alt="user" />
                </div>
                <div className="right-counter">
                  <h3>5,678,910</h3>
                  <p>Images Submitted</p>
                </div>
              </div>
            </Col>
            <Col>
              <div className="counter-inner">
                <div className="left-image">
                  <img src={Images.Country} alt="country" />
                </div>
                <div className="right-counter">
                  <h3>250</h3>
                  <p>Countries Participated</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
