import React, { Component } from "react";
import "firebase/database";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import fireApp from "../base";
import dbKeys from "../constants/realtimeDbKeys";
import { validatePhoneNumber } from "../utils/validators";

import "../styles/PhoneLogin.css";

class PhoneLogin extends Component {
  constructor() {
    super();
    this.state = {
      phoneNumber: "",
      otp: "",
      showOtp: false
    };
    this.updatePhoneNumber = this.updatePhoneNumber.bind(this);
    this.updateOtpField = this.updateOtpField.bind(this);
    this.hideOtpField = this.hideOtpField.bind(this);
    this.submitPhoneNumber = this.submitPhoneNumber.bind(this);
    this.submitOtp = this.submitOtp.bind(this);
  }

  render() {
    const { phoneNumber, otp, showOtp } = this.state;
    return (
      <div className="phone-login">
        <img
          src="assets/logo-icon.png"
          alt="cic-logo"
          className="cic-logo-icon"
        />

        <img src="assets/logo-gt.png" alt="cic-logo" className="cic-logo-img" />
        <div className="separator"></div>
        <span className="login-instruction-text">
          Login with your phone number
        </span>
        {!showOtp ? (
          <div className="login-input-container">
            <input
              className="phone-number-field"
              type="text"
              placeholder="Please enter your phone number..."
              value={phoneNumber}
              onChange={event => this.updatePhoneNumber(event)}
            />
            <button className="login-buttons" onClick={this.submitPhoneNumber}>
              Submit
            </button>
          </div>
        ) : (
          <div className="login-input-container">
            <div className="otp-row-container">
              <FontAwesomeIcon
                icon={faArrowLeft}
                onClick={this.hideOtpField}
                className="hide-otp-button"
              />
              <input
                className="otp-field"
                type="text"
                placeholder="Please enter your OTP..."
                value={otp}
                onChange={event => this.updateOtpField(event)}
              />
            </div>
            <button className="login-buttons" onClick={() => this.submitOtp()}>
              Login
            </button>
          </div>
        )}
      </div>
    );
  }

  updatePhoneNumber = event => {
    this.setState({ phoneNumber: event.target.value });
  };

  updateOtpField = event => {
    this.setState({ otp: event.target.value });
  };

  submitPhoneNumber = () => {
    const phoneNumber = this.state.phoneNumber;
    const isValidPhoneNumber = validatePhoneNumber(phoneNumber);
    if (!isValidPhoneNumber) {
      alert("Please enter a valid phone number.");
    } else {
      const truncatedPhoneNumber = phoneNumber.slice(phoneNumber.length - 10);
      fireApp
        .database()
        .ref(dbKeys.judges)
        .child(truncatedPhoneNumber)
        .once("value", snapshot => {
          if (snapshot.exists()) {
            this.setState(
              { showOtp: true },
              console.log("Will submit phone number")
            );
          } else {
            alert("Please get yourself registered before trying to login.");
          }
        });
    }
  };

  submitOtp = () => {
    console.log("Will submit OTP");
  };

  hideOtpField = () => {
    console.log("Hiding otp field");
    this.setState({
      otp: "",
      showOtp: false
    });
  };
}

export default PhoneLogin;
