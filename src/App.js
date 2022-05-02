import "./assets/scss/framework/framework.scss";
import "./assets/scss/styles/style.scss";
import {lazy, Suspense ,useState} from "react";
import { Routes, Route } from "react-router-dom";
import { routeUrls } from "./helpers/url";

import useAuth from "./hooks/useAuth";

import PersistLogin from "./layouts/PersistLogin";
import RequireAuth from "./layouts/RequireAuth";
import Error from "./components/Error";
import ResetPasswordPopup from "./components/Popup/ResetPasswordPopup";
import InformativePage from './layouts/InformativePage';
import Loader from "./components/Shared/Loader";

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const GetStarted = lazy(() => import('./pages/GetStarted'));
const Tutorials = lazy(() => import('./pages/Tutorials'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Policy = lazy(() => import('./pages/Policy'));
const TutorialsDetail = lazy(() => import('./pages/TutorialsDetail'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));


const Profile = lazy(() => import('./pages/Profile'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const MyObservations = lazy(() => import('./pages/Observation/MyObservations'));
const AddObservation = lazy(() => import('./pages/Observation/AddObservation'));
const Observations = lazy(() => import('./pages/Observation/Observations'));


const App = () => {
  const [persistValue, setPersistValue] = useState(false);
  const authCallBack = (authChange) => {
    setPersistValue(authChange);
  };
  const {auth} = useAuth();

  const Roles = {
    'superuser' : auth?.user?.is_superuser,
    'trained' : auth?.user?.is_trained,
    'user' : auth?.user?.is_user,
  }


  return (
    <>
    
    <Routes>
      <Route element={
        <Suspense fallback={<Loader />}>
          <PersistLogin persistValue={persistValue} />
        </Suspense>
      }>
        <Route element={ <InformativePage setAuthValue={authCallBack} /> }>
          <Route exact path={routeUrls.home} element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          } />
          <Route exact path={routeUrls.about} element={
            <Suspense fallback={<Loader />}>
              <About />
            </Suspense>
          } />
          <Route exact path={routeUrls.getStarted} element={
            <Suspense fallback={<Loader />}>
              <GetStarted />
            </Suspense>
          } />
          <Route exact path={routeUrls.gallery} element={
            <Suspense fallback={<Loader />}>
              <Gallery />
            </Suspense>
          } />
          <Route exact path={routeUrls.blog} element={
            <Suspense fallback={<Loader />}>
              <Blog />
            </Suspense>
          } />
          <Route exact path={routeUrls.tutorials} element={
            <Suspense fallback={<Loader />}>
              <Tutorials />
            </Suspense>
          } />
          <Route exact path={routeUrls.policy} element={<Policy />} />
          <Route exact path={routeUrls.tutorialsDetail} element={
            <Suspense fallback={<Loader />}>
              <TutorialsDetail />
            </Suspense>
          } />
          <Route exact path={routeUrls.login} element={
            <Suspense fallback={<Loader />}>
              <LoginPage />
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
          </Route>
          <Route exact path={routeUrls.dashboard} element={
            <Suspense fallback={<Loader />}>
              <Dashboard />
            </Suspense>
          } />
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

