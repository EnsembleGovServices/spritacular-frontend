import {Container, Row, Col, Button} from 'reactstrap';
import Images from '../../static/images';

const HomeHowItWorks = () =>{
    return(
        <>
            <div className="how-it-works-section">
        <div className="top-polygone">
          <img src={Images.Topimage} alt="" />
        </div>
        <div className="bottom-polygone">
          <img src={Images.Bottompolygon} alt="" />
        </div>
        <Container>
          <h2>How it works</h2>
          <Row>
            <Col md={6} xs={12} className="works-gap">
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
            <Col md={6} xs={12} className="works-gap">
              <img
                src={Images.Register}
                alt="Register/SignUp demo"
                className="w-100"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} xs={12} className="works-gap order-2 order-md-1">
              <img
                src={Images.HowitworksSecond}
                alt="How it works under Register"
                className="w-100"
              />
            </Col>
            <Col md={6} xs={12} className="works-gap order-1 order-md-2">
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
          </Row>
          <Row>
            <Col md={6} xs={12} className="works-gap">
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
            <Col md={6} xs={12} className="works-gap">
              <div className="shadow-lg shadow-sm p-3  bg-white rounded">
                <img src={Images.Dragdrop} alt="Share" className="w-100" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} xs={12} className="works-gap order-2 order-md-1">
              <div className="shadow-lg shadow-sm p-3  bg-white rounded ">
                <img src={Images.Jet} alt="jet" className="w-100" />
              </div>
            </Col>
            <Col md={6} xs={12} className="works-gap order-1 order-md-2">
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
    )
}

export default HomeHowItWorks;