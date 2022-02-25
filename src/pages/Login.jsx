import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  ModalHeader,
} from "reactstrap";
import "../assets/scss/component/modal.scss";

const Login = () => {
  return (
    <>
      <div className="login-main ">
        <div className="common-modal">
          <div className="modal-content">
            <ModalHeader>Login</ModalHeader>
            <div className="modal-body">
              <Form>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email address"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </FormGroup>
                <FormText className="forgot-password">
                  <Button>Forgot Password?</Button>
                </FormText>
                <FormGroup>
                  <Button type="submit" className="modal-btn" disabled>
                    Login
                  </Button>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
