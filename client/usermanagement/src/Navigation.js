import React from "react";
import "./Navigation.css";

function Navigation() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand pagesOnNavigation" href="/UserManagement">
            User Management
          </a>
          <a className="navbar-brand pagesOnNavigation" href="/CarsManagement">
            Cars Management
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
