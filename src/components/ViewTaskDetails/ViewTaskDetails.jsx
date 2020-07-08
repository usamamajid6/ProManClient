import React, { Component } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Upload,
  Avatar,
  Checkbox,
  Progress,
  Input,
  Form,
  message,
} from "antd";
import { connect } from "react-redux";
import { InboxOutlined } from "@ant-design/icons";
import { addComment } from "../../Actions/addCommentAction";
import "./ViewTaskDetails.css";

const { TextArea } = Input;

const data = {
  name: "Task 4",
  description: "hg hgh hg hg",
  pre_req: {
    name: "Task 1",
    description: "hg hgh hg hg",
    pre_req: 2,
    task_list: 1,
    status: "in-progress",
    attachments: [],
    comments: [],
    members: [1, 2],
    sub_tasks: [],
    _id: 2,
    due_date: "2020-07-09T19:00:00.000Z",
    __v: 0,
  },
  task_list: {
    project: 1,
    tasks: [6, 7, 8, 9, 10, 11],
    _id: 1,
    name: "Task List",
    __v: 0,
  },
  status: "in-progress",
  attachments: [
    {
      _id: 1,
      name: "Attachment 1",
      path: "/file_name.pdf",
      member: 1,
      createdAt: "2020-07-05T17:48:55.144Z",
      updatedAt: "2020-07-05T17:48:55.144Z",
      __v: 0,
    },
    {
      _id: 2,
      name: "Attachment 2",
      path: "/file_name.pdf",
      member: 1,
      createdAt: "2020-07-05T17:49:05.471Z",
      updatedAt: "2020-07-05T17:49:05.471Z",
      __v: 0,
    },
  ],
  comments: [
    {
      _id: 5,
      message:
        "This is message 1 This is message 1 This is message 1 This is message 1 This is message 1 This is message 1 This is message 1 This is message 1",
      member: {
        total_tasks: 0,
        efficiency_score: 0,
        _id: 4,
        name: "Usama Majid",
        email: "admin@s.com",
        password:
          "$2a$10$kewliuuxdqqEyBPgDsURne5Td/NbJPhqP/g55yrHfoObKCItlVs5m",
        phone_number: "3345335288",
        __v: 0,
      },
      createdAt: "2020-07-05T11:10:08.249Z",
      updatedAt: "2020-07-05T11:10:08.249Z",
      __v: 0,
    },
    {
      _id: 6,
      message: "This is message 2",
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
      createdAt: "2020-07-05T11:10:18.203Z",
      updatedAt: "2020-07-05T11:10:18.203Z",
      __v: 0,
    },
    {
      _id: 7,
      message: "This is message 3",
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
      createdAt: "2020-07-05T11:10:23.772Z",
      updatedAt: "2020-07-05T11:10:23.772Z",
      __v: 0,
    },
  ],
  members: [
    {
      total_tasks: 0,
      efficiency_score: 0,
      _id: 1,
      name: "a",
      email: "a",
      password: "$2a$10$cO.LQJRDG.q2Z9lkF9plX.8BYoG52DwV0Fy5MJgLnZnrZrzx/AbZ2",
      phone_number: "76522478324",
      __v: 0,
    },
    {
      total_tasks: 0,
      efficiency_score: 0,
      _id: 2,
      name: "a",
      email: "aa",
      password: "$2a$10$M22aoTAL0ZHDNsB3885HRu617GL5a6xQmkn861jM2tsBLUqMPPITq",
      phone_number: "76522478324",
      __v: 0,
    },
  ],
  sub_tasks: [
    {
      status: "in-progress",
      member: 2,
      _id: 1,
      name: "Sub Task 1",
      description: "Lorem Ipsum",
      __v: 0,
    },
    {
      status: "in-progress",
      member: 1,
      _id: 2,
      name: "Sub Task 2",
      description: "Lorem Ipsum",
      __v: 0,
    },
    {
      status: "in-progress",
      member: 1,
      _id: 3,
      name: "Attachment 1",
      __v: 0,
    },
  ],
  _id: 6,
  due_date: "2020-07-16T10:10:00.000Z",
  __v: 0,
  due_on: "Due on : July,16 2020",
};

