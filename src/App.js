import "./assets/scss/framework/framework.scss";
import "./assets/scss/styles/style.scss";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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
import ResetPasswordPopup from "./components/Popup/ResetPasswordPopup";
import InformativePage from './layouts/InformativePage';
import Dashboard from "./pages/Dashboard";
import useAuth from "./hooks/useAuth";
import Notification from "./Notification";
import {getTokens,onMessageListener} from './firebase';
import { Toast, Button } from "bootstrap";

function App() {

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  
  
  useEffect(() =>{
    getTokens();
    if(isTokenFound === false){
    }
    setTokenFound(true);
  },[isTokenFound])

  onMessageListener().then(payload => {
    setShow(true);
    setNotification({title: payload.notification.title, body: payload.notification.body})
    console.log(payload);
  }).catch(err => console.log('failed: ', err));

  return (
    <div className="App">
        {/* <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
          position: 'absolute',
          top: 20,
          right: 20,
          minWidth: 200
        }}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">{notification.title}</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{notification.body}</Toast.Body>
        </Toast> */}
      <header className="App-header">
        {/* {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>} */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <button onClick={() => setShow(true)}>Show Toast</button>
      </header>


    </div>
  );
}
// const App = () => {
//   const [persistValue, setPersistValue] = useState(false);
//   const authCallBack = (authChange) => {
//     setPersistValue(authChange);
//   };
//   const {auth} = useAuth();

//   const Roles = {
//     'superuser' : auth?.user?.is_superuser,
//     'trained' : auth?.user?.is_trained,
//     'user' : auth?.user?.is_user,
//   }


//   return (
//     <>
    
//     <Routes>
//       <Route element={<PersistLogin persistValue={persistValue} />}>
//         <Route element={ <InformativePage setAuthValue={authCallBack} /> }>
//           <Route exact path={routeUrls.home} element={<Home /> } />
//           <Notification />
//           <Route exact path={routeUrls.about} element={<About />} />
//           <Route exact path={routeUrls.getStarted} element={<GetStarted />} />
//           <Route exact path={routeUrls.gallery} element={<Gallery />} />
//           <Route exact path={routeUrls.blog} element={<Blog />} />
//           <Route exact path={routeUrls.tutorials} element={<Tutorials />} />
//           <Route exact path={routeUrls.tutorialsDetail} element={<TutorialsDetail />} />
//           <Route exact path={routeUrls.login} element={<LoginPage />} />
//         </Route>
//         <Route exact path={"/password_reset"} element={<ResetPasswordPopup />} />
        
//         {/*Protected routes*/}
//         <Route element={<RequireAuth allowedRoles={Roles} setAuthValue={authCallBack} />}>
//           <Route element={<Observations />}>
//           <Route exact path={routeUrls.profile} element={<Profile />} />
//             <Route exact path={routeUrls.myObservations} element={<MyObservations />} />
//             <Route exact path={routeUrls.observationsAdd} element={<AddObservation />} />
//             <Route exact path={routeUrls.observationsUpdate} element={<AddObservation />} />
//           </Route>
//           <Route exact path={routeUrls.dashboard} element={<Dashboard />} />
//         </Route>
//       </Route>
//       <Route path="*" element={<Error />} />
//     </Routes>
//     </>
//   );
// };

export default App;

