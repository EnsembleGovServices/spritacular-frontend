import { Routes, Route } from "react-router-dom";
import "./assets/scss/framework/framework.scss";
import "./assets/scss/styles/style.scss";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Layout from "./Layouts/Layout";
import Home from "./pages/Home";
import PersistLogin from "./Layouts/PersistLogin";
import RequireAuth from "./Layouts/RequireAuth";
import ProfileSetting from "./pages/ProfileSetting";
import Master from "./Layouts/Master";

const App = () => {
    return(
        <Routes>
            <Route element={<Layout />}>
                <Route element={<Master />}>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<Error />} />

                    {/*Protected routes*/}
                    <Route element={<PersistLogin />}>
                        <Route element={<RequireAuth />}>
                            <Route path="/profile" element={<ProfileSetting />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<Error />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App;
