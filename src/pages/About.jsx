import { Button, Col, Container, Row } from "reactstrap";
import "../assets/scss/component/about.scss";

const About = () => {
  return (
    <>
      <div className="about_page position-relative">
        <div className="common-banner"></div>
        <section className={'banner-content'}>
          <Container className={'position-relative'}>
            <div className="banner-inner">
              <Row>
                <Col xs={12}>
                  <h2>About Us</h2>
                </Col>
              </Row>
              <div className="about-card">
                <h3>Spritacular Headquarter</h3>
                <p>1800 Lorem Ipsum Pkwy Mountain View, CA 94043 United States</p>
                <Button className="contact-btn">Contact Us</Button>
              </div>
            </div>
          </Container>
        </section>
        <section className="about-content">
        <Container>
          <div className="about-content-inner">
            <Row>
              <Col md={4}>
                <h3>
                  We Collect, Present, and Manage a Database of Sprites
                  Observations
                </h3>
              </Col>
              <Col md={8}>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque quis sapien et lacus dignissim fermentum id quis erat.
                  Duis at sodales sapien, in rhoncus magna. Proin tempor massa
                  ut aliquet vehicula. Duis vulputate massa odio, quis eleifend
                  nunc vulputate sit amet. Cras dui turpis, tincidunt ac nunc
                  at, ullamcorper convallis mauris. Nam accumsan risus sapien,
                  sit amet vulputate magna pulvinar eget. Pellentesque cursus,
                  nisi at sagittis fermentum, magna justo finibus dui, gravida
                  ullamcorper quam mauris in felis. Donec vel commodo leo.
                  Integer quis leo molestie, rutrum arcu eget, vestibulum metus.
                  Nullam eget eros sit amet diam vestibulum condimentum. Sed nec
                  mauris nec nisl consectetur rutrum. In ultrices pellentesque
                  orci, sit amet porta mauris lacinia facilisis.
                </p>
                <p>
                  Curabitur nec lorem a ex vehicula commodo. Sed rutrum posuere
                  magna vel dapibus. Maecenas vitae purus lobortis, congue ante
                  et, varius nunc. Nunc dignissim nulla eu mollis tincidunt.
                  Cras viverra eros vitae dignissim egestas. In pharetra massa
                  et blandit suscipit. Vivamus fermentum mauris enim, nec dictum
                  est tempor nec. Nam finibus sagittis purus.
                </p>
              </Col>
            </Row>
            <div className="about-col">
              <Row>
                <Col md={4}>
                  <h3>Sprites Observations</h3>
                  <p>
                    Sprites or red sprites are large-scale electric discharges
                    that occur high above thunderstorm clouds, they appear as
                    luminous reddish-orange flashes.
                  </p>
                </Col>
                <Col md={4}>
                  <h3>Citizen Scientists</h3>
                  <p>
                    Storm chasers who take images and collect data on Sprite
                    events and other Transient Luminous Events (TLEs). They want
                    to share their work and be part of the broader scientific
                    community in collaboration with NASA.
                  </p>
                </Col>
                <Col md={4}>
                  <h3>Acme Section</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Quisque quis sapien et lacus dignissim fermentum id quis
                    erat. Duis at sodales sapien, in rhoncus magna.
                  </p>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </section>
      </div>
    </>
  );
};
export default About;
