import { Routes, Route } from "react-router-dom";
import "./assets/scss/framework/framework.scss";
import "./assets/scss/styles/style.scss";
import routesList from "./routes/MainRoute";
import Master from "./Layouts/Master";
import Error from "./pages/Error";


const App = () => {
    return(
        <Routes>
            <Route element={<Master />}>
                {routesList.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element}/>
                ))}
            </Route>
            <Route path="*" element={<Error />} />
        </Routes>
    )
}

export default App;