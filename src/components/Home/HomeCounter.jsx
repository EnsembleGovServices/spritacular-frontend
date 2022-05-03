import { Container, Row, Col } from "reactstrap";
import Images from "../../static/images";
import Counter from "../../helpers/counter";
import useObservationsData from "../../hooks/useObservationsData";
const HomeCounter = () => {
  const { recentObservation } = useObservationsData();
  let userCount = recentObservation?.observation_user_count,
      observationCount = recentObservation?.observation_count,
      countriesCount = recentObservation?.observation_country_count;

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
                  <Counter end={userCount} speed={1} />
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
                  <Counter end={observationCount} speed={1} />
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
                  <Counter end={countriesCount} speed={1} />
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
