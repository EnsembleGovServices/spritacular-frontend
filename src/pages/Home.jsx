import { Button, Col, Container, Row } from "reactstrap";
import Images from "../static/images";
import ObservationCard from "./ObservationCard";

const Home = () => {
  return (
    <>
      <div className="hero-banner">
        <Container>
          <div className="hero-banner-inner">
            <div className="border-line"/>
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
      {/* ----- Map Section Start----- */}
      <div className="map_section">
        <div className="bg-black map_inner">
          <Container>
            <div className="position-relative">
              <div className="obervation-card_wrapper">
                  <Row>
                      <Col lg={3}>
                          <ObservationCard/>
                      </Col>
                      <Col lg={3}>
                          <ObservationCard/>
                      </Col>
                      <Col lg={3}>
                          <ObservationCard/>
                      </Col>
                      <Col lg={3}>
                          <ObservationCard/>
                      </Col>
                  </Row>
              </div>
            </div>
          </Container>
        </div>
      </div>
      {/* ----- Map Section End----- */}
      <div className="how-it-works-section">
        <div className="top-polygone">
          <img src={Images.Topimage} alt="" />
        </div>
        <div className="bottom-polygone">
          <img src={Images.Bottompolygon} alt="" />
        </div>
        <Container>
          <h2>How it works</h2>
          <Row className="gy-5">
            <Col xs={6}>
              <div className="how-it-work-text-info">
                <h3>
                  <span>1</span>Register
                </h3>
                <p>
                  Create an account to become a Spritacular Citizen Scientist.
                </p>
                <div className="register-polygon">
                  <img src={Images.Registerpolygon} alt="" />
                </div>
              </div>
            </Col>
            <Col xs={6}>
              <img
                src={Images.Register}
                alt="Register/SignUp demo"
                className="w-100"
              />
            </Col>

            <Col xs={6}>
              <img
                src={Images.HowitworksSecond}
                alt="How it works under Register"
                className="w-100"
              />
            </Col>
            <Col xs={6}>
              <div className="how-it-work-text-info">
                <h3>
                  <span>2</span>Learn & Observe
                </h3>
                <p>
                  Complete the observation tutorial before starting to observe a
                  sprite. This is intended to make sure your observation inline
                  with our standards.
                </p>
                <Button className="view-tutorial">View Tutorial</Button>
                <div className="observe-polygon">
                  <img src={Images.Observepolygon} alt="" className="w-100" />
                </div>
              </div>
            </Col>

            <Col xs={6}>
              <div className="how-it-work-text-info">
                <h3>
                  <span>3</span>Share
                </h3>
                <p>
                  Upload your observation images and choose the appropriate
                  observation category(sprite, elve, gigantic jet, blue jet, or
                  other). You need to complete other details as well such as
                  location, date, time, and your camera details.
                </p>
                <div className="share-polygon">
                  <img src={Images.Sharepolygon} alt="" />
                </div>
              </div>
            </Col>
            <Col xs={6}>
              <img src={Images.Dragdrop} alt="Share" className="w-100" />
            </Col>

            <Col xs={6}>
              <img src={Images.Jet} alt="Share" className="w-100" />
            </Col>
            <Col xs={6}>
              <div className="how-it-work-text-info">
                <h3>
                  <span>4</span>Engage
                </h3>
                <p>
                  Review and left comment on other citizen scientist
                  observations.
                </p>
                <div className="engage-polygon">
                  <img src={Images.Engagepolygon} alt="Share" />
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
