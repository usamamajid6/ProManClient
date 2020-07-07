import React, { Component } from "react";
import { Row, Col, Modal } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Signup/Register";
import UCP from "./components/UCP/UCP";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import Logout from "./components/Logout/logout";
import Homepage from "./components/Homepage/Homepage";
import "./App.css";
import AddNewTask from "./components/AddNewTask/AddNewTask.jsx";
import AddNewTaskList from "./components/AddNewTaskList/AddNewTaskList";
import ViewTaskDetails from "./components/ViewTaskDetails/ViewTaskDetails";
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
            <Route path="/addNewTask" component={AddNewTask} />
            <Route path="/addNewTaskList" component={AddNewTaskList} />
            <Route path="/viewTaskDetails" component={ViewTaskDetails} />
          </Router>
        </Col>
      </Row>
    );
  }
}

export default App;
