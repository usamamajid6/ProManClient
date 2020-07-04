import React, { Component } from "react";
import { Row, Col, Modal } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UCP from "./components/UCP/UCP";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import Logout from "./components/Logout/logout";
import Homepage from "./components/Homepage/Homepage";
import Footer from "./components/Footer/Footer";
import "./App.css";
class App extends Component {
  state = {};
  render() {
    return (
      <Row>
        <Col span={24}>
          <Router>
            <Route exact path="/" component={Homepage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/userDashboard" component={UserDashboard} />
            <Route path="/logout" component={Logout} />
          </Router>
        </Col>
        <Col span={24}>
          <Footer />
        </Col>
      </Row>
    );
  }
}

export default App;
