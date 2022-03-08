import { Routes, Route } from "react-router-dom";
import "./assets/scss/framework/framework.scss";
import "./assets/scss/styles/style.scss";
// import { Suspense, lazy } from 'react';

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
import AddObservation from "./pages/Observation/AddObservation";
import Observations from "./pages/Observation/Observations";
import Error from "./components/Error";
import TutorialsDetail from "./pages/TutorialsDetail";
import InitialUploadObservations from "./pages/InitialUploadObservations";
import ResetPasswordPopup from "./components/Popup/ResetPasswordPopup";

const App = () => {

  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path={""} element={<Home />} />
        <Route path={"about"} element={<About />} />
        <Route path={"get-started"} element={<GetStarted />} />
        <Route path={"blog"} element={<Blog />} />
        <Route path={"tutorials"} element={<Tutorials />} />
        <Route path={"tutorials-detail"} element={<TutorialsDetail />} />
        <Route path={"login"} element={<LoginPage />} />
        <Route exact path={"/password_reset"} element={<ResetPasswordPopup />} />
        
        {/*Protected routes*/}
        <Route element={<RequireAuth/>}>
          <Route path={"profile"} element={<Profile />} />
          <Route element={<Observations />}>
          <Route path={"profile"} element={<Profile />} />
            <Route path={"my-observations"} element={<MyObservations />} />
            <Route path={"observations/add"} element={<AddObservation />} />
            <Route path={"upload-observations"} element={<InitialUploadObservations />} />
          </Route>
        </Route>
        {/*</Route>*/}

        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default App;

