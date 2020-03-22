import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Tabletop from "tabletop";

import PhoneLogin from "./components/PhoneLogin";

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
    return <PhoneLogin />;
  }
}

export default App;
