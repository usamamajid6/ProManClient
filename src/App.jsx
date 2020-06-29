import React, { Component } from "react";
import { Row, Col, Modal } from "antd";
import UCP from "./components/UCP/UCP";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import "./App.css";
class App extends Component {
  state = {};
  render() {
    return (
      <Row>
        <Col span={24}>
          <UserDashboard />
        </Col>
      </Row>
    );
  }
}

export default App;
