import { Link } from "react-router-dom";
import { Col, Container, Row, List } from "reactstrap";
import Images from "../../static/images";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-black position-relative">
        <div className="footer-wrapper position-relative">
          <Container>
            <Row>
              <Col lg={12}>
                <Link
                  to={"/"}
                  title="Spritacular"
                  className="d-inline-block mb-3"
                >
                  <img src={Images.spritacularWhite} alt="spritacular" />{" "}
                </Link>
              </Col>
              <Col lg={4}>
                <Row className="mb-5 align-items-center">
                  <Col lg={6} className="nasa-img">
                    <img src={Images.Nasa} alt="spritacular" />
                  </Col>
                  <Col lg={6}>
                    <img src={Images.Catholic} alt="spritacular" />
                  </Col>
                </Row>
              </Col>
              <Col lg={8}>
                <Row className="mb-5">
                  <Col>
                    <List type="unstyled">
                      <li>
                        <Link
                          to={"/"}
                          className="d-block mb-4"
                          title="Discover Now"
                        >
                          Discover Now{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/"}
                          className="d-block mb-4"
                          title="Our Story"
                        >
                          Our Story{" "}
                        </Link>
                      </li>
                      <li>
                        <Link to={"/"} className="d-block mb-4" title="FAQ">
                          FAQ{" "}
                        </Link>
                      </li>
                    </List>
                  </Col>
                  <Col>
                    <List type="unstyled">
                      <li>
                        <Link
                          to={"/"}
                          className="d-block mb-4"
                          title="About Us"
                        >
                          About Us{" "}
                        </Link>
                      </li>
                      <li>
                        <Link to={"/"} className="d-block mb-4" title="Gallery">
                          Gallery{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/"}
                          className="d-block mb-4"
                          title="Tutorial"
                        >
                          Tutorial{" "}
                        </Link>
                      </li>
                    </List>
                  </Col>
                  <Col>
                    <List type="unstyled">
                      <li>
                        <Link to={"/"} className="d-block mb-4" title="Blog">
                          Blog{" "}
                        </Link>
                      </li>
                      <li>
                        <Link to={"/"} className="d-block mb-4" title="Verify">
                          Verify{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/"}
                          className="d-block mb-4"
                          title="Register"
                        >
                          Register{" "}
                        </Link>
                      </li>
                    </List>
                  </Col>
                </Row>
              </Col>
              <Col lg={12}>
                <Row className="align-items-center">
                  <Col lg={6}>
                    <p className="mb-0 text-white">
                      © 2022 Spritacular. All rights reserved.
                    </p>
                  </Col>
                  <Col lg={6}>
                    <List
                      type="unstyled"
                      className="d-flex justify-content-end m-0"
                    >
                      <li>
                        <Link
                          to={"/"}
                          className="d-inline-block ms-3"
                          title="Facebook"
                        >
                          <img src={Images.Facebook} alt="Facebook" />{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/"}
                          className="d-inline-block ms-3"
                          title="Twitter"
                        >
                          <img src={Images.Twitter} alt="Twitter" />{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/"}
                          className="d-inline-block ms-3"
                          title="Linkedin"
                        >
                          <img src={Images.Linkedin} alt="Linkedin" />{" "}
                        </Link>
                      </li>
                    </List>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    </>
  );
};
export default Footer;
