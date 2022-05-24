import "./assets/scss/framework/framework.scss";
import "./assets/scss/styles/style.scss";


import {lazy, Suspense, useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom";
import {routeUrls} from "./helpers/url";

import useAuth from "./hooks/useAuth";

import PersistLogin from "./layouts/PersistLogin";
import RequireAuth from "./layouts/RequireAuth";
import Error from "./components/Error";
import ResetPasswordPopup from "./components/Popup/ResetPasswordPopup";
import InformativePage from './layouts/InformativePage';
import Loader from "./components/Shared/Loader";
import SystemOnline from "./components/Common/SystemOnline";
import TutorialList from "./pages/BlogTutorial/TutorialList";


const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const GetStarted = lazy(() => import('./pages/GetStarted'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Policy = lazy(() => import('./pages/Policy'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));

//Blog Pages
const BlogList = lazy(() => import('./pages/BlogTutorial/BlogList'));
const BlogArticleDetails = lazy(() => import('./pages/BlogTutorial/Details/BlogArticleDetails'));
const TutorialDetails = lazy(() => import('./pages/BlogTutorial/Details/TutorialDetails'));

// Quiz Page
const QuizHome = lazy(() => import('./pages/Quiz/QuizHome'));


//Protected Pages
const Profile = lazy(() => import('./pages/Profile'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const MyObservations = lazy(() => import('./pages/Observation/MyObservations'));
const AddObservation = lazy(() => import('./pages/Observation/AddObservation'));
const Observations = lazy(() => import('./pages/Observation/Observations'));

//Blog Pages dashboard
const BlogPage = lazy(() => import('./pages/Dashboard/Blog/BlogPage'));
const BlogCreate = lazy(() => import('./pages/Dashboard/Blog/BlogCreate'));
const BlogView = lazy(() => import('./pages/Dashboard/Blog/BlogView'));
const BlogUpdate = lazy(() => import('./pages/Dashboard/Blog/BlogUpdate'));

//Tutorial Page dashboard
const TutorialPage = lazy(() => import('./pages/Dashboard/Tutorial/TutorialPage'));
const TutorialView = lazy(() => import('./pages/Dashboard/Tutorial/TutorialView'));
const TutorialCreate = lazy(() => import('./pages/Dashboard/Tutorial/TutorialCreate'));
const TutorialUpdate = lazy(() => import('./pages/Dashboard/Tutorial/TutorialUpdate'));

const App = () => {
    const [persistValue, setPersistValue] = useState(false);
    const [isOnline, setOnline] = useState(true);
    const authCallBack = (authChange) => {
        setPersistValue(authChange);
    };
    const {auth} = useAuth();

    const Roles = {
        'superuser': auth?.user?.is_superuser,
        'trained': auth?.user?.is_trained,
        'user': auth?.user?.is_user,
    }

    useEffect(() => {
        window.addEventListener('online', () => {
            setOnline(true);
        })
        window.addEventListener('offline', () => {
            setOnline(false);
        })
    }, [isOnline]);

    return (
        <>
            <Routes>
                <Route element={
                    <Suspense fallback={<Loader/>}>
                        <PersistLogin persistValue={persistValue}/>
                    </Suspense>
                }>
                    <Route element={<InformativePage setAuthValue={authCallBack}/>}>
                        <Route exact path={routeUrls.home} element={
                            <Suspense fallback={<Loader/>}>
                                <Home/>
                            </Suspense>
                        }/>
                        <Route exact path={routeUrls.about} element={
                            <Suspense fallback={<Loader/>}>
                                <About/>
                            </Suspense>
                        }/>
                        <Route exact path={routeUrls.getStarted} element={
                            <Suspense fallback={<Loader/>}>
                                <GetStarted/>
                            </Suspense>
                        }/>
                        <Route exact path={routeUrls.gallery} element={
                            <Suspense fallback={<Loader/>}>
                                <Gallery/>
                            </Suspense>
                        }/>
                        <Route exact path={routeUrls.blog} element={
                            <Suspense fallback={<Loader/>}>
                                <BlogList/>
                            </Suspense>
                        }/>

                        <Route exact path={routeUrls.quiz.home} element={
                            <Suspense fallback={<Loader/>}>
                                <QuizHome/>
                            </Suspense>
                        }/>


                        <Route path={routeUrls.blog}>
                            <Route index element={<Suspense fallback={<Loader/>}><BlogList/></Suspense>}/>
                            <Route path={routeUrls.blogDetails}
                                   element={<Suspense fallback={<Loader/>}><BlogArticleDetails/></Suspense>}/>
                        </Route>

                        <Route path={routeUrls.tutorials}>
                            <Route index element={<Suspense fallback={<Loader/>}><TutorialList/></Suspense>}/>
                            <Route path={routeUrls.tutorialsDetail}
                                   element={<Suspense fallback={<Loader/>}><TutorialDetails/></Suspense>}/>
                        </Route>


                        <Route exact path={routeUrls.policy} element={<Policy/>}/>
                        <Route exact path={routeUrls.login} element={
                            <Suspense fallback={<Loader/>}>
                                <LoginPage/>
                            </Suspense>
                        }/>
                    </Route>
                    <Route exact path={"/password_reset"} element={
                        <Suspense fallback={<Loader/>}>
                            <ResetPasswordPopup/>
                        </Suspense>
                    }/>
                    {/*Protected routes*/}
                    <Route element={<RequireAuth allowedRoles={Roles} setAuthValue={authCallBack}/>}>
                        <Route element={
                            <Suspense fallback={<Loader/>}>
                                <Observations/>
                            </Suspense>
                        }>
                            <Route exact path={routeUrls.profile} element={
                                <Suspense fallback={<Loader/>}>
                                    <Profile/>
                                </Suspense>
                            }/>
                            <Route exact path={routeUrls.myObservations} element={
                                <Suspense fallback={<Loader/>}>
                                    <MyObservations/>
                                </Suspense>
                            }/>
                            <Route exact path={routeUrls.observationsAdd} element={
                                <Suspense fallback={<Loader/>}>
                                    <AddObservation/>
                                </Suspense>
                            }/>
                            <Route exact path={routeUrls.observationsUpdate} element={
                                <Suspense fallback={<Loader/>}>
                                    <AddObservation/>
                                </Suspense>
                            }/>

                            <Route exact path={routeUrls.dashboard}>
                                <Route index element={<Suspense fallback={<Loader/>}><Dashboard/></Suspense>}/>

                                {/*Dashboard Blog*/}
                                <Route path={routeUrls.dashBlog.list}>
                                    <Route index element={<BlogPage/>}/>
                                    <Route path={routeUrls.dashBlog.create}
                                           element={<Suspense fallback={<Loader/>}><BlogCreate/></Suspense>}/>
                                    <Route path={routeUrls.dashBlog.view}
                                           element={<Suspense fallback={<Loader/>}><BlogView/></Suspense>}/>
                                    <Route path={routeUrls.dashBlog.edit}
                                           element={<Suspense fallback={<Loader/>}><BlogUpdate/></Suspense>}/>
                                </Route>

                                {/*Dashboard Tutorial*/}
                                <Route path={routeUrls.dashTutorial.list}>
                                    <Route index element={<TutorialPage/>}/>
                                    <Route path={routeUrls.dashTutorial.create}
                                           element={<Suspense fallback={<Loader/>}><TutorialCreate/></Suspense>}/>
                                    <Route path={routeUrls.dashTutorial.view}
                                           element={<Suspense fallback={<Loader/>}><TutorialView/></Suspense>}/>
                                    <Route path={routeUrls.dashTutorial.edit}
                                           element={<Suspense fallback={<Loader/>}><TutorialUpdate/></Suspense>}/>
                                </Route>
                            </Route>

                            <Route exact path={routeUrls.quiz.home}>
                                <Route index
                                       element={<Suspense fallback={<Loader/>}><QuizHome roles={Roles}/></Suspense>}/>
                            </Route>

                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={
                    <Suspense fallback={<Loader/>}>
                        <Error/>
                    </Suspense>
                }/>
            </Routes>
            <SystemOnline status={isOnline}/>
        </>
    );
};

export default App;

