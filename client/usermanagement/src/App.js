import "./App.css";
import React from "react";
import Navigation from "./Navigation";
import UserManagement from "./UserManagement/UserManagement";
import CarsManagement from "./CarsManagement/CarsManagement";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Slider from "./Slider";

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Route path="/UserManagement" component={UserManagement} />
        <Route path="/CarsManagement" component={CarsManagement} />
        <Route path="/" exact component={Slider} />
      </Router>
    </div>
  );
}

export default App;
