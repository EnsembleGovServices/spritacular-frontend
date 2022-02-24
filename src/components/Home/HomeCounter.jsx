import { Container, Row, Col } from "reactstrap";
import Images from "../../static/images";

const HomeCounter = () => {
  return (
    <>
      <div className="counter-main">
        <Container>
          <Row>
            <Col md={4} xs={12}>
              <div className="counter-inner">
                <div className="left-image">
                  <img src={Images.User} alt="Users" />
                </div>
                <div className="right-counter">
                  <h3>22,500</h3>
                  <p>Storm Chasers</p>
                </div>
              </div>
            </Col>
            <Col md={4} xs={12}>
              <div className="counter-inner">
                <div className="left-image">
                  <img src={Images.Submit} alt="user" />
                </div>
                <div className="right-counter">
                  <h3>5,678,910</h3>
                  <p>Observations</p>
                </div>
              </div>
            </Col>
            <Col md={4} xs={12}>
              <div className="counter-inner">
                <div className="left-image">
                  <img src={Images.Country} alt="country" />
                </div>
                <div className="right-counter">
                  <h3>250</h3>
                  <p>Countries</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default HomeCounter;
