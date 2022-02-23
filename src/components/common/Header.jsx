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
import ChangePasswordPopup from "../popup/ChangePasswordPopup";
import UserProfilePopup from "../popup/UserProfilePopup";
import {baseURL} from "../../helpers/url";

const Header = (props) => {
  const { auth, setAuth, persist, setPersist } = useAuth();
  const [user, setUser] = useState(auth?.user);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isRegisterModal, setIsRegisterModal] = useState(false);
  const [isChangePasswordModal, setIsChangePasswordModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showUserProfilePopup, setShowUserProfilePopup] = useState(true);
  const location = useLocation();
  const homeUrl = location.pathname === "/";

  const Logout = () => {
    localStorage.removeItem("persist");
    localStorage.removeItem("refresh");
    setAuth("");
    setPersist(false);
  };

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
    setUser(auth?.user);
  }, [auth?.user]);

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

  const handleChangePasswordModal = () => {
    setIsChangePasswordModal(!isChangePasswordModal);
  };

  const handleUserProfilePopup = () => {
    setShowUserProfilePopup(!showUserProfilePopup);
  };

  return (
    <>
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
        {!persist ? (
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
          <div className="after-login-right-menu">
            <Dropdown
              className="user-menu"
              isOpen={showUserMenu}
              toggle={handleUserMenuDropdown}
            >
              <DropdownToggle caret>
                {user?.profile_image ? (
                  <img
                    className="img-fluid"
                    src={baseURL.remote + user?.profile_image}
                    alt={user?.first_name}
                  />
                ) : (
                  <img
                    className="img-fluid"
                    src={Images.UserPlaceholder}
                    alt="UserPlaceholder"
                  />
                )}
                <span>
                  {user?.first_name} {user?.last_name}
                </span>
              </DropdownToggle>
              <DropdownMenu container="body">
                <DropdownItem>
                  <Link to="/profile">Edit Profile</Link>
                </DropdownItem>
                <DropdownItem onClick={() => handleChangePasswordModal()}>
                  Change Password
                </DropdownItem>
                <DropdownItem onClick={() => Logout()}>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
      </Navbar>

      {isLoginModal && (
        <LoginPopup
          open={persist ? false : isLoginModal}
          handleClose={handleLoginModal}
        />
      )}

      {isRegisterModal && (
        <RegisterPopup
          open={persist ? false : isRegisterModal}
          handleClose={handleRegisterModal}
        />
      )}

      {isChangePasswordModal && (
        <ChangePasswordPopup
          open={isChangePasswordModal}
          handleClose={handleChangePasswordModal}
          data={auth}
        />
      )}

      {auth?.user?.is_first_login && (
        <UserProfilePopup
          open={showUserProfilePopup}
          handleClose={handleUserProfilePopup}
          data={auth}
        />
      )}
    </>
  );
};
export default Header;
