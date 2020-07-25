import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import "./UnVerifyUser.css";
class UnVerifyUser extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar />
        <div className="UnVerifyUser">
          Your Account Is Not Verified. Check Your Email to verify your account.
        </div>
      </div>
    );
  }
}

export default UnVerifyUser;
