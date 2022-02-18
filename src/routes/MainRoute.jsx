import About from "../pages/About";
import Community from "../pages/Community";
import Gallery from "../pages/Gallery";
import GetStarted from "../pages/GetStarted";
import Home from "../pages/Home";
import Resources from "../pages/Resources";
import Tutorials from "../pages/Tutorials";
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
    path: "/",
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
    path: "/",
    name: "community",
    element: <Community />,
  },
  {
    path: "/tutorials",
    name: "tutorials",
    element: <Tutorials />,
  },
  {
    path: "/tutorials-detail",
    name: "tutorialsdetail",
    element: <TutorialsDetail />,
  },
];

export default routesList;
