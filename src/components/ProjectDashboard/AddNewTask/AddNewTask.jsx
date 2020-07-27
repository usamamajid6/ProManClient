import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Input, Select, Row, Col, message } from "antd";
import { DatePicker } from "antd";
import { addTask } from "../../../Actions/AddTaskAction";
import "./AddNewTask.css";
const { TextArea } = Input;
const { Option } = Select;

function onChange(date, dateString) {
  console.log(date, dateString);
}

class AddNewTask extends Component {
  onFinish = async (values) => {
    let data = {
      name: values.taskname,
      description: values.description,
      pre_req_id: values.preRequsite,
      due_date: values.due_date._d,
      member_id_array: values.addMembers,
      task_list_id: this.props.task_list_id,
      project_id: this.props.project_id,
    };

    try {
      await this.props.addTask(data);
      let response = this.props.response;
      console.log(response);
      message.success(response.message);
      this.props.closeAddNewTaskModal();
    } catch (error) {
      message.error("Some Problem Occur!");
    }
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  componentDidMount = () => {
    console.log(this.props.project_data.data);
  };

  render() {
    return (
      <Row className="addTaskContainer">
        <Col span={24} className="modalTitle">
          Add New Task
        </Col>
        <Col span={24}>
          <Form
            name="add_new_task"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Row>
              <Col span={24}>
                <Form.Item
                  className="formItemAddTask"
                  label=""
                  name="taskname"
                  rules={[
                    {
                      required: true,
                      message: "Name is required!",
                    },
                  ]}
                >
                  <Input className="formInputAddTask" placeholder="Task Name" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  className="formItemAddTask"
                  label=""
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Description is required!",
                    },
                  ]}
                >
                  <TextArea
                    className="formInputAddTask"
                    placeholder="Description..."
                    rows={4}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  className="formItemAddTask"
                  name="preRequsite"
                  label=""
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Select Pre Requsite..!",
                    },
                  ]}
                >
                  <Select
                    className="formInputAddTask"
                    placeholder="Select Pre Requsite Task, if any..!"
                    style={{ borderRadius: "2rem" }}
                  >
                    <Option value="0">No Prerequsite</Option>
                    {this.props.project_data.data.taskList.map(
                      (taskList, index) =>
                        index === 0 || index === 1 || index === 2 ? (
                          taskList.tasks.map((tasks) => (
                            <Option value={tasks._id}>{tasks.name}</Option>
                          ))
                        ) : (
                          <div></div>
                        )
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="due_date"
                  className="formItemAddTask"
                  rules={[
                    {
                      required: true,
                      message: "Select Due Date!",
                    },
                  ]}
                >
                  <DatePicker
                    className="formButtonAddTask"
                    placeholder="Due Date"
                    onChange={onChange}
                    showTime={{ format: "HH:mm" }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  className="formItemAddTask"
                  name="addMembers"
                  label=""
                  rules={[
                    {
                      required: true,
                      message: "Select at-least single member!",
                      type: "array",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    className="formInputAddTask"
                    placeholder="Add Members"
                    style={{ borderRadius: "2rem" }}
                  >
                    {this.props.project_data.data.result.members.map(
                      (members, index) => (
                        <Option value={members.member._id}>
                          {members.member.name}
                        </Option>
                      )
                    )}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item className="formItemAddTask">
                  <Button className="formButtonAddTask" htmlType="submit">
                    CREATE
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  project_data: state.projectData,
  response: state.addTask,
});

const mapDispatchToProps = { addTask };
AddNewTask = connect(mapStateToProps, mapDispatchToProps)(AddNewTask);

export default AddNewTask;
