import About from "../pages/About";
import Community from "../pages/Community";
import Gallery from "../pages/Gallery";
import GetStarted from "../pages/GetStarted";
import Home from "../pages/Home";
import Resources from "../pages/Resources";

const routesList = [
    {
        path: '/',
        name: 'home',
        element: <Home/>,
    },
    {
        path: '/about',
        name: 'about us ',
        element: <About/>,
    },
    {
        path: '/',
        name: 'get started',
        element: <GetStarted/>,
    },
    {
        path: '/',
        name: 'gallery',
        element: <Gallery/>,
    },
    {
        path: '/',
        name: 'resources',
        element: <Resources/>,
    },
    {
        path: '/',
        name: 'community',
        element: <Community/>,
    },
]

export default routesList;