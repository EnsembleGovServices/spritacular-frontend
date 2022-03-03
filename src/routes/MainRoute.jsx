import About from "../pages/About";
import Gallery from "../pages/Gallery";
import GetStarted from "../pages/GetStarted";
import Home from "../pages/Home";
import Resources from "../pages/Resources";
import Blog from "../pages/Blog";
import TutorialsDetail from "../pages/TutorialsDetail";

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
  },
  {
    path: "/tutorials-detail",
    name: "tutorials",
    element: <TutorialsDetail />,
  }, 
];

export default routesList;
