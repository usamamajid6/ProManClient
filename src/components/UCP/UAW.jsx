// Second Thing in UCP Estimation Technique

// UAW is the Unadjusted Actor Weight for a program. Actors contribute to the size of the project,
// therefore all Actors must be well thought out for the entire system. There are three classifications
// which an Actor can be: Simple, Average and Complex.

// Step 1: Classify each Actor for your program by determining which “Type of Actor” description it fits in.
// Step 2: Enter the total number of Actors that fall under that classification in the
//         Input Text Fields provided.
// Step 3: Select the Calculate button to display the UAW Total.

import React, { Component } from "react";
import { Row, Col, Button, Form, InputNumber, Tooltip, Table } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import { changeUAWResultStatus, saveUAWResult } from "../../Actions";
import "./UCP.css";

const { Column } = Table;

class UAW extends Component {
  state = {
    tableData: [
      {
        id: "simple_actor",
        name: "Simple",
        multiply: "X",
        weight: 1,
        number_of_actor: 0,
        equals: "=",
        result: 0,
      },
      {
        id: "average_actor",
        name: "Average",
        multiply: "X",
        weight: 2,
        number_of_actor: 0,
        equals: "=",
        result: 0,
      },
      {
        id: "complex_actor",
        name: "Complex",
        multiply: "X",
        weight: 3,
        number_of_actor: 0,
        equals: "=",
        result: 0,
      },
    ],
  };
  onFinish = (values) => {
    let tableData = this.state.tableData;
    tableData[0].number_of_actor = values.simple_actor;
    tableData[1].number_of_actor = values.average_actor;
    tableData[2].number_of_actor = values.complex_actor;
    tableData[0].result = values.simple_actor * tableData[0].weight;
    tableData[1].result = values.average_actor * tableData[1].weight;
    tableData[2].result = values.complex_actor * tableData[2].weight;
    let uawResult =
      tableData[0].result + tableData[1].result + tableData[2].result;
    this.props.saveResult(uawResult);
    this.props.changeResultStatus(true);
    this.setState({ tableData });
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  render() {
    return (
      <div className="UCP">
        <Row>
          <Col className="titleContainer" span={24}>
            <div className="title">Calculate UAW</div>
            <div className="subTitle">(Unadjusted Actor Weight)</div>
          </Col>
          <Col span={1}></Col>
          <Col span={22}>
            <Row>
              <Col className="itemContainer" span={24}>
                <Table
                  size="small"
                  className="table"
                  pagination={false}
                  dataSource={this.state.tableData}
                >
                  <Column
                    className="tableStyles"
                    align="center"
                    title={() => {
                      return <span>Actor Specification</span>;
                    }}
                    dataIndex="name"
                    key="name"
                  />
                  <Column
                    align="center"
                    title={() => {
                      return <span>Weight</span>;
                    }}
                    dataIndex="weight"
                    key="weight"
                  />
                  <Column
                    align="center"
                    title={() => {
                      return <span></span>;
                    }}
                    dataIndex="multiply"
                    key="multiply"
                  />
                  <Column
                    align="center"
                    title={() => {
                      return <span>Number Of Actor(s)</span>;
                    }}
                    dataIndex="number_of_actor"
                    key="number_of_actor"
                  />
                  <Column
                    align="center"
                    title={() => {
                      return <span></span>;
                    }}
                    dataIndex="equals"
                    key="equals"
                  />
                  <Column
                    align="center"
                    title={() => {
                      return <span>Result</span>;
                    }}
                    dataIndex="result"
                    key="result"
                  />
                </Table>
              </Col>
              <Col span={24} className="result">
                <span className="resultHead">UAW Result:</span>
                <span className="resultActual"> {this.props.result}</span>
              </Col>
              <Col
                className="itemContainer"
                style={{ marginTop: "1rem" }}
                span={24}
              >
                <Form
                  onChange={() => {
                    this.props.saveResult("To Be Calculated!");
                    this.props.changeResultStatus(false);
                  }}
                  name="uaw"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                >
                  <Form.Item
                    className="formItem"
                    label={
                      <span>
                        Number Of <b>Simple</b> Actors &nbsp;
                        <Tooltip title="External system that must interact with the system using a well-defined API">
                          <QuestionCircleFilled />
                        </Tooltip>
                      </span>
                    }
                    name="simple_actor"
                    rules={[
                      {
                        required: true,
                        message: "Required!",
                      },
                    ]}
                  >
                    <InputNumber className="formItem" min={0} />
                  </Form.Item>

                  <Form.Item
                    className="formItem"
                    label={
                      <span>
                        Number Of <b>Average</b> Actors &nbsp;
                        <Tooltip title="External system that must interact with the system using standard communication protocols (e.g. TCP/IP, FTP, HTTP, database)">
                          <QuestionCircleFilled />
                        </Tooltip>
                      </span>
                    }
                    name="average_actor"
                    rules={[
                      {
                        required: true,
                        message: "Required!",
                      },
                    ]}
                  >
                    <InputNumber className="formItem" />
                  </Form.Item>
                  <Form.Item
                    className="formItem"
                    label={
                      <span>
                        Number Of <b>Complex</b> Actors &nbsp;
                        <Tooltip title="Human actor using a GUI application interface">
                          <QuestionCircleFilled />
                        </Tooltip>
                      </span>
                    }
                    name="complex_actor"
                    rules={[
                      {
                        required: true,
                        message: "Required!",
                      },
                    ]}
                  >
                    <InputNumber className="formItem" />
                  </Form.Item>

                  <Form.Item className="formItem">
                    <Button
                      className="formButton"
                      type="primary"
                      htmlType="submit"
                    >
                      Calculate
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  result: state.UAW.result,
  status: state.UAW.status,
});

const maptDispatchToProps = {
  saveResult: saveUAWResult,
  changeResultStatus: changeUAWResultStatus,
};

UAW = connect(mapStateToProps, maptDispatchToProps)(UAW);

export default UAW;
