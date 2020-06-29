import React, { Component } from "react";
import { connect } from "react-redux";
import UUCW from "./UUCW";
import UAW from "./UAW";
import TCF from "./TCF";
import ECF from "./ECF";
import Calculation from "./Calculation";
import { Tabs, Row, Col, Button, message } from "antd";
import "./UCP.css";
const { TabPane } = Tabs;
class UCP extends Component {
  state = {
    currentKey: "1",
    backButton: true,
    nextButton: false,
  };

  componentDidUpdate = () => {};

  handleBack = () => {
    this.setState({
      nextButton: false,
    });
    let key = this.state.currentKey;
    key = parseInt(key);
    if (key === 2) {
      this.setState({ backButton: true });
    }
    if (key === 1) {
      return;
    }
    key--;
    key = key.toString();
    console.log(key);

    this.setState({
      currentKey: key,
    });
  };

  handleNext = () => {
    if (this.state.currentKey === "1") {
      if (!this.props.uucwStatus) {
        message.info("You must calculate UUCW first then proceed!");
        return;
      }
    }

    if (this.state.currentKey === "2") {
      if (!this.props.uawStatus) {
        message.info("You must calculate UAW first then proceed!");
        return;
      }
    }

    if (this.state.currentKey === "3") {
      if (!this.props.tcfStatus) {
        message.info("You must calculate TCF first then proceed!");
        return;
      }
    }

    if (this.state.currentKey === "4") {
      if (!this.props.ecfStatus) {
        message.info("You must calculate ECF first then proceed!");
        return;
      }
    }

    this.setState({
      backButton: false,
    });
    let key = this.state.currentKey;
    key = parseInt(key);
    if (key === 4) {
      this.setState({ nextButton: true });
    }
    if (key === 5) {
      return;
    }
    key++;
    key = key.toString();
    console.log(key);

    this.setState({
      currentKey: key,
    });
  };

  render() {
    return (
      <Row className="UCP">
        <Col span={24}>
          <Tabs
            className="tabs"
            activeKey={this.state.currentKey}
            type="card"
            size="large"
          >
            <TabPane disabled={false} tab="UUCW" key="1">
              <UUCW />
            </TabPane>
            <TabPane disabled={false} tab="UAW" key="2">
              <UAW />
            </TabPane>
            <TabPane disabled={false} tab="TCF" key="3">
              <TCF />
            </TabPane>
            <TabPane disabled={false} tab="ECF" key="4">
              <ECF />
            </TabPane>
            <TabPane disabled={false} tab="Calculation" key="5">
              <Calculation />
            </TabPane>
          </Tabs>
        </Col>
        <Col span={24} className="buttonNextContainer">
          <Button
            onClick={this.handleBack}
            type="primary"
            className="buttonBack"
            disabled={this.state.backButton}
          >
            Back
          </Button>
          <Button
            onClick={this.handleNext}
            type="primary"
            className="buttonNext"
            disabled={this.state.nextButton}
          >
            NEXT
          </Button>
        </Col>
      </Row>
    );
  }
}

const maptStateToProps = (state) => ({
  uucwStatus: state.UUCW.status,
  uawStatus: state.UAW.status,
  tcfStatus: state.TCF.status,
  ecfStatus: state.ECF.status,
});

UCP = connect(maptStateToProps, {})(UCP);

export default UCP;
