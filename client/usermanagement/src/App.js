import "./App.css";
import React from "react";
import Navigation from "./Navigation";
import UserManagement from "./UserManagement/UserManagement";
import CarsManagement from "./CarsManagement/CarsManagement";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Slider from "./Slider";

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Route path="/" exact component={Slider} />
        <Route path="/UserManagement" component={UserManagement} />
        <Route path="/CarsManagement" component={CarsManagement} />
      </Router>
    </div>
  );
}

export default App;
