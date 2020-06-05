import React, { Component } from "react";
import { Row, Col } from "antd";
import Counter from "./components/Counter/Counter";
import "./App.css";
class App extends Component {
  state = {};
  render() {
    return (
      <Row>
        <Col span={24}>
          <Counter />
        </Col>
      </Row>
    );
  }
}

export default App;
