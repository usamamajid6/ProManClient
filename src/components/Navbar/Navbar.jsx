import React, { Component } from "react";
import { Row, Col, Avatar, Button, Menu, Dropdown } from "antd";
import "./Navbar.css";
class Navbar extends Component {
  state = {};

  displayUserDropdown = () => {
    return (
      <Menu>
        <Menu.Item>
          <Button type="primary">PROFILE</Button>
        </Menu.Item>
        <Menu.Item>
          <Button type="primary">DASHBOARD</Button>
        </Menu.Item>
        <Menu.Item>
          <Button type="primary">LOGOUT</Button>
        </Menu.Item>
      </Menu>
    );
  };

  displayUserRelatedNavItems = () => {
    if (true) {
      return (
        <Row>
          <Col span={16}>
            <div className="navItem">
              <div className="navName">Name</div>
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
                  style={{ color: "green", backgroundColor: "lightblue" }}
                >
                  U
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
                <Button className="navLink" type="link">
                  Login
                </Button>
                /
                <Button className="navLink" type="link">
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
        <Col span={1}>
          <div className="navItem">
            <Avatar
              className="onHoverPointer"
              style={{
                backgroundColor: "lightblue",
                color: "blue",
                border: "1px solid white",
              }}
              size={60}
            >
              PROMAN
            </Avatar>
          </div>
        </Col>
        <Col span={4}>
          <div className="navItem">
            <div className="navTitle onHoverPointer">PROMAN</div>
          </div>
        </Col>
        <Col span={12}></Col>
        <Col span={6}>{this.displayUserRelatedNavItems()}</Col>
      </Row>
    );
  }
}

export default Navbar;
