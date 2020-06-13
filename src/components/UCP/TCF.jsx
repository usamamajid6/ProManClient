// Third Thing in UCP Estimation Technique

// TCF is the Technical Complexity Factor for a project that takes into consideration any
// technical requirements that will be implemented. Each of the 13 listed factors needs to be rated
// on a scale of 0 (irrelevant) to 5 (essential).

// Step 1: Rate each technical consideration by selecting a rating value for each category below.
// Step 2: Select the Calculate button to calculate the TCF Total.

import React, { Component } from "react";
import { Row, Col, Button, Form, Table, Radio } from "antd";
import { connect } from "react-redux";
import { changeTCFResultStatus, saveTCFResult } from "../../Actions";
import "./UCP.css";

const { Column } = Table;

class TCF extends Component {
  state = {
    tableData: [
      {
        factor: "T1",
        description: "Distributed System",
        weight: 2.0,
        rating: 0,
      },
      {
        factor: "T2",
        description: "Response Time/Performance Objectives",
        weight: 1.0,
        rating: 0,
      },
      {
        factor: "T3",
        description: "End-User Efficiency",
        weight: 1.0,
        rating: 0,
      },
      {
        factor: "T4",
        description: "Internal Processing Complexity",
        weight: 1.0,
        rating: 0,
      },
      {
        factor: "T5",
        description: "Code Reusability",
        weight: 1.0,
        rating: 0,
      },
      {
        factor: "T6",
        description: "Easy To Install",
        weight: 0.5,
        rating: 0,
      },
      {
        factor: "T7",
        description: "Easy To Use",
        weight: 0.5,
        rating: 0,
      },
      {
        factor: "T8",
        description: "Portability To Other Platforms",
        weight: 2.0,
        rating: 0,
      },
      {
        factor: "T9",
        description: "System Maintenance",
        weight: 1.0,
        rating: 0,
      },
      {
        factor: "T10",
        description: "Concurrent/Parallel Processing",
        weight: 1.0,
        rating: 0,
      },
      {
        factor: "T11",
        description: "Security Features",
        weight: 1.0,
        rating: 0,
      },
      {
        factor: "T12",
        description: "Access For Third Parties",
        weight: 1.0,
        rating: 0,
      },
      {
        factor: "T13",
        description: "End User Training",
        weight: 1.0,
        rating: 0,
      },
    ],
    tf: "To Be Calculated!",
  };
  onFinish = (values) => {
    let tableData = this.state.tableData;
    let tf = 0.0;
    for (let i = 0; i < tableData.length; i++) {
      const element = tableData[i];
      tf = tf + element.rating * element.weight;
    }
    let tcfResult = 0.6 + tf / 100;
    this.setState({ tf });
    this.props.saveResult(tcfResult);
    this.props.changeResultStatus(true);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  render() {
    return (
      <div className="UCP">
        <Row>
          <Col className="titleContainer" span={24}>
            <div className="title">Calculate TCF</div>
            <div className="subTitle">(Technical Complexity Factor)</div>
          </Col>
          <Col span={1}></Col>
          <Col span={22}>
            <Row>
              <Col className="itemContainer" span={24}>
                <Form
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                >
                  <Form.Item className="formItem">
                    <Table
                      size="small"
                      dataSource={this.state.tableData}
                      pagination={false}
                    >
                      <Column
                        align="center"
                        title="Factor"
                        dataIndex="factor"
                        key="factor"
                      />
                      <Column
                        align="center"
                        title="Desciption"
                        dataIndex="description"
                        key="description"
                      />
                      <Column
                        align="center"
                        title="Weight"
                        dataIndex="weight"
                        key="weight"
                      />
                      <Column
                        align="center"
                        title="Rating"
                        dataIndex="rating"
                        key="rating"
                        render={(value, record, index) => {
                          return (
                            <Form.Item
                              name={record.factor}
                              rules={[
                                {
                                  required: true,
                                  message: "Required!",
                                },
                              ]}
                            >
                              <Radio.Group
                                size="small"
                                onChange={(e) => {
                                  let tableData = this.state.tableData;
                                  tableData[index].rating = e.target.value;
                                  this.setState({
                                    tableData,
                                  });
                                  this.setState({ tf: "To Be Calculated!" });
                                  this.props.saveResult("To Be Calculated!");
                                  this.props.changeResultStatus(false);
                                }}
                              >
                                <Radio value={0}>0</Radio>
                                <Radio value={1}>1</Radio>
                                <Radio value={2}>2</Radio>
                                <Radio value={3}>3</Radio>
                                <Radio value={4}>4</Radio>
                                <Radio value={5}>5</Radio>
                              </Radio.Group>
                            </Form.Item>
                          );
                        }}
                      />
                    </Table>
                  </Form.Item>
                  <div className="result">
                    <div className="resultActual">
                      {" "}
                      Total TF : {this.state.tf}
                    </div>
                    <div className="resultActual"> TCF = 0.6 + (TF/100) </div>

                    <div>
                      <span className="resultHead">TCF Result:</span>
                      <span className="resultActual"> {this.props.result}</span>
                    </div>
                  </div>
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
              <Col
                className="itemContainer"
                style={{ marginTop: "1rem" }}
                span={24}
              ></Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  result: state.TCF.result,
  status: state.TCF.status,
});

const maptDispatchToProps = {
  saveResult: saveTCFResult,
  changeResultStatus: changeTCFResultStatus,
};

TCF = connect(mapStateToProps, maptDispatchToProps)(TCF);

export default TCF;
