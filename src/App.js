import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routess from "./Routess";
import Navbar from "./sharedComponents/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routess />
      </div>
    </Router>
  );
}

export default App;
