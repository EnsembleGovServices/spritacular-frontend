import Login from "../../components/Auth/Login";
import {Col, Container, Row} from "reactstrap";
import useAuth from "../../hooks/useAuth";
import {Navigate, useLocation} from "react-router-dom";

const LoginPage = () => {
    const {auth, persist} = useAuth();
    const location = useLocation();

    if (auth && persist) {
        return <Navigate to="/" state={{ from: location }} replace />
    }
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