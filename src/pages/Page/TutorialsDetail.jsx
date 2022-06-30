import { Link } from "react-router-dom";
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Container,
  Row,
} from "reactstrap";
import "../assets/scss/component/tutorialdetail.scss";
import { routeUrls } from './../helpers/url';

const TutorialsDetail = () => {
  return (
    <div className="tutorial-details_page position-relative">
      <div className="common-banner"></div>
      <section className="tutorial-detail-main">
        <Container>
          <div className="breadcrumb-main">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to={'/'+routeUrls.home}>Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to={'/'+routeUrls.tutorials}>Tutorial </Link>
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
                <img src={`${cdn.url}/Tutorial-Detail.png`} alt="TutorialDetail" />
              </div>

              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                quis sapien et lacus dignissim fermentum id quis erat. Duis at
                sodales sapien, in rhoncus magna. Proin tempor massa ut aliquet
                vehicula. Duis vulputate massa odio, quis eleifend nunc
                vulputate sit amet. Cras dui turpis, tincidunt ac nunc at,
                ullamcorper convallis mauris. Nam accumsan risus sapien, sit
                amet vulputate magna pulvinar eget. Pellentesque cursus, nisi at
                sagittis fermentum, magna justo finibus dui, gravida ullamcorper
                quam mauris in felis. Donec vel commodo leo. Integer quis leo
                molestie, rutrum arcu eget, vestibulum metus. Nullam eget eros
                sit amet diam vestibulum condimentum. Sed nec mauris nec nisl
                consectetur rutrum. In ultrices pellentesque orci, sit amet
                porta mauris lacinia facilisis.
              </p>
            </Col>
          </Row>
          <Col md={12}>
            <h3>Observation Fields</h3>
          </Col>
          <div className="border-line"></div>
          <Row>
            <Col md={4}>
              <h4>Location</h4>
            </Col>
            <Col md={8}>
              <p>It will be automatically located by Google plugin</p>
              <ol>
                <li>
                  Country{" "}
                  <Badge className="badge-required" color="secondary">
                    Required
                  </Badge>
                </li>
                <li>
                  Geographic Coordinates
                  <Badge className="badge-required" color="secondary">
                    Required
                  </Badge>
                </li>
              </ol>
            </Col>
          </Row>
          <div className="border-line"></div>
          <Row>
            <Col md={4}>
              <h4>Observation Time</h4>
            </Col>
            <Col md={8}>
              <p className="mb-0">
                Data and time of your observation
                <Badge className="badge-required" color="secondary">
                  Required
                </Badge>
              </p>
            </Col>
          </Row>
          <div className="border-line"></div>
          <Row>
            <Col md={4}>
              <h4>Camera Details</h4>
            </Col>
            <Col md={8}>
              <ol>
                <li>
                  Camera Type
                  <Badge className="badge-required" color="secondary">
                    Required
                  </Badge>
                </li>
                <li>Frame Rate</li>
                <li>ISO</li>
                <li>Field-to-view</li>
                <li>Shutter Speed</li>
                <li>
                  Lens Type
                  <Badge className="badge-required" color="secondary">
                    Required
                  </Badge>
                </li>
              </ol>
            </Col>
          </Row>
          <div className="border-line"></div>
          <Row>
            <Col md={4}>
              <h4>Direction/Azimuth</h4>
            </Col>
            <Col md={8}>
              <p className="mb-0">N, S, E, W, NE, SE, SW, NW</p>
            </Col>
          </Row>
          <div className="border-line"></div>
          <Row>
            <Col md={4}>
              <h4>Special Equipments</h4>
            </Col>
            <Col md={8}>
              <p className="mb-0">
                If you use any special equipment or filters, please provide
                note about that
              </p>
            </Col>
          </Row>
          <div className="border-line"></div>
          <Row>
            <Col md={4}>
              <h4>Comments</h4>
            </Col>
            <Col md={8}>
              <p className="mb-0">
                Describe precisely how you captured your video/image.
                (observations set up, camera settings, and steps you take to
                capture your observation)
              </p>
            </Col>
          </Row>
          <div className="border-line"></div>
          <Row>
            <Col md={4}>
              <h4>Image/Video File</h4>
            </Col>
            <Col md={8}>
              <p className="mb-0">
                Please make sure to upload your raw (unprocessed) image or
                video of your observation.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};
export default TutorialsDetail;
