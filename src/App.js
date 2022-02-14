import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./sharedComponents/Header";
import Navbar from "./sharedComponents/Navbar";
import Banner from "./sharedComponents/home/Banner";
import Counter from "./sharedComponents/home/Counter";
import Routess from "./Routess";
import "./assets/css/style.scss";
import "./assets/css/common.scss";

function App() {
  return (
    <Router>
      <Navbar />
      <Banner />
      <Counter />
      <div className="App">
        <Routess />
      </div>
    </Router>
  );
}

export default App;
