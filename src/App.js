import { Routes, Route } from "react-router-dom";
import "./assets/scss/framework/framework.scss";
import "./assets/scss/styles/style.scss";

import { Suspense, lazy } from 'react';

const PersistLogin = lazy(()=> import('./layouts/PersistLogin'));
const RequireAuth = lazy(()=> import('./layouts/RequireAuth'));
const Home = lazy(()=> import('./pages/Home'));
const About = lazy(()=> import('./pages/About'));
const GetStarted = lazy(()=> import('./pages/GetStarted'));
const Blog = lazy(()=> import('./pages/Blog'));
const Tutorials = lazy(()=> import('./pages/Tutorials'));
const TutorialsDetail = lazy(()=> import('./pages/TutorialsDetail'));

const UploadObservations = lazy(()=> import('./pages/UploadObservations'));
const UploadObservationsForm = lazy(()=> import('./pages/UploadObservationForm'));

const Profile = lazy(()=> import('./pages/Profile'));
const Error = lazy(()=> import('./components/Error'));
const LoginPage = lazy(()=> import('./pages/Auth/LoginPage'));


const App = () => {
  return (
    <Routes>
      <Route element={<Suspense fallback={''}><PersistLogin /></Suspense>}>
        <Route path="/" element={<Suspense fallback={''}><Home /></Suspense>} />
        <Route path="about" element={<Suspense fallback={''}><About /></Suspense>} />
        <Route path="get-started" element={<Suspense fallback={''}><GetStarted /></Suspense>} />
        <Route path="blog" element={<Suspense fallback={''}><Blog /></Suspense>} />
        <Route path="tutorials" element={<Suspense fallback={''}><Tutorials /></Suspense>} />
        <Route path="tutorials-detail" element={<Suspense fallback={''}><TutorialsDetail /></Suspense>} />
        <Route path="observations-form" element={<Suspense fallback={''}><UploadObservationsForm /></Suspense>} />
        <Route path="upload-observations" element={<Suspense fallback={''}><UploadObservations /></Suspense>} />
        <Route path="login" element={<Suspense fallback={''}><LoginPage /></Suspense>} />

        {/*Protected routes*/}
        <Route element={<Suspense fallback={''}><RequireAuth /></Suspense>}>
          <Route path="profile" element={<Suspense fallback={''}><Profile /></Suspense>} />
        </Route>
        {/*</Route>*/}
        <Route path="*" element={<Suspense fallback={''}><Error /></Suspense>} />
      </Route>
    </Routes>
  );
};

export default App;
