import React, { Component } from "react";
import firebase from "firebase";
import "firebase/database";
import "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import fireApp from "../base";
import dbKeys from "../constants/realtimeDbKeys";
import pathNames from "../constants/pathNames";
import { validatePhoneNumber } from "../utils/validators";

import "../styles/PhoneLogin.css";

class PhoneLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      otp: "",
      showOtp: false
    };
    this.history = props.history;
    this.updatePhoneNumber = this.updatePhoneNumber.bind(this);
    this.updateOtpField = this.updateOtpField.bind(this);
    this.hideOtpField = this.hideOtpField.bind(this);
    this.submitPhoneNumber = this.submitPhoneNumber.bind(this);
    this.submitOtp = this.submitOtp.bind(this);
  }

  componentDidMount() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "submit-btn",
      {
        size: "invisible",
        callback: function(response) {
          //reCAPTCHA solved, allow sign in with phone number.
        },
        "expired-callback": function() {
          // Response expired. Ask user to solve reCAPTCHA again.
        }
      }
    );
    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });
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
            <button
              className="login-buttons"
              id="submit-btn"
              onClick={this.submitPhoneNumber}
            >
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
        {/*<div ref={ref => (this.recaptcha = ref)}></div>*/}
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
    var phoneNumber = this.state.phoneNumber;
    const isValidPhoneNumber = validatePhoneNumber(phoneNumber);
    if (!isValidPhoneNumber) {
      alert("Please enter a valid phone number.");
    } else {
      const truncatedPhoneNumber = phoneNumber.slice(phoneNumber.length - 10);
      var phoneLoginComponent = this;
      fireApp
        .database()
        .ref(dbKeys.judges)
        .child(truncatedPhoneNumber)
        .once("value", snapshot => {
          if (snapshot.exists()) {
            phoneNumber.replace("[\\s\\-()]", "");
            if (phoneNumber.length === 10) {
              phoneNumber = "+1" + phoneNumber;
            }
            var appVerifier = window.recaptchaVerifier;
            firebase
              .auth()
              .signInWithPhoneNumber(phoneNumber, appVerifier)
              .then(function(confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                phoneLoginComponent.setState({ showOtp: true });
              })
              .catch(function(error) {
                alert(error);
                // Error; SMS not sent
                // ...
              });
          } else {
            alert("Please get yourself registered before trying to login.");
          }
        });
    }
  };

  submitOtp = () => {
    console.log("Will submit OTP");
    var code = this.state.otp;
    var history = this.history;

    window.confirmationResult
      .confirm(code)
      .then(function(result) {
        // User signed in successfully.
        var user = result.user;
        console.log("User: ", user);
        history.push(pathNames.teamList);
        // ...
      })
      .catch(function(error) {
        // User couldn't sign in (bad verification code?)
        // ...
        alert(error);
      });
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
