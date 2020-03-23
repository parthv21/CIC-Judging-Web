import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import pathNames from "./constants/pathNames";

import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import PhoneLogin from "./components/PhoneLogin";
import TeamList from "./components/TeamList";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path={pathNames.teamList} component={TeamList} />
          <Route exact path={pathNames.login} component={PhoneLogin} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
