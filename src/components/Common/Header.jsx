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
import "../../assets/scss/component/header.scss";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoginPopup from "../Popup/LoginPopup";
import RegisterPopup from "../Popup/RegisterPopup";
import ChangePasswordPopup from "../Popup/ChangePasswordPopup";
import UserProfilePopup from "../Popup/UserProfilePopup";
import { Icon } from "@iconify/react";
import LazyLoad from "../Upload/LazyLoad";
import { routeUrls } from '../../helpers/url';
import Images from "../../static/images";
import Notification from "../Notification/Notification";



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
  
  const [active, setActive] = useState('');
  const location = useLocation();
  const homeUrl = location.pathname === '/';
  const navigate = useNavigate();
  const Logout = () => {
    setAuth("");
    setPersist(false);
    navigate('/');
    localStorage.removeItem("persist");
    localStorage.removeItem("refresh");
    sessionStorage.removeItem("camera");
    setIsRegisterModal(false);
    setIsLoginModal(false);
    setShowUserProfilePopup(true);
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

  useEffect(()=> {
    if(window.location.href.split('/')[window.location.href.split('/').length-1] === routeUrls.dashboard)
    setActive('dashboard');
  },[window.location.href])


  const handleLoginModal = () => {
    setIsLoginModal(!isLoginModal);
    setIsRegisterModal(false);
  };

  const handleRegisterModal = () => {
    setIsRegisterModal(!isRegisterModal);
  };
  const menuToggle = () => {
    let getBody = document.querySelector('body');
    getBody.classList.toggle("menu-open");
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
        <Link to={routeUrls.home} className="navbar-brand p-0" title="Spritacular" onClick={() => setActive('')}>
          <img src={Images.Logo} alt="Logo" className="logo" />
          <img src={Images.BlackLogo} alt="Logo" className="on-scroll-logo" />
        </Link>
        <NavbarToggler onClick={() => menuToggle()}>
          <Icon icon="eva:menu-outline" />
        </NavbarToggler>
        <Collapse navbar isOpen={showMenu}>
          <div className="menu-logo  justify-content-between w-100 px-2 py-1 shadow-sm">
            <Link to={routeUrls.home} className="navbar-brand"  onClick={() => setActive('')}>
              <img src={Images.BlackLogo} alt="Logo" />
            </Link>
            <Button className="close-menu" onClick={() => menuClose()}>
              <Icon icon="ci:close-big" color="#000" width="25" height="25" />
            </Button>
          </div>

          <Nav navbar>
            <>
              {persist && !user?.is_superuser ? (
                <NavItem>
                  <Link
                    to={routeUrls.myObservations}
                    title="My Observations"
                    className={active === 'observations' ? "nav-link text-capitalize active": 'nav-link text-capitalize'}
                    onClick={() => setActive('observations')}
                  >
                    My Observations
                  </Link>
                </NavItem>
              ) : '' }
              {persist && user?.is_superuser ? (
                <NavItem>
                  <Link
                    to={routeUrls.dashboard}
                    title="Dashboard"
                    className={active === 'dashboard' ? "nav-link text-capitalize active": 'nav-link text-capitalize'}
                    onClick={() => setActive('dashboard')}
                  >
                    Dashboard
                  </Link>
                </NavItem>
              ) : '' }
            </>
            <NavItem  >
              <Dropdown
                className="user-menu custom-relative-dropdown"
                isOpen={aboutDropdown}
                toggle={ () => setAboutDropdown(!aboutDropdown)}
              >
                <DropdownToggle>
                  About <Icon icon="fe:arrow-down" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className={active === 'about-1' ? 'active' : ''}>
                    <Link to={routeUrls.about}  title="What is Spritacular?" onClick={() => setActive('about-1')} >
                      What is Spritacular?
                    </Link>
                  </DropdownItem>
                  <DropdownItem className={active === 'about-2' ? 'active' : ''}>
                    <Link to={routeUrls.home} title="Policy" onClick={() => setActive('about-2')}>
                      Policy
                    </Link>
                  </DropdownItem>
                  <DropdownItem className={active === 'about-3' ? 'active' : ''}>
                    <Link to={routeUrls.home} title="Code of Conduct" onClick={() => setActive('about-3')}>
                      Code of Conduct
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
            <NavItem>
              <Link
                to={routeUrls.getStarted}
                title="Get Started"
                className={active === 'started' ? "nav-link text-capitalize active": 'nav-link text-capitalize'}
                onClick={() => setActive('started')}
              >
                Get Started
              </Link>
            </NavItem>
            <NavItem>
              <Link to={routeUrls.gallery} title="Gallery" className={active === 'gallery' ? "nav-link text-capitalize active": 'nav-link text-capitalize'} onClick={() => setActive('gallery')}>
                Gallery
              </Link>
            </NavItem>
            <NavItem>
              <Dropdown
                className="user-menu custom-relative-dropdown"
                isOpen={resourcesDropdown}
                toggle={ () => setResourcesDropdown(!resourcesDropdown)}
              >
                <DropdownToggle>
                  Resources <Icon icon="fe:arrow-down" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className={active == 'resources-1' ? 'active' : ''}>
                    <Link to={routeUrls.blog} title="Blog" onClick={() => setActive('resources-1')}>
                      Blog
                    </Link>
                  </DropdownItem>
                  <DropdownItem className={active == 'resources-2' ? 'active' : ''}>
                    <Link to={routeUrls.tutorials} title="Tutorials" onClick={() => setActive('resources-2')}>
                      Tutorials
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
            <NavItem>
              <Dropdown
                className="user-menu custom-relative-dropdown"
                isOpen={communityDropdown}
                toggle={ () => setCommunityDropdown(!communityDropdown)}
              >
                <DropdownToggle>
                  Community <Icon icon="fe:arrow-down" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className={active == 'community-1' ? 'active' : ''}>
                    <Link to={routeUrls.home} title="Meet the Teem" onClick={() => setActive('community-1')}>
                      Meet the Teem
                    </Link>
                  </DropdownItem>
                  <DropdownItem className={active == 'community-2' ? 'active' : ''}>
                    <Link to={routeUrls.home} title="Volunteer Profile" onClick={() => setActive('community-2')}>
                      Volunteer Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem className={active == 'community-3' ? 'active' : ''}>
                    <Link to={routeUrls.home} title="Become an ambassador" onClick={() => setActive('community-3')}>
                      Become an ambassador
                    </Link>
                  </DropdownItem>
                  <DropdownItem className={active == 'community-4' ? 'active' : ''}>
                    <Link to={routeUrls.home} title="Join Spritacular Google Group" onClick={() => setActive('community-4')}>
                      Join Spritacular Google Group
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
            {!persist ? (
              <>
              <NavItem className="open-modal-btn">
                <Button
                  className="register nav-link"
                  onClick={() => handleRegisterModal()}
                >
                  Register
                </Button>
              </NavItem>
              <NavItem className="open-modal-btn">
                <Button
                  className="nav-link login-btn"
                  onClick={() => handleLoginModal()}
                >
                  Login
                </Button>
              </NavItem>
              </>
            ): ('')}
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
        ) : 
          <>
          <div className="after-login-right-menu">
          <Notification />
          <Dropdown
          className="user-menu"
          isOpen={showUserMenu}
          toggle={handleUserMenuDropdown}
        >
          <DropdownToggle >
            <div className="profile_img">
              {user?.profile_image ? (
                  <LazyLoad
                      src={user?.profile_image}
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
            <DropdownItem onClick={() => setActive('')}>
              <Link to={routeUrls.profile}>Edit Profile</Link>
            </DropdownItem>
            <DropdownItem onClick={() => {handleChangePasswordModal();}}>
              Change Password
            </DropdownItem>
            <DropdownItem onClick={() => {Logout();setActive('')}}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </div>
        </>
        }
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
          modalClass="registerModal"
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
