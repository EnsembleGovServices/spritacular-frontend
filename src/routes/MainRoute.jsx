import About from "../pages/About";
import Gallery from "../pages/Gallery";
import GetStarted from "../pages/GetStarted";
import Home from "../pages/Home";
import Resources from "../pages/Resources";
import Blog from "../pages/Blog";
<<<<<<< HEAD
import CameraSettings from "../pages/CameraSettings";
import Login from "../pages/Login";
=======
>>>>>>> b79d271625b1fd0669c6d7b34758c63d39afcb6e

const routesList = [
  {
    path: "/",
    name: "home",
    element: <Home />,
  },
  {
    path: "/about",
    name: "about us ",
    element: <About />,
  },
  {
    path: "/get-started",
    name: "get started",
    element: <GetStarted />,
  },
  {
    path: "/",
    name: "gallery",
    element: <Gallery />,
  },
  {
    path: "/",
    name: "resources",
    element: <Resources />,
  },
  {
    path: "/blog",
    name: "blog",
    element: <Blog />,
  }
];

export default routesList;
