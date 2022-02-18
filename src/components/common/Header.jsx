import {
  Button,
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import { useEffect, useState } from "react";
import Images from "../../static/images";
import LoginPopup from "../popup/LoginPopup";
import RegisterPopup from "../popup/RegisterPopup";
import routesList from "../../routes/MainRoute";
import "../../assets/scss/component/header.scss";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Header = (props) => {
  const { auth } = useAuth();
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isRegisterModal, setIsRegisterModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const homeUrl = location.pathname === "/";

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

  const handleLoginModal = () => {
    setIsLoginModal(!isLoginModal);
  };

  const handleRegisterModal = () => {
    setIsRegisterModal(!isRegisterModal);
  };
  const menuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleUserMenuDropdown = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <>
      <div>
        <Navbar
          container
          expand="md"
          className={homeUrl ? "custome-header" : "custome-header bg-not-home"}
          light
        >
          <Link to="/" className="navbar-brand">
            <img src={Images.Logo} alt="Logo" className="logo" />
            <img src={Images.BlackLogo} alt="Logo" className="on-scroll-logo" />
          </Link>
          <NavbarToggler onClick={() => menuToggle()} />
          <Collapse navbar isOpen={showMenu}>
            <Nav className="" navbar>
              {routesList
                .filter((item) => item.name !== "home")
                .map((route, index) => {
                  return (
                    <NavItem key={index}>
                      <Link
                        to={route.path}
                        title={route.name}
                        className="nav-link text-capitalize"
                      >
                        {route.name}
                      </Link>
                    </NavItem>
                  );
                })}
              <NavItem className="d-md-none d-xs-block">
                <Button
                  className="register nav-link"
                  onClick={() => handleRegisterModal()}
                >
                  Register
                </Button>
              </NavItem>
              <NavItem className="d-md-none d-xs-block">
                <Button
                  className="nav-link login-btn"
                  onClick={() => handleLoginModal()}
                >
                  Login
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
          {/* {!auth ? (
                <div className="right-menu">
                  <Button
                      className="register nav-link"
                      onClick={() => handleRegisterModal()}
                  >
                    Register
                  </Button>
                  <Button
                      className="nav-link login-btn"
                      onClick={() => handleLoginModal()}
                  >
                    Login
                  </Button>
                </div>
            ) : (
                <h5
                    className="text-white"
                >
                  Hi, {auth?.first_name}
                </h5>
            )} */}
          <div className="after-login-right-menu">
            <Dropdown
              className="user-menu"
              isOpen={showUserMenu}
              toggle={handleUserMenuDropdown}
            >
              <DropdownToggle caret>
                <img src={Images.UserPlaceholder} alt="UserPlaceholder" /> Carl
                Nielsen
              </DropdownToggle>
              <DropdownMenu container="body">
                <DropdownItem>Edit Profile</DropdownItem>
                <DropdownItem>Change Password</DropdownItem>
                <DropdownItem>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Navbar>
      </div>

      {isLoginModal && (
        <LoginPopup
          open={auth ? false : isLoginModal}
          handleClose={handleLoginModal}
        />
      )}

      {isRegisterModal && (
        <RegisterPopup
          open={auth ? false : isRegisterModal}
          handleClose={handleRegisterModal}
        />
      )}
    </>
  );
};
export default Header;
