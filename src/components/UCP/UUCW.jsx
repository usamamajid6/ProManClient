// First Thing in UCP Estimation Technique

// UUCW is the Unadjusted Use Case Weight for a project. Determining the impact that each Use Case
// will have on a system is critical to the project size. The number of transactions a Use Case
// handles will need to be found for each Use Case. There are three classifications that a Use Case
// can be: Simple, Average or Complex.

// Step 1: Classify each Use Case of your project by determining how many transactions it contains.
// Step 2: Enter the total number of Use Cases that fall under that specific classification
//         in the Input Text Fields provided.
// Step 3: Select the Calculate button to display the UUCW Total.

import React, { Component } from "react";
import { Row, Col, Button, Form, InputNumber, Tooltip, Table } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import { changeUUCWResultStatus, saveUUCWResult } from "../../Actions";
import "./UCP.css";

const { Column } = Table;

class UUCW extends Component {
  state = {
    tableData: [
      {
        id: "simple_use_case",
        name: "Simple",
        multiply: "X",
        weight: 5,
        number_of_use_case: 0,
        equals: "=",
        result: 0,
      },
      {
        id: "average_use_case",
        name: "Average",
        multiply: "X",
        weight: 10,
        number_of_use_case: 0,
        equals: "=",
        result: 0,
      },
      {
        id: "complex_use_case",
        name: "Complex",
        multiply: "X",
        weight: 15,
        number_of_use_case: 0,
        equals: "=",
        result: 0,
      },
    ],
  };
  onFinish = (values) => {
    let tableData = this.state.tableData;
    tableData[0].number_of_use_case = values.simple_use_case;
    tableData[1].number_of_use_case = values.average_use_case;
    tableData[2].number_of_use_case = values.complex_use_case;
    tableData[0].result = values.simple_use_case * tableData[0].weight;
    tableData[1].result = values.average_use_case * tableData[1].weight;
    tableData[2].result = values.complex_use_case * tableData[2].weight;
    let uucwResult =
      tableData[0].result + tableData[1].result + tableData[2].result;
    this.props.saveResult(uucwResult);
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
            <div className="title">Calculate UUCW</div>
            <div className="subTitle">(Unadjusted Use Case Weight)</div>
          </Col>
          <Col span={1}></Col>
          <Col span={22}>
            <Row>
              <Col className="itemContainer" span={24}>
                <Table
                  size="small"
                  pagination={false}
                  dataSource={this.state.tableData}
                  rowClassName="tableStylesRow"
                  className="tableStyles"
                  bordered
                >
                  <Column
                    className="tableStyles"
                    align="center"
                    title={() => {
                      return <span>Use Case Specification</span>;
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
                      return <span>Number Of Use Case(s)</span>;
                    }}
                    dataIndex="number_of_use_case"
                    key="number_of_use_case"
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
                <span className="resultHead">UUCW Result:</span>
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
                  name="uucw"
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
                        Number Of <b>Simple</b> Use Cases &nbsp;
                        <Tooltip title="1 to 3 transactions">
                          <QuestionCircleFilled />
                        </Tooltip>
                      </span>
                    }
                    name="simple_use_case"
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
                        Number Of <b>Average</b> Use Cases &nbsp;
                        <Tooltip title="4 to 7 transactions">
                          <QuestionCircleFilled />
                        </Tooltip>
                      </span>
                    }
                    name="average_use_case"
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
                        Number Of <b>Complex</b> Use Cases &nbsp;
                        <Tooltip title="8 or more transactions">
                          <QuestionCircleFilled />
                        </Tooltip>
                      </span>
                    }
                    name="complex_use_case"
                    rules={[
                      {
                        required: true,
                        message: "Required!",
                      },
                    ]}
                  >
                    <InputNumber className="formItem" min={0} />
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
  result: state.UUCW.result,
  status: state.UUCW.status,
});

const maptDispatchToProps = {
  saveResult: saveUUCWResult,
  changeResultStatus: changeUUCWResultStatus,
};

UUCW = connect(mapStateToProps, maptDispatchToProps)(UUCW);

export default UUCW;
