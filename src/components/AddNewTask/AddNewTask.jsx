import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Input, Select, Row, Col, message } from "antd";
import { DatePicker } from "antd";
import { addTask } from "../../Actions/AddTaskAction";
import "./AddNewTask.css";
const { TextArea } = Input;
const { Option } = Select;

var data = {
  result: {
    status: "in-progress",
    cost: "Sorry No Information Provided",
    timelines: [],
    _id: 1,
    name: "ABCDEF",
    start_date: "2020-06-03T16:21:25.774Z",
    end_date: "2020-07-15T16:21:28.409Z",
    project_type: "other",
    leader: {
      total_tasks: 0,
      efficiency_score: 0,
      _id: 1,
      name: "a",
      email: "a",
      password: "$2a$10$cO.LQJRDG.q2Z9lkF9plX.8BYoG52DwV0Fy5MJgLnZnrZrzx/AbZ2",
      phone_number: "76522478324",
      __v: 0,
    },
    description: "a",
    members: [
      {
        total_tasks: 0,
        efficiency_score: 0,
        _id: 1,
        member: {
          total_tasks: 0,
          efficiency_score: 0,
          _id: 1,
          name: "a",
          email: "a",
          password:
            "$2a$10$cO.LQJRDG.q2Z9lkF9plX.8BYoG52DwV0Fy5MJgLnZnrZrzx/AbZ2",
          phone_number: "76522478324",
          __v: 0,
        },
      },
      {
        total_tasks: 0,
        efficiency_score: 0,
        _id: 2,
        member: {
          total_tasks: 0,
          efficiency_score: 0,
          _id: 2,
          name: "a",
          email: "aa",
          password:
            "$2a$10$M22aoTAL0ZHDNsB3885HRu617GL5a6xQmkn861jM2tsBLUqMPPITq",
          phone_number: "76522478324",
          __v: 0,
        },
      },
      {
        total_tasks: 0,
        efficiency_score: 0,
        _id: 3,
        member: {
          total_tasks: 0,
          efficiency_score: 0,
          _id: 3,
          name: "a",
          email: "a",
          password:
            "$2a$10$cO.LQJRDG.q2Z9lkF9plX.8BYoG52DwV0Fy5MJgLnZnrZrzx/AbZ2",
          phone_number: "76522478324",
          __v: 0,
        },
      },
      {
        total_tasks: 0,
        efficiency_score: 0,
        _id: 4,
        member: {
          total_tasks: 0,
          efficiency_score: 0,
          _id: 4,
          name: "a",
          email: "aa",
          password:
            "$2a$10$M22aoTAL0ZHDNsB3885HRu617GL5a6xQmkn861jM2tsBLUqMPPITq",
          phone_number: "76522478324",
          __v: 0,
        },
      },
      {
        total_tasks: 0,
        efficiency_score: 0,
        _id: 5,
        member: {
          total_tasks: 0,
          efficiency_score: 0,
          _id: 5,
          name: "a",
          email: "aaa",
          password:
            "$2a$10$prH8RkOnsdey1JFlp9KtH.DlLFF1KuMcIeJ6PJj75igPEMlBp6gGu",
          phone_number: "76522478324",
          __v: 0,
        },
      },
    ],
    createdAt: "2020-06-28T16:53:18.471Z",
    updatedAt: "2020-06-28T16:53:19.516Z",
    __v: 0,
  },
  taskList: [
    {
      project: 1,
      tasks: [
        {
          name: "Task 4",
          description: "hg hgh hg hg",
          pre_req: 2,
          task_list: 1,
          status: "in-progress",
          attachments: [],
          comments: [],
          members: [1, 2],
          sub_tasks: [],
          _id: 6,
          due_date: "2020-07-06T19:00:00.000Z",
          __v: 0,
        },
        {
          name: "Task 4",
          description: "hg hgh hg hg",
          pre_req: 3,
          task_list: 1,
          status: "in-progress",
          attachments: [],
          comments: [],
          members: [1, 2],
          sub_tasks: [],
          _id: 7,
          due_date: "2020-07-06T19:00:00.000Z",
          __v: 0,
        },
        {
          name: "Task 4",
          description: "hg hgh hg hg",
          pre_req: 4,
          task_list: 1,
          status: "in-progress",
          attachments: [],
          comments: [],
          members: [1, 2],
          sub_tasks: [],
          _id: 8,
          due_date: "2020-07-06T19:00:00.000Z",
          __v: 0,
        },
        {
          name: "Task 4",
          description: "hg hgh hg hg",
          pre_req: 5,
          task_list: 1,
          status: "in-progress",
          attachments: [],
          comments: [],
          members: [1, 2],
          sub_tasks: [],
          _id: 9,
          due_date: "2020-07-06T19:00:00.000Z",
          __v: 0,
        },
        {
          name: "Task 4",
          description: "hg hgh hg hg",
          pre_req: 6,
          task_list: 1,
          status: "in-progress",
          attachments: [],
          comments: [],
          members: [1, 2],
          sub_tasks: [],
          _id: 10,
          due_date: "2020-07-06T19:00:00.000Z",
          __v: 0,
        },
      ],
      _id: 1,
      name: "Task List",
      __v: 0,
    },
    {
      project: 1,
      tasks: [],
      _id: 2,
      name: "Task List",
      __v: 0,
    },
    {
      project: 1,
      tasks: [],
      _id: 3,
      name: "Task List",
      __v: 0,
    },
    {
      project: 1,
      tasks: [],
      _id: 4,
      name: "Task List",
      __v: 0,
    },
    {
      project: 1,
      tasks: [],
      _id: 5,
      name: "Task List",
      __v: 0,
    },
  ],
};

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


  componentDidMount=()=>{
    console.log(this.props.project_data.data);
  }

  render() {

    return (
      <div id="components-dropdown-demo-dropdown-button">
          <Form
            name="add_new_task"
            className="addTaskContainer"
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
                      message: "Please input task!",
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
                      message: "Please input description!",
                    },
                  ]}
                >
                  <TextArea
                    className="formInputAddTask"
                    placeholder="Description..."
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
                      message: "Enter Pre Requsite..!",
                    },
                  ]}
                >
                  <Select
                    className="formInputAddTask"
                    placeholder="Please Enter Pre Requsite, if any..!"
                  >
                    <Option value="0">No Prerequsite</Option>
                    {this.props.project_data.data.taskList.map((taskList, index) =>
                      taskList.tasks.map((tasks, index) => (
                        <Option value={tasks._id}>{tasks.name}</Option>
                      ))
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
                      message: "Please input Due Date!",
                    },
                  ]}
                >
                  <DatePicker
                    className="formButtonAddTask"
                    placeholder="Due Date"
                    onChange={onChange}
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
                      message: "Please enter atleast a single member!",
                      type: "array",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    className="formInputAddTask"
                    placeholder="Add Members"
                  >
                    {this.props.project_data.data.result.members.map((members, index) => (
                      <Option value={members.member._id}>
                        {members.member.name}
                      </Option>
                    ))}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project_data:state.projectData,
  response: state.addTask,
});

const mapDispatchToProps = { addTask };
AddNewTask = connect(mapStateToProps, mapDispatchToProps)(AddNewTask);

export default AddNewTask;
