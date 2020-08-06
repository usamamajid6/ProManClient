// Fourth Thing in UCP Estimation Technique

// ECF is the Environment Complexity Factor for a project. This estimates factors will not be
// implemented in a project, but severely impact it. ECF deals with the project team and their
// ability to complete the project. Each factor needs to be rated on a scale of 0 (irrelevant)
// to 5 (essential).

// Step 1: Rate each environmental consideration by selecting a rating value for each category below.
// Step 2: Select the Calculate button to calculate the ECF Total.

import React, { Component } from "react";
import { Row, Col, Button, Form, Table, Radio } from "antd";
import { connect } from "react-redux";
import { changeECFResultStatus, saveECFResult } from "../../Actions";
import "./UCP.css";
// import reactComponentDebounce from 'react-component-debounce';

const { Column } = Table;
// const DebounceInput = reactComponentDebounce({
//   valuePropName: 'value',
//   triggerMs: 250,
// })(Input);
class ECF extends Component {
  state = {
    tableData: [
      {
        factor: "E1",
        description: "Familiarity With Development Process Used",
        weight: 1.5,
        rating: 0,
      },
      {
        factor: "E2",
        description: "Application Experience",
        weight: 0.5,
        rating: 0,
      },
      {
        factor: "E3",
        description: "Object-Oriented Experience Of Team",
        weight: 1.0,
        rating: 0,
      },
      {
        factor: "E4",
        description: "Lead Analyst Capability",
        weight: 0.5,
        rating: 0,
      },
      {
        factor: "E5",
        description: "Motivation Of The Team",
        weight: 1.0,
        rating: 0,
      },
      {
        factor: "E6",
        description: "Stability Of Requirements",
        weight: 2.0,
        rating: 0,
      },
      {
        factor: "E7",
        description: "Part-Time Staff",
        weight: -1.0,
        rating: 0,
      },
      {
        factor: "E8",
        description: "Difficult Programming Language",
        weight: -1.0,
        rating: 0,
      },
    ],
    ef: "To Be Calculated!",
  };
  onFinish = (values) => {
    let tableData = this.state.tableData;
    let ef = 0.0;
    for (let i = 0; i < tableData.length; i++) {
      const element = tableData[i];
      ef = ef + element.rating * element.weight;
    }
    let ecfResult = 1.4 + -0.03 * ef;
    this.setState({ ef });
    this.props.saveResult(ecfResult);
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
            <div className="title">Calculate ECF</div>
            <div className="subTitle">(Environment Complexity Factor)</div>
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
                  <Form.Item className="formItem" >
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
                                  this.setState({ ef: "To Be Calculated!" });
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
                      Total EF : {this.state.ef}
                    </div>
                    <div className="resultActual">ECF =1.4 + (-0.03 x EF)</div>

                    <div>
                      <span className="resultHead">ECF Result:</span>
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
  result: state.ECF.result,
  status: state.ECF.status,
});

const maptDispatchToProps = {
  saveResult: saveECFResult,
  changeResultStatus: changeECFResultStatus,
};

ECF = connect(mapStateToProps, maptDispatchToProps)(ECF);

export default ECF;
