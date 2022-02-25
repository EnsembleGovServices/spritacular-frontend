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
  NavItem
} from "reactstrap";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { baseURL } from "../../helpers/url";
import Images from "../../static/images";
import LoginPopup from "../Popup/LoginPopup";
import RegisterPopup from "../Popup/RegisterPopup";
import "../../assets/scss/component/header.scss";
import ChangePasswordPopup from "../Popup/ChangePasswordPopup";
import UserProfilePopup from "../Popup/UserProfilePopup";
import { Icon } from "@iconify/react";

const Header = (props) => {
  const { auth, setAuth, persist, setPersist } = useAuth();
  const [user, setUser] = useState(auth?.user);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isRegisterModal, setIsRegisterModal] = useState(false);
  const [isChangePasswordModal, setIsChangePasswordModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showUserProfilePopup, setShowUserProfilePopup] = useState(true);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);
  const [communityDropdown, setCommunityDropdown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);

  const location = useLocation();
  const homeUrl = location.pathname === "/";

  const Logout = () => {
    setAuth("");
    setPersist(false);
    localStorage.removeItem("persist");
    localStorage.removeItem("refresh");
    setIsRegisterModal(false);
    setIsLoginModal(false);
  };

  useEffect(() => {
    document.addEventListener("scroll", () => {
      let scroll = window.pageYOffset || document.documentElement.scrollTop,
        navbarEl = document.querySelector(".custom-header");
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
    setIsRegisterModal(false);
  };

  const handleRegisterModal = () => {
    setIsRegisterModal(!isRegisterModal);
  };
  const menuToggle = () => {
    let getBody = document.querySelector('body');
    getBody.classList.add("menu-open");
    setShowMenu(!showMenu);
  };
  const menuClose = () => {
    const getBody = document.querySelector('body');
    getBody.classList.remove("menu-open");
    setShowMenu(false);
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
        className={homeUrl ? "custom-header" : "custom-header bg-not-home"}
        light
      >
        <Link to="/" className="navbar-brand">
          <img src={Images.Logo} alt="Logo" className="logo" />
          <img src={Images.BlackLogo} alt="Logo" className="on-scroll-logo" />
        </Link>
        <NavbarToggler onClick={() => menuToggle()}>
          <Icon icon="eva:menu-outline" />
        </NavbarToggler>
        <Collapse navbar isOpen={showMenu}>
          <Button className="close-menu" onClick={() => menuClose()}>
            <Icon icon="ci:close-big" />
          </Button>
          <Nav navbar>
            <>
              {persist ? (
                <NavItem>
                  <Link
                    to="/"
                    title="My Observations"
                    className="nav-link text-capitalize"
                  >
                    My Observations
                  </Link>
                </NavItem>
              ) : '' }
            </>
            <NavItem>
              <Dropdown
                className="user-menu"
                isOpen={aboutDropdown}
                toggle={ () => setAboutDropdown(!aboutDropdown)}
              >
                <DropdownToggle>
                  About <Icon icon="fe:arrow-down" />
                </DropdownToggle>
                <DropdownMenu container="body">
                  <DropdownItem>
                    <Link to="/about" title="What is Spritacular?">
                      What is Spritacular?
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/" title="Policy">
                      Policy
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/" title="Code of Conduct">
                      Code of Conduct
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
            <NavItem>
              <Link
                to="get-started"
                title="Get Started"
                className="nav-link text-capitalize"
              >
                Get Started
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/" title="Gallery" className="nav-link text-capitalize">
                Gallery
              </Link>
            </NavItem>
            <NavItem>
              <Dropdown
                className="user-menu"
                isOpen={resourcesDropdown}
                toggle={ () => setResourcesDropdown(!resourcesDropdown)}
              >
                <DropdownToggle>
                  Resources <Icon icon="fe:arrow-down" />
                </DropdownToggle>
                <DropdownMenu container="body">
                  <DropdownItem>
                    <Link to="/blog" title="Blog">
                      Blog
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/tutorials" title="Tutorials">
                      Tutorials
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
            <NavItem>
              <Dropdown
                className="user-menu"
                isOpen={communityDropdown}
                toggle={ () => setCommunityDropdown(!communityDropdown)}
              >
                <DropdownToggle>
                  Community <Icon icon="fe:arrow-down" />
                </DropdownToggle>
                <DropdownMenu container="body">
                  <DropdownItem>
                    <Link to="/" title="Meet the Teem">
                      Meet the Teem
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/" title="Volunteer Profile">
                      Volunteer Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/" title="Become an ambassador">
                      Become an ambassador
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/" title="Join Spritacular Google Group">
                      Join Spritacular Google Group
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
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
            {/* Notification Dropdown  */}
            <Dropdown className="notify_menu" isOpen={notificationDropdown} toggle={ () => setNotificationDropdown(!notificationDropdown)}>
              <DropdownToggle className="notification">
                <Icon icon="ic:baseline-notifications" />
                <span className="notify"></span>
              </DropdownToggle>
              <DropdownMenu container="body" className="notify-open_menu">
                <DropdownItem header> Notifications (3) </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <div className="notify_wrapper">
                    <i><img src={Images.UserProfile} alt="user Profile"/></i>
                    <div className="comment_wrapper">
                      <div className="comment_details">
                        <h4>New comments</h4>
                        <p>Nice Shot!</p>
                      </div>
                      <span>5m</span>
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <div className="notify_wrapper">
                    <i><img src={Images.UserProfile} alt="user Profile"/></i>
                    <div className="comment_wrapper">
                      <div className="comment_details">
                        <h4>New vote</h4>
                        <p>John votes your Sprite Observation</p>
                      </div>
                      <span>1h</span>
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <div className="notify_wrapper">
                    <i><img src={Images.UserProfile} alt="user Profile"/></i>
                    <div className="comment_wrapper">
                      <div className="comment_details">
                        <h4>Emily replied to your comment</h4>
                        <p>Thank you!</p>
                      </div>
                      <span>1h</span>
                    </div>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {/* User Profile Dropdown  */}
            <Dropdown
              className="user-menu"
              isOpen={showUserMenu}
              toggle={handleUserMenuDropdown}
            >
              <DropdownToggle>
                <div className="profile_img">
                  {user?.profile_image ? (
                    <img
                      className="img-fluid"
                      src={baseURL.remote + user?.profile_image}
                      alt={user?.first_name}
                    />
                  ) : (
                    <Icon icon="entypo:user" />
                  )}
                </div>
                <span className="profile_text">
                  <span>{user?.first_name} {user?.last_name}{" "}</span>
                  <Icon icon="fe:arrow-down" />
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
          open={persist && auth ? false : isLoginModal}
          handleClose={handleLoginModal}
        />
      )}

      {isRegisterModal && (
        <RegisterPopup
          open={persist && auth ? false : isRegisterModal}
          handleClose={handleRegisterModal}
          handleLoginModal={handleLoginModal}
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
