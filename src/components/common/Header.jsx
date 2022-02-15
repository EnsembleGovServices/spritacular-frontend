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
import Images from "../../static/images";

const Header = () => {
  return (
    <>
      <div>
        <Navbar color="light" expand="md" light>
          <NavbarBrand href="/">
            <img src={Images.Logo} alt="Logo" />
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
            <Badge href="#">Register</Badge>
            <Badge href="#">Login</Badge>
          </div>
        </Navbar>
      </div>
    </>
  );
};
export default Header;