class ViewTaskDetails extends Component {
  state = { visible: true };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  addSubTask() {
    console.log("Task will be added later..!");
  }

  onFinish = async (values) => {
    console.log(values);
    let data = {
      message: values.comment,
      member_id:1,
      task_id:1,
    };

    try {
      await this.props.addComment(data);
      let response = this.props.response;
      console.log(response);
      message.success(response.message);
    } catch (error) {
      message.error("Some Problem Occur!");
    }
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Task Details"
          visible={this.state.visible}
          width="70vw"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row className="viewTaskDetails">
            <Col span={24} className="statusContainer">
              <b>Status:</b>{" "}
              <span style={{ textTransform: "capitalize" }}>
                <b> {data.status}</b>{" "}
              </span>
            </Col>
            <Col span={24} className="statusContainer">
              <span>
                {" "}
                <b>{data.due_on}</b>
              </span>
            </Col>
            <Col span={16} className="colDesign">
              <Row className="viewTaskDetails">
                <Col span={24} className="otherContainers">
                  {" "}
                  <b>Name: </b>
                  <div className="innerContainers"> {data.name} </div>
                </Col>{" "}
                <Col span={24} className="otherContainers">
                  <b>Description: </b>
                  <br></br>
                  <div className="innerContainers">{data.description} </div>
                </Col>
                <Col span={24} className="otherContainers">
                  <b>Subtask </b>
                  <Button
                    className="buttonStyle"
                    type="primary"
                    onClick={this.addSubTask}
                  >
                    Add SubTask
                  </Button>
                </Col>
                <Col span={24}>
                  <Row className="subTaskDesign">
                    <Col span={24}>
                      {" "}
                      <Progress strokeWidth={20} percent={100} />
                    </Col>

                    {data.sub_tasks.map((sub_tasks, index) => (
                      <Col span={24}>
                        <Checkbox onChange={this.onChange}>
                          {" "}
                          {sub_tasks.name}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col span={24} className="otherContainers">
                  <b>Comments: </b>

                  <Form
                    name="add_new_comment"
                    className="addTaskListContainer"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={this.onFinish}
                  >
                    <Row>
                      <Col span={18}>
                        <Form.Item
                          className="formItemAddTaskList"
                          name="comment"
                        >
                          <TextArea rows={1} className="innerContainers" />
                        </Form.Item>
                      </Col>

                      <Col span={6}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="buttonStyle"
                        >
                          Post Comment
                        </Button>
                      </Col>
                    </Row>
                  </Form>

                  {data.comments.map((comments, index) => (
                    <Row className="innerContainers">
                      {" "}
                      <Col span={2}>
                        <Avatar
                          style={{
                            color: "#f56a00",
                            backgroundColor: "#fde3cf",
                          }}
                        >
                          {comments.member.name.substring(0, 1)}
                        </Avatar>
                      </Col>
                      <Col span={22}>
                        <div>{comments.member.name} </div>
                        <div> {comments.message}</div>
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
            </Col>
            <Col span={8} className="colDesign">
              <Row className="viewTaskDetails">
                <Col span="24" className="otherContainers">
                  <b>Members: </b>
                  {data.members.map((members, index) => (
                    <Col span="24" className="membersAttachmentDesign">
                      {members.name}
                    </Col>
                  ))}
                </Col>

                <Col className="otherContainers">
                  <b>Attachment: </b>{" "}
                  {data.attachments.map((attachments, index) => (
                    <Col className="membersAttachmentDesign">
                      {" "}
                      {attachments.name}{" "}
                    </Col>
                  ))}
                </Col>

                <Col>
                  <Upload.Dragger
                    name="files"
                    action="/upload.do"
                    className="draggerDesign"
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag files to this area to upload
                    </p>
                  </Upload.Dragger>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  response: state.addComment,
});

const mapDispatchToProps = { addComment };
ViewTaskDetails = connect(mapStateToProps, mapDispatchToProps)(ViewTaskDetails);

export default ViewTaskDetails;
