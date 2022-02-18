import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from "reactstrap";
import "../assets/scss/component/tutorialdetail.scss";
import Images from "../static/images";

const TutorialsDetail = () => {
  return (
    <>
      <section className="tutorial-detail-main">
        <Container>
          <div className="breadcrumb-main">
            <Breadcrumb>
              <BreadcrumbItem>
                <a href="/">Home</a>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <a href="/">Tutorial </a>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                Preparing data before uploading observation
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <h2>Preparing Data Before Uploading Observation</h2>
          <Row>
            <Col md={12}>
              <div>
                <img src={Images.TutorialDetail} alt="TutorialDetail" />
              </div>
              <h3>Tutorial Title 1 Goes Here</h3>
              <p>
                Short description lorem ipsum dolor sit amet conseqtetur
                adipiscing elit tempor dolor.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default TutorialsDetail;
