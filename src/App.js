import { Routes, Route } from "react-router-dom";
import "./assets/scss/framework/framework.scss";
import "./assets/scss/styles/style.scss";
import routesList from "./routes/MainRoute";
import Master from "./Layouts/Master";
import Error from "./pages/Error";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthProvider";
import ProfileSetting from "./pages/ProfileSetting";
import Login from "./pages/Login";

const App = () => {
  const { setAuth } = useContext(AuthContext);
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(setAuth);
  }, [user, setAuth]);

    return(
        <Routes>
            <Route element={<Master />}>
                {routesList.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element}/>
                ))}
                <Route path={'profile'} element={<ProfileSetting />}/>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}

export default App;
