import {
  Badge,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { useEffect } from "react";
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
            <NavLink href="#">Login</NavLink>
          </div>
        </Navbar>
      </div>
    </>
  );
};
export default Header;
