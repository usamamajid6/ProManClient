import React, { Component } from "react";
import { Row, Col, Modal } from "antd";
import UCP from "./components/UCP/UCP";
import "./App.css";
class App extends Component {
  state = {};
  render() {
    return (
      <Row>
        <Col span={24}>
          <Modal width="70vw" centered={true} visible={true}>
            <UCP />
            <div>
              Usama
            </div>
          </Modal>
        </Col>
      </Row>
    );
  }
}

export default App;
