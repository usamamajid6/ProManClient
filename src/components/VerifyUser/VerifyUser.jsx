import React, { Component } from "react";
import { verifyUser } from "../../Actions/VerifyUserAction";
import { connect } from "react-redux";
import { message } from "antd";
import jwt from 'jsonwebtoken';
import JWTKey from '../../JWTKey';
import "./VerifyUser.css";
class VerifyUser extends Component {
  componentDidMount = async () => {
    try {
      var decoded = jwt.verify(this.props.match.params.token, JWTKey);

      await this.props.verifyUser({
        _id: decoded._id,
      });
      console.log('====================================');
      console.log(decoded);
      console.log('====================================');
      message.success("Successfully Verified");
      this.props.history.push("/login");
    } catch (e) {
      message.error("Some Problem Occur!");
    }
  };
  render() {
    return (
      <div>
        {/* <Navbar /> */}
        <div className="VerifyUser"></div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  response: state.verifyUser,
});

const mapDispatchToProps = {
  verifyUser,
};

VerifyUser = connect(mapStateToProps, mapDispatchToProps)(VerifyUser);
export default VerifyUser;
