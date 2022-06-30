import {Button, Card, CardBody, Col, Container, Row} from "reactstrap";
import '../assets/scss/component/error.scss';
import {Link, NavLink, useNavigate} from "react-router-dom";
import { cdn, routeUrls } from './../helpers/url';

const Error = () => {
  const navigate = useNavigate();

  return(
      <section className="error">
        <i className="d-inline-block  error-bg"><img src={`${cdn.url}/error_bg.svg`} alt="Error bg" width="1482" height="880" /></i>
        <Container>
          <Row className="align-items-center">
            <Col xs={{size: 12, order: 2}} md={{size: 6, order: 1}}>
                <Card className="shadow-none border-0 bg-transparent">
                  <CardBody className="text-center text-md-start p-0">
                    <h2 className="mb-2 mb-md-4">Opps !!
                      <p className="m-0">Page Not Found</p>
                    </h2>
                    <p>We're sorry, The page you requested couldn't be found.</p>
                    <div className="mt-4">
                      <Button outline onClick={()=> navigate(-1)} className="me-2 px-3">Go Back</Button>
                      <NavLink to={routeUrls.home} className="btn btn-secondary px-4">Back to Home</NavLink>
                    </div>
                  </CardBody>
                </Card>
            </Col>
            <Col xs={{size: 12, order: 1}} md={{size: 6, order: 2}} className="text-center text-md-end mb-3 mb-md-0">
              <Link to={routeUrls.home}>
                <img className="error-img" src={`${cdn.url}/404-error.svg`} alt="Page not found" width="1132" height="800"/>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
  )
}
export default Error;