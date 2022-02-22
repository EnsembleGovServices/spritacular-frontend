import { Link } from "react-router-dom";
import { Col, Container, Row, List } from "reactstrap";
import Images from "../../static/images";
import "../../assets/scss/component/footer.scss";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-black position-relative">
        <div className="footer-wrapper position-relative">
          <Container>
            <Row className="gy-2 gy-md-3">
              <Col lg={12}>
                <Link
                  to={"/"}
                  title="Spritacular"
                  className="d-inline-block mb-3"
                >
                  <img src={Images.spritacularWhite} alt="spritacular" />
                </Link>
              </Col>
              <Col lg={4}>
                <Row className="mb-2 mb-md-5 align-items-center">
                  <Col className="nasa-img col-12 col-sm-6">
                    <div className="footer-brand">
                      <img src={Images.Catholic} alt="spritacular" />
                    </div>
                  </Col>
                  <Col className="col-12 col-sm-6">
                    <div className="footer-brand">
                      <img src={Images.Nasa} alt="spritacular" />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col lg={8}>
                <Row className="mb-2 mb-md-5 ">
                  <Col className="col-12 col-sm-4">
                    <List type="unstyled" className="footer-links">
                      <li>
                        <Link
                          to={"/"}
                          className="d-inline-block mb-4"
                          title="Discover Now"
                        >
                          Discover Now{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/"}
                          className="d-inline-block mb-4"
                          title="Our Story"
                        >
                          Our Story{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/"}
                          className="d-inline-block mb-4"
                          title="FAQ"
                        >
                          FAQ{" "}
                        </Link>
                      </li>
                    </List>
                  </Col>
                  <Col className="col-12 col-sm-4">
                    <List type="unstyled" className="footer-links">
                      <li>
                        <Link
                          to={"/"}
                          className="d-inline-block mb-4"
                          title="About Us"
                        >
                          About Us{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/"}
                          className="d-inline-block mb-4"
                          title="Gallery"
                        >
                          Gallery{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/"}
                          className="d-inline-block mb-4"
                          title="Tutorial"
                        >
                          Tutorial{" "}
                        </Link>
                      </li>
                    </List>
                  </Col>
                  <Col className="col-12 col-sm-4">
                    <List type="unstyled" className="footer-links">
                      <li>
                        <Link
                          to={"/"}
                          className="d-inline-block mb-4"
                          title="Blog"
                        >
                          Blog{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/"}
                          className="d-inline-block mb-4"
                          title="Verify"
                        >
                          Verify{" "}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/"}
                          className="d-inline-block mb-4"
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
                  <Col className="col-12 col-sm-6">
                    <p className="text-white">
                      © 2022 Spritacular. All rights reserved.
                    </p>
                  </Col>
                  <Col className="col-12 col-sm-6">
                    <List
                      type="unstyled"
                      className="d-flex m-0 footer-social-links"
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
