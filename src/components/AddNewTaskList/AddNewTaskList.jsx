import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Row, Col, message } from "antd";
import { addTaskList } from "../../Actions/AddTaskListAction";
import "./AddNewTaskList.css";

const { TextArea } = Input;

class AddNewTaskList extends Component {
  onFinish = async (values) => {
    console.log(values);
    let data = {
      name: values.tasklist_name,
      description: values.description,
      project_id: parseInt(this.props.project_id),
    };

    try {
      await this.props.addTaskList(data);
      let response = this.props.response;
      console.log(response);
      message.success(response.message);
      this.props.closeAddNewTaskListModal();
    } catch (error) {
      message.error("Some Problem Occur!");
    }
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <Form
        name="add_new_tasklist"
        className="addTaskListContainer"
        initialValues={{
          remember: true,
        }}
        onFinish={this.onFinish}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              className="formItemAddTaskList"
              label=""
              name="tasklist_name"
              rules={[
                {
                  required: true,
                  message: "Please input TaskList Name!",
                },
              ]}
            >
              <Input
                className="formInputAddTaskList"
                placeholder="TaskList Name"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              className="formItemAddTaskList"
              label=""
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input description!",
                },
              ]}
            >
              <TextArea
                className="formInputAddTaskList"
                placeholder="Description..."
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item className="formItemAddTaskList">
              <Button className="formButtonAddTaskList" htmlType="submit">
                CREATE
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  response: state.addTaskList,
});

const mapDispatchToProps = { addTaskList };
AddNewTaskList = connect(mapStateToProps, mapDispatchToProps)(AddNewTaskList);

export default AddNewTaskList;
