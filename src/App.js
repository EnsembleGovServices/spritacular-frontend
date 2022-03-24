import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/scss/framework/framework.scss";
import "./assets/scss/styles/style.scss";
import { routeUrls } from "./helpers/url";

import PersistLogin from "./layouts/PersistLogin";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import GetStarted from "./pages/GetStarted";
import Tutorials from "./pages/Tutorials";
import LoginPage from "./pages/Auth/LoginPage";
import RequireAuth from "./layouts/RequireAuth";
import Profile from "./pages/Profile";
import MyObservations from "./pages/Observation/MyObservations";
import Gallery from "./pages/Gallery";
import AddObservation from "./pages/Observation/AddObservation";
import Observations from "./pages/Observation/Observations";
import Error from "./components/Error";
import TutorialsDetail from "./pages/TutorialsDetail";
import InitialUploadObservations from "./pages/InitialUploadObservations";
import ResetPasswordPopup from "./components/Popup/ResetPasswordPopup";
import InformativePage from './layouts/InformativePage';


const App = () => {
  const [persistValue, setPersistValue] = useState(false);
  const authCallBack = (authChange) => {
    setPersistValue(authChange);
  };

  return (
    <Routes>
      <Route element={<PersistLogin persistValue={persistValue} />}>
        <Route element={ <InformativePage setAuthValue={authCallBack} /> }>
          <Route exact path={routeUrls.home} element={<Home />} />
          <Route exact path={routeUrls.about} element={<About />} />
          <Route exact path={routeUrls.getStarted} element={<GetStarted />} />
          <Route exact path={routeUrls.home} element={<Gallery />} />
          <Route exact path={routeUrls.blog} element={<Blog />} />
          <Route exact path={routeUrls.tutorials} element={<Tutorials />} />
          <Route exact path={routeUrls.tutorialsDetail} element={<TutorialsDetail />} />
          <Route exact path={routeUrls.login} element={<LoginPage />} />
        </Route>
        <Route exact path={"/password_reset"} element={<ResetPasswordPopup />} />
        
        {/*Protected routes*/}
        <Route element={<RequireAuth setAuthValue={authCallBack} />}>
          <Route exact path={routeUrls.profile} element={<Profile />} />
          <Route element={<Observations />}>
            <Route exact path={routeUrls.myObservations} element={<MyObservations />} />
            <Route exact path={routeUrls.observationsAdd} element={<AddObservation />} />
            <Route exact path={routeUrls.observationsUpdate} element={<AddObservation />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;

