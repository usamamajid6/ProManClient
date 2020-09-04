import React, { Component } from "react";
import { Row, Col, Form, Input, InputNumber, Button } from "antd";
import { connect } from "react-redux";
import {
  saveUCPResult,
  saveUCPCostResult,
  changeUCPCostResultStatus,
} from "../../Actions";
class Calculation extends Component {
  state = {};
  componentDidMount = () => {
    let ucp =
      (this.props.uucw + this.props.uaw) * this.props.tcf * this.props.ecf;
    this.props.saveResult(ucp);
  };

  onFinish = (values) => {
    const cost = values.cost * this.props.ucp;
    this.props.saveCost(cost);
    this.props.changeUCPCostResultStatus(true);
    console.log("====================================");
    console.log(this.props.cost);
    console.log("====================================");
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <Row className="UCP">
        <Col span={24} className="calculation">
          <div>The UCP is calculated based on the following formula:</div>
          <div>UCP = (UUCW + UAW) x TCF x ECF</div>
          <div>
            UCP = ({this.props.uucw} + {this.props.uaw}) x {this.props.tcf} x{" "}
            {this.props.ecf}
          </div>
          <div>UCP = {this.props.ucp}</div>
          <div>Your project contains {this.props.ucp} Use Case Points.</div>
          <div>
            <Form
              onChange={() => {
                this.props.changeUCPCostResultStatus(false);
                this.props.saveCost("To Be Calculated!");
              }}
              name="ucpCost"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                className="formItem"
                label={
                  <span
                    style={{
                      fontSize: "1.2rem",
                      color: "darkslategray",
                    }}
                  >
                    Enter The Cost Per UCP
                  </span>
                }
                name="cost"
                rules={[
                  {
                    required: true,
                    message: "Required!",
                  },
                ]}
              >
                <InputNumber
                  style={{
                    borderRadius: "2rem",
                  }}
                  className="formItem"
                  min={0}
                />
              </Form.Item>

              <Form.Item className="formItem">
                <Button className="formButton" type="primary" htmlType="submit">
                  Calculate
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div>Your project cost is: {this.props.cost}.</div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  uucw: state.UUCW.result,
  uaw: state.UAW.result,
  tcf: state.TCF.result,
  ecf: state.ECF.result,
  ucp: state.UCP.result,
  cost: state.UCPCost.result,
});

const mapDispatchToProps = {
  saveResult: saveUCPResult,
  saveCost: saveUCPCostResult,
  changeUCPCostResultStatus,
};

Calculation = connect(mapStateToProps, mapDispatchToProps)(Calculation);

export default Calculation;
