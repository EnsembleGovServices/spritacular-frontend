import Login from "../../components/Auth/Login";
import {Col, Container, Row} from "reactstrap";

const LoginPage = () => {
  return(
      <section className="min-vh-100 d-flex align-items-center justify-content-center">
        <Container>
            <Row>
                <Col sm={{size:4, offset: 4}}>
                    <Login />
                </Col>
            </Row>
        </Container>
      </section>
  )
}
export default LoginPage;