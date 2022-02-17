import {Routes, Route} from "react-router-dom";
import "./assets/scss/framework/framework.scss";
import "./assets/scss/styles/style.scss";
import routesList from "./routes/MainRoute";
import Master from "./Layouts/Master";
import Error from "./pages/Error";
import {useContext, useEffect, useState} from "react";
import AuthContext from "./context/AuthProvider";

const App = () => {
    const { setAuth } = useContext(AuthContext);
    const [user, setUser] = useState();
    // console.group('BASE URLs for the APP');
    //     console.log('API '+ process.env.REACT_APP_API_URL);
    //     console.log('TOKEN '+ process.env.REACT_APP_API_TOKEN_URL);
    //     console.log('REGISTER '+ process.env.REACT_APP_API_REGISTER_URL);
    //     console.log('BASE '+ process.env.REACT_APP_BASE_URL);
    // console.groupEnd();

    useEffect(() => {
        setUser(setAuth);
    }, [user, setAuth])

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