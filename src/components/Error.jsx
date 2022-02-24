import {Button, Card, CardBody, Col, Container, Row} from "reactstrap";
import '../assets/scss/component/error.scss';
import {NavLink, useNavigate} from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return(
      <section className="error">
        <Container>
          <Row >
            <Col md={{size: 6, offset: 3}}>
                <Card className="shadow-lg border-0">
                  <CardBody className="text-center p-md-5">
                    <h3>The requested content couldn't be found</h3>
                    <div className="mt-4">
                      <Button color="primary" onClick={()=> navigate(-1)} className="me-2">Go Back</Button>
                      <NavLink to="/" color="success">Back to Home</NavLink>
                    </div>
                  </CardBody>
                </Card>
            </Col>
          </Row>
        </Container>
      </section>
  )
}
export default Error;