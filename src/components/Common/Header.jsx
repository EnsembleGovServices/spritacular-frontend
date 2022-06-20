import "../../assets/scss/component/header.scss";
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
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";
import {cdn, routeUrls} from '../../helpers/url';
import {baseURL} from "../../helpers/url";
import axios from "../../api/axios";

import {Icon} from "@iconify/react";
import LazyLoad from "../Upload/LazyLoad";

import useAuth from "../../hooks/useAuth";
import LoginPopup from "../Popup/LoginPopup";
import RegisterPopup from "../Popup/RegisterPopup";
import ChangePasswordPopup from "../Popup/ChangePasswordPopup";
import UserProfilePopup from "../Popup/UserProfilePopup";
import NotificationComponent from "../Notification/NotificationComponent";

const Header = (props) => {
    const {auth, setAuth, persist, setPersist} = useAuth();
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
    const [notificationArray, setNotificationArray] = useState([]);
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

    useEffect(() => {
        if (window.location.href.split('/')[window.location.href.split('/').length - 1] === routeUrls.dashboard)
            setActive('dashboard');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.href])


    useEffect(() => {
        if (auth?.user && auth?.token?.access) {
            axios.get(baseURL.api + '/notification/user_notification/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.token?.access}`
                }
            })
                .then((response) => {
                    setNotificationArray(response.data.results.data);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth])


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

    let admin = auth?.user?.is_superuser,
        trainee = auth?.user?.is_trained,
        normalUser = auth?.user?.is_user;

    return (
        <>
            <Navbar
                container
                expand="md"
                className={homeUrl ? "custom-header" : "custom-header bg-not-home"}
                light
            >
                <Link to={routeUrls.home} className="navbar-brand p-0 position-relative" title="Spritacular"
                      onClick={() => setActive('')}>
                    <img src={`${cdn.url}/logo.png`} alt="Spritacular" className="logo"/>
                    <img src={`${cdn.url}/black-logo.png`} alt="Spritacular" className="on-scroll-logo"/>
                    {process.env.NODE_ENV === "development" &&
                        <div className="showUserTag">
                            {admin &&
                                <span>{admin ? "Admin" : ""}</span>
                            }
                            {trainee &&
                                <span>{trainee ? "Trainee" : ""}</span>
                            }
                            {normalUser &&
                                <span>{normalUser ? "User" : ""}</span>
                            }
                        </div>
                    }
                </Link>
                <NavbarToggler onClick={() => menuToggle()}>
                    <Icon icon="eva:menu-outline"/>
                </NavbarToggler>
                <Collapse navbar isOpen={showMenu}>
                    <div className="menu-logo  justify-content-between w-100 px-2 py-1 shadow-sm">
                        <Link to={routeUrls.home} className="navbar-brand" onClick={() => setActive('')}>
                            <img src={`${cdn.url}/black-logo.png`} alt="Spritacular"/>
                        </Link>
                        <Button className="close-menu" onClick={() => menuClose()}>
                            <Icon icon="ci:close-big" color="#000" width="25" height="25"/>
                        </Button>
                    </div>

                    <Nav navbar>
                        <>
                            {persist && !user?.is_superuser ? (
                                <NavItem>
                                    <Link
                                        to={routeUrls.myObservations}
                                        title="My Observations"
                                        className={active === 'observations' ? "nav-link text-capitalize active" : 'nav-link text-capitalize'}
                                        onClick={() => setActive('observations')}
                                    >
                                        My Observations
                                    </Link>
                                </NavItem>
                            ) : ''}
                            {persist && admin ? (
                                <NavItem>
                                    <Link
                                        to={routeUrls.dashboard}
                                        title="Dashboard"
                                        className={active === 'dashboard' ? "nav-link text-capitalize active" : 'nav-link text-capitalize'}
                                        onClick={() => setActive('dashboard')}
                                    >
                                        Dashboard
                                    </Link>
                                </NavItem>
                            ) : ''}
                        </>
                        <NavItem>
                            <Dropdown
                                className="user-menu custom-relative-dropdown"
                                isOpen={aboutDropdown}
                                toggle={() => setAboutDropdown(!aboutDropdown)}
                            >
                                <DropdownToggle>
                                    About <Icon icon="fe:arrow-down"/>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem className={active === 'about-1' ? 'active p-0' : 'p-0'}>
                                        <Link className="px-3 py-1" to={routeUrls.about} title="What is Spritacular?"
                                              onClick={() => setActive('about-1')}>
                                            What is Spritacular?
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem className={active === 'about-2' ? 'active p-0' : 'p-0'}>
                                        <Link className="px-3 py-1" to={routeUrls.policy} title="Policy"
                                              onClick={() => setActive('about-2')}>
                                            Policy
                                        </Link>
                                    </DropdownItem>
                                    {/*<DropdownItem className={active === 'about-3' ? 'active p-0' : 'p-0'}>*/}
                                    {/*    <Link to={routeUrls.policy + '?code=true'} title="Code of Conduct"*/}
                                    {/*          onClick={() => setActive('about-3')}>*/}
                                    {/*        Code of Conduct*/}
                                    {/*    </Link>*/}
                                    {/*</DropdownItem>*/}
                                </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                        <NavItem>
                            <Link
                                to={routeUrls.getStarted}
                                title="Get Started"
                                className={active === 'started' ? "nav-link text-capitalize active" : 'nav-link text-capitalize'}
                                onClick={() => setActive('started')}
                            >
                                Get Started
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to={routeUrls.gallery} title="Gallery"
                                  className={active === 'gallery' ? "nav-link text-capitalize active" : 'nav-link text-capitalize'}
                                  onClick={() => setActive('gallery')}>
                                Gallery
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Dropdown
                                className="user-menu custom-relative-dropdown"
                                isOpen={resourcesDropdown}
                                toggle={() => setResourcesDropdown(!resourcesDropdown)}
                            >
                                <DropdownToggle>
                                    Resources <Icon icon="fe:arrow-down"/>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem className={active === 'resources-1' ? 'active p-0' : 'p-0'}>
                                        <Link className="px-3 py-1" to={routeUrls.blog} title="Blog"
                                              onClick={() => setActive('resources-1')}>
                                            Blog
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem className={active === 'resources-2' ? 'active p-0' : 'p-0'}>
                                        <Link className="px-3 py-1" to={routeUrls.tutorials} title="Tutorials"
                                              onClick={() => setActive('resources-2')}>
                                            Tutorials
                                        </Link>
                                    </DropdownItem>
                                    {auth && auth?.user?.id &&
                                        <DropdownItem className={active === 'resources-3' ? 'active p-0' : 'p-0'}>
                                            <Link className="px-3 py-1" to={routeUrls.quiz.home} title="Quiz"
                                                  onClick={() => setActive('resources-3')}>
                                                Start Quiz
                                            </Link>
                                        </DropdownItem>
                                    }
                                </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                        <NavItem>
                            <Dropdown
                                className="user-menu custom-relative-dropdown"
                                isOpen={communityDropdown}
                                toggle={() => setCommunityDropdown(!communityDropdown)}
                            >
                                <DropdownToggle>
                                    Community <Icon icon="fe:arrow-down"/>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem className={active === 'community-1' ? 'active p-0' : 'p-0'}>
                                        <Link className="px-3 py-1" to={routeUrls.pages.meetTheTeam}
                                              title="Meet the Team"
                                              onClick={() => setActive('community-1')}>
                                            Meet the Team
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem className={active === 'community-2' ? 'active p-0' : 'p-0'}>
                                        <Link className="px-3 py-1" to={routeUrls.pages.becomeAnAmbasador}
                                              title="Become an ambassador"
                                              onClick={() => setActive('community-2')}>
                                            Become an ambassador
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem className={active === 'community-3' ? 'active p-0' : 'p-0'}>
                                        <Link className="px-3 py-1" to={routeUrls.pages.spritacularGoogleGroup}
                                              title="Spritacular Google Group"
                                              onClick={() => setActive('community-3')}>
                                            Spritacular Google Group
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
                        ) : ('')}
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
                        {/* NotificationComponent Dropdown  */}
                        <NotificationComponent notificationArray={notificationArray}
                                               setNotificationArray={setNotificationArray}/>
                        {/* User Profile Dropdown  */}
                        <Dropdown
                            className="user-menu"
                            isOpen={showUserMenu}
                            toggle={handleUserMenuDropdown}
                        >
                            <DropdownToggle>
                                <div className="profile_img">
                                    {user?.profile_image ? (
                                        <LazyLoad
                                            src={user?.profile_image}
                                            alt={user?.first_name}
                                        />
                                    ) : (
                                        <Icon icon="entypo:user"/>
                                    )}
                                </div>
                                <span className="profile_text">
                                    <span>{user?.first_name} {user?.last_name}{" "}</span>
                                    <Icon icon="fe:arrow-down"/>
                                </span>
                            </DropdownToggle>
                            <DropdownMenu container="body">
                                <DropdownItem className="p-0">
                                    <Link className="px-3 py-1" to={routeUrls.myObservations}>My Observation</Link>
                                </DropdownItem>
                                {admin &&
                                    <>
                                        <DropdownItem className="p-0">
                                            <Link
                                                className="px-3 py-1"
                                                to={`${routeUrls.dashboard}/${routeUrls.dashBlog.list}`}>
                                                Manage Articles
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem className="p-0">
                                            <Link
                                                className="px-3 py-1"
                                                to={`${routeUrls.dashboard}/${routeUrls.dashTutorial.list}`}>
                                                Manage Tutorials
                                            </Link>
                                        </DropdownItem>
                                    </>
                                }
                                <DropdownItem className="p-0" onClick={() => setActive('')}>
                                    <Link className="px-3 py-1" to={routeUrls.profile}>Edit Profile</Link>
                                </DropdownItem>
                                <DropdownItem className="p-0" onClick={() => {
                                    handleChangePasswordModal();
                                }}>
                                    <p className="px-3 py-1 m-0">
                                        Change Password
                                    </p>
                                </DropdownItem>
                                <DropdownItem className="p-0" onClick={() => {
                                    Logout();
                                    setActive('')
                                }}><p className="px-3 py-1 m-0">Logout</p></DropdownItem>
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
