import { Container, Row, Col } from "reactstrap";
import Images from "../../static/images";
import Counter from "../../helpers/counter";
const HomeCounter = () => {


  return (
    <>
      <div className="counter-main">
        <Container>
          <Row>
            <Col md={4} sm={6}>
              <div className="counter-inner">
                <div className="left-image">
                  <img src={Images.User} alt="Users" />
                </div>
                <div className="right-counter">
                  <Counter end="5000" speed="10" />
                  <p>Volunteers</p>
                </div>
              </div>
            </Col>
            <Col md={4} sm={6}>
              <div className="counter-inner">
                <div className="left-image">
                  <img src={Images.Submit} alt="user" />
                </div>
                <div className="right-counter">
                  <Counter end="8000" speed="20" />
                  <p>Observations</p>
                </div>
              </div>
            </Col>
            <Col md={4} sm={12}>
              <div className="counter-inner">
                <div className="left-image">
                  <img src={Images.Country} alt="country" />
                </div>
                <div className="right-counter">
                  <Counter end="250" />
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
