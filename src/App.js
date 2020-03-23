import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import pathNames from "./constants/pathNames";

import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import PhoneLogin from "./components/PhoneLogin";
import TeamList from "./components/TeamList";

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     data: []
  //   };
  // }

  // componentDidMount() {
  //   Tabletop.init({
  //     key: "1Bh5AV7LwiiWOlK6G-kVDX8YiWJNEyLrrYU6WEYnb_lg",
  //     callback: googleData => {
  //       this.setState({
  //         data: googleData
  //       });
  //     },
  //     simpleSheet: true
  //   });
  // }

  render() {
    return (
      <AuthProvider>
        <Router>
          <div>
            <PrivateRoute
              exact
              path={pathNames.teamList}
              component={TeamList}
            />
            <Route exact path={pathNames.login} component={PhoneLogin} />
          </div>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
