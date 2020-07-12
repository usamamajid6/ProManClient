import React, { Component } from "react";
import TimeAgo from "react-timeago";
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
import { InboxOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { addComment } from "../../../Actions/addCommentAction";
import { getTaskData } from "../../../Actions/TaskDataAction";
import { updateTaskStatus } from "../../../Actions/UpdateTaskStatusAction";
import { updateTaskStatusLeader } from "../../../Actions/UpdateTaskStatusLeaderAction";
import LoadingOverlay from "react-loading-overlay";
import "./ViewTaskDetails.css";
import Server from "../../../ServerPath";
import io from "socket.io-client";
const socket = io.connect(Server);
class ViewTaskDetails extends Component {
  state = {
    loader: false,
    task: {
      sub_tasks: [],
      comments: [],
      members: [],
      attachments: [],
    },
    task_id: null,
    project_id: null,
    user_id: null,
    leader_id: null,
  };

  commentFormRef = React.createRef();

  onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  componentDidMount = () => {
    this.setState({
      task: this.props.task,
      user_id: this.props.user_id,
      task_id: this.props.task._id,
      project_id: this.props.project_id,
      leader_id: this.props.leader_id,
    });
    socket.emit("joinTheTaskRoom", { _id: this.props.task._id });
    socket.on("updateTaskData", () => {
      this.updateTask();
    });
  };

  updateTask = async () => {
    try {
      await this.props.getTaskData({ _id: this.state.task._id });
      this.setState({
        task: this.props.taskData.data,
      });
      message.info("Data Updated!");
    } catch (e) {
      console.log(e);
    }
  };

  componentWillUnmount = () => {
    socket.emit("leaveTheTaskRoom", { _id: this.props.task._id });
  };

  tellServerToUpdateData = () => {
    socket.emit("tellRoomMatesToUpdateTask", { _id: this.props.task._id });
    this.props.updateProject();
  };

  onFinish = async (values) => {
    let data = {
      message: values.message,
      member_id: this.props.user_id,
      task_id: this.state.task._id,
      project_id: this.props.project_id,
    };

    try {
      this.setState({ loader: true });
      await this.props.addComment(data);
      // let response = this.props.response;

      this.tellServerToUpdateData();

      this.setState({ loader: false });
      message.success("Added!");
      this.commentFormRef.current.resetFields();
    } catch (error) {
      this.setState({ loader: false });

      message.error("Some Problem Occur!");
    }
  };

  ifPresent = (array, _id) => {
    let found = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i]._id === _id) {
        found = true;
        break;
      }
    }
    return found;
  };

  ifPresentIndex = (array, _id) => {
    let index = -1;
    for (let i = 0; i < array.length; i++) {
      if (array[i]._id === _id) {
        index = i;
        break;
      }
    }
    return index;
  };

  displayMasterButtonOnCertainConditions = () => {
    if (this.state.task.status === "in-progress") {
      if (this.ifPresent(this.state.task.members, this.state.user_id)) {
        let memberIndex = this.ifPresentIndex(
          this.state.task.members,
          this.state.user_id
        );
        if (
          this.state.task.members[memberIndex].task_status === "in-progress"
        ) {
          return (
            <Button
              className="buttonMaster"
              type="primary"
              onClick={async () => {
                try {
                  let data = {
                    _id: this.state.task_id,
                    member_id: this.state.task.members[memberIndex]._id,
                    project_id: this.state.project_id,
                    status: "pending",
                  };
                  console.log("====================================");
                  console.log(data);
                  console.log("====================================");
                  this.setState({ loader: true });
                  await this.props.updateTaskStatus(data);
                  this.tellServerToUpdateData();
                  this.setState({ loader: false });
                } catch (e) {
                  message.error("Some Problem Occur!");
                  this.setState({ loader: false });
                }
              }}
            >
              Push
            </Button>
          );
        } else if (
          this.state.task.members[memberIndex].task_status === "pending"
        ) {
          return (
            <Button
              disabled={true}
              className="buttonMaster"
              type="primary"
              onClick={() => {}}
            >
              Pending
            </Button>
          );
        }
      }
    }
    if (
      this.state.user_id === this.state.leader_id &&
      this.state.task.status === "pending"
    ) {
      return (
        <div>
          <div>
            <Button
              className="buttonMaster"
              type="primary"
              onClick={async () => {
                try {
                  let data = {
                    _id: this.state.task_id,
                    project_id: this.state.project_id,
                    status: "in-progress",
                  };
                  this.setState({ loader: true });
                  await this.props.updateTaskStatusLeader(data);
                  this.tellServerToUpdateData();
                  this.setState({ loader: false });
                } catch (e) {
                  message.error("Some Problem Occur!");
                  this.setState({ loader: false });
                }
              }}
            >
              Back
            </Button>
          </div>
          <div>
            <Button
              className="buttonMaster"
              type="primary"
              onClick={async () => {
                try {
                  let data = {
                    _id: this.state.task_id,
                    project_id: this.state.project_id,
                    status: "done",
                  };
                  this.setState({ loader: true });
                  await this.props.updateTaskStatusLeader(data);
                  this.tellServerToUpdateData();
                  this.setState({ loader: false });
                } catch (e) {
                  message.error("Some Problem Occur!");
                  this.setState({ loader: false });
                }
              }}
            >
              Forward
            </Button>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <LoadingOverlay
        styles={{
          overlay: (base) => ({
            ...base,
            borderRadius: "2rem",
          }),
        }}
        active={this.state.loader}
        spinner
        text="Processing..."
      >
        <Row className="ViewTaskDetails">
          <Col span={24} className="modalTitle">
            {this.state.task.name}
          </Col>
          <Col span={24} className="statusContainer">
            <b className="titleStyle">Status:</b>
            <span style={{ textTransform: "capitalize" }}>
              <b className="titleStyle"> {this.state.task.status}</b>
            </span>
          </Col>
          <Col span={24} className="statusContainer">
            <span>
              <b className="titleStyle">
                <TimeAgo date={this.state.task.due_date} />
              </b>
            </span>
          </Col>
          <Col span={16} className="colDesign">
            <Row className="viewTaskDetails">
              <Col span={24} className="otherContainers">
                <b className="titleStyle">Name: </b>
                <div className="innerContainers"> {this.state.task.name} </div>
              </Col>
              <Col span={24} className="otherContainers">
                <b className="titleStyle">Description: </b>
                <div className="innerContainers">
                  {this.state.task.description}
                </div>
              </Col>
              <Col span={24} className="subTaskContainer">
                <Row>
                  <Col span={12} style={{ marginTop: "0.8rem" }}>
                    <b className="titleStyle">Subtask </b>
                  </Col>
                  <Col span={12}>
                    <Button
                      className="addSubTaskButton"
                      type="link"
                      onClick={this.addSubTask}
                    >
                      <PlusCircleOutlined />
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row className="subTaskDesign">
                  <Col span={24}>
                    <Progress strokeWidth={15} percent={67} />
                  </Col>
                  {this.state.task.sub_tasks.map((sub_tasks) => (
                    <Col span={24}>
                      <Checkbox onChange={this.onChange}>
                        {sub_tasks.name}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col span={24} className="otherContainers">
                <b className="titleStyle">Comments: </b>
                <Form
                  name="postComment"
                  onFinish={this.onFinish}
                  className="commentForm"
                  ref={this.commentFormRef}
                >
                  <Row>
                    <Col span={17}>
                      <Form.Item
                        name="message"
                        rules={[
                          {
                            required: true,
                            message: "Comment can't be empty!",
                          },
                        ]}
                      >
                        <Input className="commentInput" />
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item>
                        <Button
                          className="commentButton"
                          type="primary"
                          htmlType="submit"
                        >
                          Post
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                <div className="allComments">
                  {this.state.task.comments
                    .slice(0)
                    .reverse()
                    .map((comments, index) => (
                      <Row className="commentContainer">
                        <Col span={3}>
                          <Avatar
                            style={{
                              color: "#f56a00",
                              backgroundColor: "#fde3cf",
                            }}
                          >
                            {comments.member.name.substring(0, 1)}
                          </Avatar>
                        </Col>
                        <Col span={21}>
                          <div>
                            <span className="commenterName">
                              {comments.member.name}
                            </span>
                            <span>
                              (
                              <TimeAgo date={comments.createdAt} />)
                            </span>
                          </div>
                          <div className="actualComment">
                            {" "}
                            {comments.message}
                          </div>
                        </Col>
                      </Row>
                    ))}
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={8} className="colDesign">
            <Row className="viewTaskDetails">
              <Col span={24} className="otherContainers">
                <b className="titleStyle">Members: </b>
                <ul style={{ paddingLeft: "1rem" }}>
                  {this.state.task.members.map((members) => {
                    return (
                      <li className="membersAttachmentDesign">
                        {members.member.name}({members.task_status})
                      </li>
                    );
                  })}
                </ul>
              </Col>

              <Col span={24} className="otherContainers">
                <b className="titleStyle">Attachment: </b>
                {this.state.task.attachments.map((attachments) => (
                  <div className="membersAttachmentDesign">
                    {attachments.name}
                  </div>
                ))}
              </Col>

              <Col span={24}>
                <Upload.Dragger
                  name="files"
                  action="/upload.do"
                  className="draggerDesign"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Upload Attachment(s)</p>
                </Upload.Dragger>
              </Col>

              <Col span={24} className="buttonMasterContainer">
                {this.displayMasterButtonOnCertainConditions()}
              </Col>
            </Row>
          </Col>
        </Row>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => ({
  response: state.addComment,
  taskData: state.taskData,
  updateStatus: state.updateTaskStatus,
  updateStatusLeader: state.updateTaskStatusLeader,
});

const mapDispatchToProps = {
  addComment,
  getTaskData,
  updateTaskStatus,
  updateTaskStatusLeader,
};
ViewTaskDetails = connect(mapStateToProps, mapDispatchToProps)(ViewTaskDetails);

export default ViewTaskDetails;
