import React, { Component } from "react";
import { Row, Col, Modal } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Signup/Register";
import UCP from "./components/UCP/UCP";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import Navbar from "./components/Navbar/Navbar";

import "./App.css";
class App extends Component {
  state = {};
  render() {
    return (
      <Row>
        <Col span={24}>
          {" "}
          <Navbar />
          <Router>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/userDashboard" component={UserDashboard} />
          </Router>
        </Col>
      </Row>
    );
  }
}

export default App;
