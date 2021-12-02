import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProperty from "./components/add-property.component";
import Property from "./components/property.component";
import PropertiesList from "./components/properties-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/properties"} className="navbar-brand">
            PROPERT APP
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/properties"} className="nav-link">
                Properties
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add New Property
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/properties"]} component={PropertiesList} />
            <Route exact path="/add" component={AddProperty} />
            <Route path="/properties/:id" component={Property} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
