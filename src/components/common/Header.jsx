import {
  Button,
  Col,
  Collapse,
  FormText,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import { useEffect, useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import Images from "../../static/images";

const Header = () => {
  useEffect(() => {
    document.addEventListener("scroll", () => {
      let scroll = window.pageYOffset || document.documentElement.scrollTop,
        navbarEl = document.querySelector(".custome-header");

      if (scroll > 80) {
        navbarEl.classList.add("bg-color-menu");
      } else {
        navbarEl.classList.remove("bg-color-menu");
      }
    });
  }, []);

  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <div>
        <Navbar container expand="md" className="custome-header">
          <NavbarBrand href="/">
            <img src={Images.Logo} alt="Logo" className="logo" />
            <img src={Images.BlackLogo} alt="Logo" className="on-scroll-logo" />
          </NavbarBrand>
          <NavbarToggler onClick={function noRefCheck() {}} />
          <Collapse navbar>
            <Nav className="" navbar>
              <NavItem>
                <NavLink href="">About Us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Gallery</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Tutorial</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Blog</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Verify</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          <div className="right-menu">
            <NavLink href="#" className="register btn btn-link">
              Register
            </NavLink>
            <NavLink href="#" onClick={() => openModal(true)}>
              Login
            </NavLink>
          </div>
        </Navbar>
      </div>

      <Modal isOpen={open} centered className="comman-modal">
        {/*<ModalHeader>
          Login
          <Button className="close-icon" onClick={() => openModal(false)}>
            <img src={Images.Modalcloseicon} alt="close-icon" />
          </Button>
        </ModalHeader>*/}
        <ModalHeader>
          Sign up
          <Button className="close-icon" onClick={() => openModal(false)}>
            <img src={Images.Modalcloseicon} alt="close-icon" />
          </Button>
          {/*<p>Explore, observe, learn and engage with our community</p>*/}
        </ModalHeader>
        <ModalBody>
          {/*<Form>
            <FormGroup>
              <Input type="email" name="email" placeholder="Email address" />
            </FormGroup>
            <FormGroup>
              <Input type="password" name="password" placeholder="Password" />
            </FormGroup>
            <FormText className="forgot-password">
              <a href="#">Forgot Password?</a>
            </FormText>
            <FormGroup>
              <Button className="modal-btn" disabled>
                Login
              </Button>
            </FormGroup>
          </Form>*/}
          <Form>
            <Row>
              <Col sm={6}>
                <FormGroup>
                  <Input
                    type="text"
                    name="First Name"
                    placeholder="First name"
                  />
                </FormGroup>
              </Col>
              <Col sm={6} className="">
                <FormGroup>
                  <Input type="text" name="Last name" placeholder="Last name" />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Input type="email" name="email" placeholder="Email address" />
            </FormGroup>
            <FormGroup>
              <Input type="password" name="password" placeholder="Password" />
            </FormGroup>
            <FormGroup>
              <Input type="select" name="select" id="exampleSelect">
                <option>Location</option>
                <option>Ahmedabad</option>
                <option>Pune</option>
                <option>Bombay</option>
              </Input>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" /> Creating an account means you agree
                with our with our <a href="#">Privacy Policy</a> and{" "}
                <a href="#">Terms.</a>
              </Label>
            </FormGroup>
            <FormGroup>
              <Button className="modal-btn" disabled>
                Create Account
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Header;
