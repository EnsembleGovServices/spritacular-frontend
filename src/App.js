import "./assets/scss/framework/framework.scss";
import "./assets/scss/styles/style.scss";

import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { routeUrls } from "./helpers/url";

import useAuth from "./hooks/useAuth";

import PersistLogin from "./layouts/PersistLogin";
import RequireAuth from "./layouts/RequireAuth";
import Error from "./components/Error";
import ResetPasswordPopup from "./components/Popup/ResetPasswordPopup";
import InformativePage from './layouts/InformativePage';
import Loader from "./components/Shared/Loader";
import TutorialList from "./pages/BlogTutorial/TutorialList";
import HomePage from "./pages/Page/HomePage";
import axios from "axios";

const About = lazy(() => import('./pages/Page/About'));
const GetStarted = lazy(() => import('./pages/Page/GetStarted'));
const Gallery = lazy(() => import('./pages/Page/Gallery'));
const Policy = lazy(() => import('./pages/Page/Policy'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));

const MeetTheTeam = lazy(() => import('./pages/Page/MeetTheTeam'));
const BecomeAnAmbassador = lazy(() => import('./pages/Page/BecomeAnAmbassador'));
const SpritacularGoogleGroup = lazy(() => import('./pages/Page/SpritacularGoogleGroup'));

//Blog Pages
const BlogList = lazy(() => import('./pages/BlogTutorial/BlogList'));
const BlogArticleDetails = lazy(() => import('./pages/BlogTutorial/Details/BlogArticleDetails'));
const TutorialDetails = lazy(() => import('./pages/BlogTutorial/Details/TutorialDetails'));

// Quiz Page
const QuizHome = lazy(() => import('./pages/Quiz/QuizHome'));

//Protected Pages
const Profile = lazy(() => import('./pages/Page/Profile'));
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
    const authCallBack = (authChange) => {
        setPersistValue(authChange);
    };
    const { auth } = useAuth();

    const Roles = {
        superuser: auth?.user?.is_superuser,
        trained: auth?.user?.is_trained,
        user: auth?.user?.is_user,
    }

    return (
        <>
            <Routes>
                <Route element={<PersistLogin persistValue={persistValue} roles={Roles} />}>
                    <Route element={<InformativePage setAuthValue={authCallBack} />}>
                        <Route exact path={routeUrls.home} element={
                            <HomePage />
                        } />
                        <Route exact path={routeUrls.about} element={
                            <Suspense fallback={<div></div>}>
                                <About />
                            </Suspense>
                        } />
                        <Route exact path={routeUrls.getStarted} element={
                            <Suspense fallback={<div></div>}>
                                <GetStarted />
                            </Suspense>
                        } />
                        <Route exact path={routeUrls.gallery} element={
                            <Suspense fallback={<div></div>}>
                                <Gallery />
                            </Suspense>
                        } />
                        <Route exact path={routeUrls.blog} element={
                            <Suspense fallback={<div></div>}>
                                <BlogList />
                            </Suspense>
                        } />

                        <Route exact path={routeUrls.quiz.home} element={
                            <Suspense fallback={<div></div>}>
                                <QuizHome />
                            </Suspense>
                        } />


                        <Route path={routeUrls.blog}>
                            <Route index element={<Suspense fallback={''}><BlogList /></Suspense>} />
                            <Route path={routeUrls.blogDetails}
                                element={<Suspense fallback={''}><BlogArticleDetails /></Suspense>} />
                        </Route>

                        <Route path={routeUrls.tutorials}>
                            <Route index element={<Suspense fallback={''}><TutorialList /></Suspense>} />
                            <Route path={routeUrls.tutorialsDetail}
                                element={<Suspense fallback={''}><TutorialDetails /></Suspense>} />
                        </Route>

                        <Route exact path={routeUrls.policy} element={<Suspense fallback=""><Policy /></Suspense>} />
                        <Route exact path={routeUrls.login} element={
                            <Suspense fallback={<Loader />}>
                                <LoginPage />
                            </Suspense>
                        } />

                        <Route exact path={routeUrls.pages.meetTheTeam} element={
                            <Suspense fallback={<Loader />}>
                                <MeetTheTeam />
                            </Suspense>
                        } />
                        <Route exact path={routeUrls.pages.becomeAnAmbasador} element={
                            <Suspense fallback={<Loader />}>
                                <BecomeAnAmbassador />
                            </Suspense>
                        } />
                        <Route exact path={routeUrls.pages.spritacularGoogleGroup} element={
                            <Suspense fallback={<Loader />}>
                                <SpritacularGoogleGroup />
                            </Suspense>
                        } />
                    </Route>

                    <Route exact path={"/password_reset"} element={
                        <Suspense fallback={<Loader />}>
                            <ResetPasswordPopup />
                        </Suspense>
                    } />
                    {/*Protected routes*/}
                    <Route element={<RequireAuth allowedRoles={Roles} setAuthValue={authCallBack} />}>
                        <Route element={
                            <Suspense fallback={<Loader />}>
                                <Observations />
                            </Suspense>
                        }>
                            <Route exact path={routeUrls.profile} element={
                                <Suspense fallback={<Loader />}>
                                    <Profile />
                                </Suspense>
                            } />
                            <Route exact path={routeUrls.myObservations} element={
                                <Suspense fallback={<Loader />}>
                                    <MyObservations />
                                </Suspense>
                            } />
                            <Route exact path={routeUrls.observationsAdd} element={
                                <Suspense fallback={<Loader />}>
                                    <AddObservation />
                                </Suspense>
                            } />
                            <Route exact path={routeUrls.observationsUpdate} element={
                                <Suspense fallback={<Loader />}>
                                    <AddObservation />
                                </Suspense>
                            } />

                            <Route exact path={routeUrls.dashboard}>
                                <Route index element={<Suspense fallback={<Loader />}><Dashboard /></Suspense>} />

                                {/*Dashboard Blog*/}
                                <Route path={routeUrls.dashBlog.list}>
                                    <Route index element={<BlogPage />} />
                                    <Route path={routeUrls.dashBlog.create}
                                        element={<Suspense fallback={<Loader />}><BlogCreate /></Suspense>} />
                                    <Route path={routeUrls.dashBlog.view}
                                        element={<Suspense fallback={<Loader />}><BlogView /></Suspense>} />
                                    <Route path={routeUrls.dashBlog.edit}
                                        element={<Suspense fallback={<Loader />}><BlogUpdate /></Suspense>} />
                                </Route>

                                {/*Dashboard Tutorial*/}
                                <Route path={routeUrls.dashTutorial.list}>
                                    <Route index element={<TutorialPage />} />
                                    <Route path={routeUrls.dashTutorial.create}
                                        element={<Suspense fallback={<Loader />}><TutorialCreate /></Suspense>} />
                                    <Route path={routeUrls.dashTutorial.view}
                                        element={<Suspense fallback={<Loader />}><TutorialView /></Suspense>} />
                                    <Route path={routeUrls.dashTutorial.edit}
                                        element={<Suspense fallback={<Loader />}><TutorialUpdate /></Suspense>} />
                                </Route>
                            </Route>

                            <Route exact path={routeUrls.quiz.home}>
                                <Route index
                                    element={<Suspense fallback={<Loader />}><QuizHome roles={Roles} /></Suspense>} />
                            </Route>

                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={
                    <Suspense fallback={<Loader />}>
                        <Error />
                    </Suspense>
                } />
            </Routes>
        </>
    );
};

export default App;

