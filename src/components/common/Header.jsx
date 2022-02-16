import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import {useEffect, useState} from "react";
import Images from "../../static/images";
import LoginPopup from "../popup/LoginPopup";
import RegisterPopup from "../popup/RegisterPopup";

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

  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isRegisterModal, setIsRegisterModal] = useState(false);
  const [showmenu, setShowMenu] = useState(false);

  const handleLoginModal = () => {
    setIsLoginModal(!isLoginModal);
  }

  const handleRegisterModal = () => {
    setIsRegisterModal(!isRegisterModal);
  }
  const menuToggle = () => {
    setShowMenu(!showmenu);
  }
  return (
      <>
        <div>
          <Navbar container expand="md" className="custome-header" light>
            <NavbarBrand href="/">
              <img src={Images.Logo} alt="Logo" className="logo" />
              <img src={Images.BlackLogo} alt="Logo" className="on-scroll-logo" />
            </NavbarBrand>
            <NavbarToggler onClick={()=>menuToggle()} />
            <Collapse navbar isOpen={showmenu}>
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
              <Button className="register nav-link" onClick={() => handleRegisterModal()}>
                Register
              </Button>
              <Button className="nav-link" onClick={() => handleLoginModal()}>
                Login
              </Button>
            </div>
          </Navbar>
        </div>

        {isLoginModal &&
            <LoginPopup open={isLoginModal} handleClose={handleLoginModal}/>
        }

        {isRegisterModal &&
            <RegisterPopup open={isRegisterModal} handleClose={handleRegisterModal}/>
        }
      </>
  );
};
export default Header;
