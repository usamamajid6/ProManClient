import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { verifyUser } from "../../Actions/VerifyUserAction";
import { connect } from "react-redux";
import { message } from "antd";
import "./VerifyUser.css";
class VerifyUser extends Component {
  componentDidMount = async () => {
    try {
      await this.props.verifyUser({
        _id: this.props.match.params._id,
      });
      console.log('====================================');
      console.log(this.props.match.params._id);
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
