import { Routes, Route } from "react-router-dom";
import "./assets/scss/framework/framework.scss";
import "./assets/scss/styles/style.scss";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PersistLogin from "./Layouts/PersistLogin";
import RequireAuth from "./Layouts/RequireAuth";
import ProfileSetting from "./pages/ProfileSetting";
import About from "./pages/About";
import GetStarted from "./pages/GetStarted";
import Blog from "./pages/Blog";
import TutorialsDetail from "./pages/TutorialsDetail";

const App = () => {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="get-started" element={<GetStarted />} />
        <Route path="blog" element={<Blog />} />
        <Route path="tutorials-detail" element={<TutorialsDetail />} />
        <Route path="login" element={<Login />} />

        {/*Protected routes*/}
        <Route element={<RequireAuth />}>
          <Route path="profile" element={<ProfileSetting />} />
        </Route>
        {/*</Route>*/}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default App;
