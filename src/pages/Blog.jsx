import { Container, Row, Col, Button } from "reactstrap";
import Images from "../../src/static/images";
import "../assets/scss/component/blog.scss";

const Blog = () => {
  return (
    <>
      <section className="blog-main">
        <Container>
          <h2 className="text-center">Spritacular Blog</h2>
          <Row>
            <Col md={6}>
              <div className="main-blog">
                <img src={Images.BlogOne} alt="" />
                <div className="blog-text">
                  <p className="text-uppercase">ACme Category</p>
                  <h3>
                    Title Goes 1 Here Lorem Ipsum Dolor Sit Amet Conseqtetur
                  </h3>
                  <p>
                    Short description goes here lorem ipsum dolor sit amet elit.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <Row className="">
                <Col md={6} className="mb-4">
                  <div className="blog-small">
                    <img src={Images.BlogTwo} alt="" />
                    <div className="blog-text">
                      <p>ACme Category</p>
                      <h3>Title 2 Goes Here Lorem Ipsum</h3>
                    </div>
                  </div>
                </Col>
                <Col md={6} className="mb-4">
                  <div className="blog-small">
                    <img src={Images.BlogTwo} alt="" />
                    <div className="blog-text">
                      <p>ACme Category</p>
                      <h3>Title 2 Goes Here Lorem Ipsum</h3>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="blog-small">
                    <img src={Images.BlogTwo} alt="" />
                    <div className="blog-text">
                      <p>ACme Category</p>
                      <h3>Title 2 Goes Here Lorem Ipsum</h3>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="blog-small">
                    <img src={Images.BlogTwo} alt="" />
                    <div className="blog-text">
                      <p>ACme Category</p>
                      <h3>Title 2 Goes Here Lorem Ipsum</h3>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="recommended-blog">
            <h3>
              Recommended for you
              <a className="view-all">View All</a>
            </h3>
            <Row>
              <Col md={4}>
                <div className="blog-small">
                  <img src={Images.BlogTwo} alt="" />
                  <div className="blog-text">
                    <p className="text-uppercase">ACme Category</p>
                    <h3>Title 2 Goes Here Lorem Ipsum</h3>
                    <p>
                      Short description goes here lorem ipsum dolor sit amet
                      elit.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="blog-small">
                  <img src={Images.BlogTwo} alt="" />
                  <div className="blog-text">
                    <p className="text-uppercase">ACme Category</p>
                    <h3>Title 2 Goes Here Lorem Ipsum</h3>
                    <p>
                      Short description goes here lorem ipsum dolor sit amet
                      elit.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="blog-small">
                  <img src={Images.BlogTwo} alt="" />
                  <div className="blog-text">
                    <p className="text-uppercase">ACme Category</p>
                    <h3>Title 2 Goes Here Lorem Ipsum</h3>
                    <p>
                      Short description goes here lorem ipsum dolor sit amet
                      elit.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Blog;
