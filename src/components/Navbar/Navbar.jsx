import React, { Component } from "react";
import { Row, Col, Avatar, Button, Menu, Dropdown, message } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserData } from "../../Actions/userDataAction";
import "./Navbar.css";
class Navbar extends Component {
  state = {
    login_status: false,
    userData: {},
  };

  componentDidMount = async () => {
    if (!localStorage.getItem("userId")) {
      // this.props.history.push("/login");
      this.setState({
        login_status: false,
      });
      // return;
    } else {
      try {
        await this.props.getUserData({
          _id: parseInt(localStorage.getItem("userId")),
        });
        this.setState({
          login_status: true,
          userData: this.props.userData,
        });
      } catch (error) {
        message.info("Some Problem Occur!");
      }
    }
  };

  displayUserDropdown = () => {
    return (
      <Menu>
        <Menu.Item>
          <Button
            type="link"
            onClick={() => {
              this.props.history.push("/Profile");
            }}
          >
            PROFILE
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            onClick={() => {
              this.props.history.push("/userDashboard");
            }}
            type="link"
          >
            DASHBOARD
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            onClick={() => {
              this.props.history.push("/logout");
            }}
            type="link"
          >
            LOGOUT
          </Button>
        </Menu.Item>
      </Menu>
    );
  };

  displayUserRelatedNavItems = () => {
    if (this.state.login_status) {
      return (
        <Row>
          <Col span={16}>
            <div className="navItem">
              <div className="navName">
                {this.state.userData.data.result.name}
              </div>
            </div>
          </Col>
          <Col span={4}>
            <div className="navItem">
              <Dropdown
                overlay={this.displayUserDropdown()}
                placement="bottomCenter"
              >
                <Avatar
                  className="onHoverPointer"
                  size={50}
                  style={{ color: "purple", backgroundColor: "lightblue" }}
                >
                  {this.state.userData.data.result.name.substring(0, 1)}
                </Avatar>
              </Dropdown>
            </div>
          </Col>
          <Col span={4}></Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col span={24}>
            <div className="navItem">
              <div className="navContent">
                <Button
                  onClick={() => {
                    this.props.history.push("/login");
                  }}
                  className="navLink"
                  type="link"
                >
                  Login
                </Button>
                /
                <Button
                  onClick={() => {
                    this.props.history.push("/register");
                  }}
                  className="navLink"
                  type="link"
                >
                  Register
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      );
    }
  };

  render() {
    return (
      <Row className="Navbar">
        <Col span={1}></Col>
        <Col span={2}>
          <div className="navItem">
            <Avatar
              className="onHoverPointer"
              style={{
                backgroundColor: "lightblue",
                color: "blue",
                border: "1px solid white",
              }}
              size={60}
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              PROMAN
            </Avatar>
          </div>
        </Col>
        <Col span={4}>
          <div className="navItem">
            <div
              className="navTitle onHoverPointer"
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              PROMAN
            </div>
          </div>
        </Col>
        <Col span={11}></Col>
        <Col span={6}>{this.displayUserRelatedNavItems()}</Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.userData,
});

const mapDispatchToProps = {
  getUserData,
};

Navbar = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default withRouter(Navbar);
