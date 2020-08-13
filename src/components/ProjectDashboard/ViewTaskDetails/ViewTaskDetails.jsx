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
  Empty,
  Tooltip,
  DatePicker,
  Typography,
  Dropdown,
} from "antd";
import { connect } from "react-redux";
import {
  InboxOutlined,
  PlusCircleOutlined,
  CloseCircleOutlined,
  FormOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { addComment } from "../../../Actions/addCommentAction";
import { getTaskData } from "../../../Actions/TaskDataAction";
import { updateTaskStatus } from "../../../Actions/UpdateTaskStatusAction";
import { updateTaskStatusLeader } from "../../../Actions/UpdateTaskStatusLeaderAction";
import { addSubTask } from "../../../Actions/AddSubTaskAction";
import { updateSubTaskStatus } from "../../../Actions/UpdateSubTaskStatusAction";
import { subscribeTheTask } from "../../../Actions/AddSubscriberAction";
import { unsubscribeTheTask } from "../../../Actions/RemoveSubscriberAction";
import { updateTask } from "../../../Actions/UpdateTaskAction";
import { addMemberToTask } from "../../../Actions/AddMemberToTaskAction";
import LoadingOverlay from "react-loading-overlay";
import "./ViewTaskDetails.css";
import Server from "../../../ServerPath";
import io from "socket.io-client";
import moment from "moment";
const socket = io.connect(Server);
const { TextArea } = Input;
const { Paragraph } = Typography;
class ViewTaskDetails extends Component {
  state = {
    loader: false,
    task: {
      sub_tasks: [],
      comments: [],
      members: [],
      attachments: [],
      subscriber: [],
    },
    task_id: null,
    project_id: null,
    user_id: null,
    leader_id: null,
    project_members: [],
    members_can_be_added_to_task: [],
    add_subtask_modal: false,
    percentage_of_sub_tasks_completion: 0,
    files_view_modal: false,
    file_path: "",
    file_type: "",
    edit_name: false,
    edit_description: false,
    edit_due_date: false,
    edited_name: "",
    edited_description: "",
    edited_due_date: "",
  };

  commentFormRef = React.createRef();

  componentDidMount = () => {
    this.setState({
      task: this.props.task,
      user_id: this.props.user_id,
      task_id: this.props.task._id,
      project_id: this.props.project_id,
      leader_id: this.props.leader_id,
      project_members: this.props.project_members,
    });
    socket.emit("joinTheTaskRoom", { _id: this.props.task._id });
    socket.on("updateTaskData", () => {
      this.updateTask();
    });
    let sub_tasks = this.props.task.sub_tasks;
    let total_sub_tasks = sub_tasks.length;
    let total_done_sub_tasks = 0;
    for (let i = 0; i < sub_tasks.length; i++) {
      const element = sub_tasks[i];
      if (element.status === "done") {
        total_done_sub_tasks++;
      }
    }
    let percentage_of_sub_tasks_completion =
      (total_done_sub_tasks * 100) / total_sub_tasks;

    const members_can_be_added_to_task = this.props.project_members.filter(
      ({ _id: id1 }) =>
        !this.props.task.members.some(({ _id: id2 }) => id2 === id1)
    );
    this.setState({
      percentage_of_sub_tasks_completion: parseInt(
        percentage_of_sub_tasks_completion
      ),
      members_can_be_added_to_task,
    });
  };

  updateTask = async () => {
    try {
      await this.props.getTaskData({ _id: this.state.task._id });
      this.setState({
        task: this.props.taskData.data,
      });
      let sub_tasks = this.state.task.sub_tasks;
      let total_sub_tasks = sub_tasks.length;
      let total_done_sub_tasks = 0;
      for (let i = 0; i < sub_tasks.length; i++) {
        const element = sub_tasks[i];
        if (element.status === "done") {
          total_done_sub_tasks++;
        }
      }
      let percentage_of_sub_tasks_completion =
        (total_done_sub_tasks * 100) / total_sub_tasks;

      const members_can_be_added_to_task = this.state.project_members.filter(
        ({ _id: id1 }) =>
          !this.state.task.members.some(({ _id: id2 }) => id2 === id1)
      );
      this.setState({
        percentage_of_sub_tasks_completion: parseInt(
          percentage_of_sub_tasks_completion
        ),
        members_can_be_added_to_task,
      });
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
                if (
                  this.state.task.sub_tasks.length !== 0 &&
                  this.state.percentage_of_sub_tasks_completion !== 100
                ) {
                  message.warning(
                    "Sub Tasks are in-progress, unable to push task!"
                  );
                  return;
                }
                if (this.state.task.pre_req !== null) {
                  if (this.state.task.pre_req.status !== "done") {
                    message.warning(
                      `${this.state.task.pre_req.name} is not done yet! So, you cannot push ${this.state.task.name}`
                    );
                    return;
                  }
                }

                try {
                  let data = {
                    _id: this.state.task_id,
                    member_id: this.state.task.members[memberIndex]._id,
                    project_id: this.state.project_id,
                    status: "pending",
                  };
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

  displaySubUnsubButton = () => {
    if (!this.ifPresent(this.state.task.members, this.state.user_id)) {
      if (!this.ifPresent(this.state.task.subscriber, this.state.user_id)) {
        return (
          <Button
            className="buttonMaster"
            type="primary"
            onClick={this.handleAddSubscriber}
          >
            Subscribe
          </Button>
        );
      }
      if (this.ifPresent(this.state.task.subscriber, this.state.user_id)) {
        return (
          <Button
            className="buttonMaster"
            type="primary"
            onClick={this.handleRemoveSubscriber}
          >
            Unsubscribe
          </Button>
        );
      }
    }
  };

  onChangeUpload = (info) => {
    this.setState({ loader: true });
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
      this.setState({ loader: false });
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
      this.tellServerToUpdateData();
      this.setState({ loader: false });
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      this.setState({ loader: false });
    }
  };

  ifFound = (array, find) => {
    let found = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i].member._id === find) {
        found = true;
        break;
      }
    }
    return found;
  };

  handleAttachmentClick = (file_path, file_name) => {
    window.location = `${Server}/getAttachment/${file_path}/${file_name}`;
    // let path = `${Server}/${file_path}`;
    // let type = path.substring(path.lastIndexOf(".") + 1);

    // console.log("====================================");
    // console.log(type);
    // console.log("====================================");
    // this.setState({ files_view_modal: true, file_path: path, file_type: type });
    // let image = new Image();
    // image.src = path;
    // let w = window.open("");
    // w.document.write(image.outerHTML);
  };

  addSubTask = () => {
    if (this.ifPresent(this.state.task.members, this.state.user_id)) {
      this.setState({ add_subtask_modal: true });
    } else {
      message.info("Only assigned members to this task can add Sub-Tasks!");
    }
  };

  handeladdSubtaskModalCancel = () => {
    this.setState({ add_subtask_modal: false });
  };

  handleFileViewModalCancel = () => {
    this.setState({ files_view_modal: false });
  };

  handleAddSubTask = async (values) => {
    let data = {
      name: values.name,
      description: values.description,
      member_id: this.state.user_id,
      task_id: this.state.task_id,
      project_id: this.state.project_id,
    };
    try {
      this.setState({ loader: true });
      await this.props.addSubTask(data);
      const response = this.props.addSubTaskResponse;
      this.tellServerToUpdateData();
      message.success(response.message);
      this.setState({ loader: false, add_subtask_modal: false });
    } catch (e) {
      this.setState({ loader: false });
      message.error("Some Problem Occur!");
    }
  };

  handleUpdateSubTaskStatus = async (sub_task, status) => {
    console.log("====================================");
    console.log(sub_task, status);
    console.log("====================================");
    let data = {
      _id: sub_task._id,
      status,
    };
    try {
      this.setState({ loader: true });
      await this.props.updateSubTaskStatus(data);
      message.success("Updated Sub Task Status!");
      this.tellServerToUpdateData();
      this.setState({ loader: false });
    } catch (e) {
      this.setState({ loader: false });
      message.error("Some Problem Occur!");
    }
  };

  handleAddSubscriber = async () => {
    let data = {
      _id: this.state.task_id,
      member_id: this.state.user_id,
      project_id: this.state.project_id,
    };
    try {
      this.setState({ loader: true });
      await this.props.subscribeTheTask(data);
      const response = this.props.subscribeTheTaskResponse;
      this.tellServerToUpdateData();
      message.success(response.message);
      this.setState({ loader: false });
    } catch (e) {
      this.setState({ loader: false });
      message.error("Some Problem Occur!");
    }
  };

  handleRemoveSubscriber = async () => {
    let data = {
      _id: this.state.task_id,
      member_id: this.state.user_id,
      project_id: this.state.project_id,
    };
    try {
      this.setState({ loader: true });
      await this.props.unsubscribeTheTask(data);
      const response = this.props.unsubscribeTheTaskResponse;
      this.tellServerToUpdateData();
      message.success(response.message);
      this.setState({ loader: false });
    } catch (e) {
      this.setState({ loader: false });
      message.error("Some Problem Occur!");
    }
  };

  onError = (e) => {
    console.log(e, "error in file-viewer");
  };

  handleUpdateTask = async (name, description, due_date, what_changes) => {
    let data = {
      _id: this.state.task_id,
      name,
      description,
      due_date,
      what_changes,
      project_id: this.state.project_id,
    };
    try {
      this.setState({ loader: true });
      await this.props.updateTask(data);
      const response = this.props.updateTaskResponse;
      this.tellServerToUpdateData();
      // message.success(response.message);
      console.log(response);
      this.setState({ loader: false });
    } catch (e) {
      this.setState({ loader: false });
      message.error("Some Problem Occur!");
    }
  };

  handelUpdateTaskName = async () => {
    if (this.state.edited_name === "") {
      message.warning("Name Cannot be empty!");
      return;
    }
    if (this.state.edited_name === this.state.task.name) {
      return;
    }
    await this.handleUpdateTask(
      this.state.edited_name,
      this.state.task.description,
      this.state.task.due_date,
      "name"
    );
  };

  handelUpdateTaskDescription = async () => {
    if (this.state.edited_description === "") {
      message.warning("Description Cannot be empty!");
      return;
    }
    if (this.state.edited_description === this.state.task.description) {
      return;
    }
    await this.handleUpdateTask(
      this.state.task.name,
      this.state.edited_description,
      this.state.task.due_date,
      "description"
    );
  };

  handelUpdateTaskDueDate = async () => {
    if (this.state.edited_due_date === "") {
      message.warning("Due Date Cannot be empty!");
      return;
    }
    if (this.state.edited_due_date === this.state.task.due_date) {
      return;
    }
    await this.handleUpdateTask(
      this.state.task.name,
      this.state.task.description,
      this.state.edited_due_date,
      "due_date"
    );
  };

  handleAddMember = async (member_id) => {
    let data = {
      _id: this.state.task_id,
      member_id,
      project_id: this.state.project_id,
    };
    try {
      this.setState({ loader: true });
      await this.props.addMemberToTask(data);
      const response = this.props.addMemberToTaskResponse;
      this.tellServerToUpdateData();
      console.log(response);
      message.success("Member Added Successfully!");
      this.setState({ loader: false });
    } catch (e) {
      this.setState({ loader: false });
      message.error("Some Problem Occur!");
    }
  };

  membersDropdownToAdd = () => {
    if (this.state.members_can_be_added_to_task.length !== 0) {
      return (
        <div className="membersDropdownToAddContainer">
          {this.state.members_can_be_added_to_task.map((member) => {
            return (
              <div
                id={member._id}
                className="membersDropdownToAddContainerItem"
                onClick={() => {
                  this.handleAddMember(member._id);
                }}
              >
                <Paragraph ellipsis>
                  <Tooltip title={member.member.name}>
                    {member.member.name}
                  </Tooltip>
                </Paragraph>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="membersDropdownToAddContainerEmpty">
          No Member(s) To Add
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
                {!this.state.edit_due_date ? (
                  <span>
                    {moment(this.state.task.due_date).format("llll")}
                    ( <TimeAgo date={this.state.task.due_date} />)
                  </span>
                ) : (
                  <DatePicker
                    allowClear={false}
                    placeholder="Due Date"
                    showTime={{ format: "HH:mm" }}
                    value={moment(this.state.edited_due_date)}
                    onChange={(e) => {
                      this.setState({
                        edited_due_date: e._d,
                      });
                    }}
                  />
                )}
              </b>
              <Button
                disabled={
                  this.state.task.status === "done" ||
                  this.state.user_id !== this.state.leader_id
                }
                type="link"
                style={{
                  fontSize: "1.4rem",
                  lineHeight: "1.4rem",
                  color: "darkslategray",
                }}
              >
                {!this.state.edit_due_date ? (
                  <Tooltip title="Update Due Date" placement="top">
                    <FormOutlined
                      onClick={() => {
                        this.setState({
                          edited_due_date: this.state.task.due_date,
                          edit_due_date: true,
                        });
                      }}
                    />
                  </Tooltip>
                ) : (
                  <span>
                    <Tooltip title="Cancel" placement="top">
                      <CloseOutlined
                        onClick={() => {
                          this.setState({ edit_due_date: false });
                        }}
                        style={{ marginRight: "0.5rem" }}
                      />
                    </Tooltip>
                    <Tooltip title="Ok" placement="top">
                      <CheckOutlined
                        onClick={async () => {
                          await this.handelUpdateTaskDueDate();
                          this.setState({ edit_due_date: false });
                        }}
                      />
                    </Tooltip>
                  </span>
                )}
              </Button>
            </span>
          </Col>
          <Col span={16} className="colDesign">
            <Row className="viewTaskDetails">
              <Col span={24} className="otherContainers">
                <b className="titleStyle">
                  Name:
                  <Button
                    disabled={
                      this.state.task.status === "done" ||
                      this.state.user_id !== this.state.leader_id
                    }
                    type="link"
                    style={{
                      float: "right",
                      marginRight: "0.5rem",
                      fontSize: "1.4rem",
                      lineHeight: "1.4rem",
                      color: "darkslategray",
                    }}
                  >
                    {!this.state.edit_name ? (
                      <Tooltip title="Edit Task's Name" placement="top">
                        <FormOutlined
                          onClick={() => {
                            this.setState({
                              edited_name: this.state.task.name,
                              edit_name: true,
                            });
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <span>
                        <Tooltip title="Cancel" placement="top">
                          <CloseOutlined
                            onClick={() => {
                              this.setState({ edit_name: false });
                            }}
                            style={{ marginRight: "0.5rem" }}
                          />
                        </Tooltip>
                        <Tooltip title="Ok" placement="top">
                          <CheckOutlined
                            onClick={async () => {
                              await this.handelUpdateTaskName();
                              this.setState({ edit_name: false });
                            }}
                          />
                        </Tooltip>
                      </span>
                    )}
                  </Button>
                </b>
                {!this.state.edit_name ? (
                  <div className="innerContainers">{this.state.task.name}</div>
                ) : (
                  <div className="innerContainers">
                    <Input
                      bordered={false}
                      value={this.state.edited_name}
                      onChange={(e) => {
                        this.setState({ edited_name: e.target.value });
                      }}
                      onPressEnter={async () => {
                        await this.handelUpdateTaskName();
                        this.setState({ edit_name: false });
                      }}
                    />
                  </div>
                )}
              </Col>
              <Col span={24} className="otherContainers">
                <b className="titleStyle">
                  Description:
                  <Button
                    disabled={
                      this.state.task.status === "done" ||
                      this.state.user_id !== this.state.leader_id
                    }
                    type="link"
                    style={{
                      float: "right",
                      marginRight: "0.5rem",
                      fontSize: "1.4rem",
                      lineHeight: "1.4rem",
                      color: "darkslategray",
                    }}
                  >
                    {!this.state.edit_description ? (
                      <Tooltip title="Edit Task's Description" placement="top">
                        <FormOutlined
                          onClick={() => {
                            this.setState({
                              edited_description: this.state.task.description,
                              edit_description: true,
                            });
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <span>
                        <Tooltip title="Cancel" placement="top">
                          <CloseOutlined
                            onClick={() => {
                              this.setState({ edit_description: false });
                            }}
                            style={{ marginRight: "0.5rem" }}
                          />
                        </Tooltip>
                        <Tooltip title="Ok" placement="top">
                          <CheckOutlined
                            onClick={async () => {
                              await this.handelUpdateTaskDescription();
                              this.setState({ edit_description: false });
                            }}
                          />
                        </Tooltip>
                      </span>
                    )}
                  </Button>
                </b>
                {!this.state.edit_description ? (
                  <div className="innerContainers">
                    <Paragraph
                      ellipsis={{ rows: 4, expandable: true, symbol: "more" }}
                      style={{
                        padding: "0",
                        margin: "0",
                        textAlign: "justify",
                      }}
                    >
                      {this.state.task.description}
                    </Paragraph>
                  </div>
                ) : (
                  <div className="innerContainers">
                    <Input.TextArea
                      rows={4}
                      bordered={false}
                      value={this.state.edited_description}
                      onChange={(e) => {
                        this.setState({
                          edited_description: e.target.value,
                        });
                      }}
                    />
                  </div>
                )}
              </Col>
              <Col span={24} className="subTaskContainer">
                <Row>
                  <Col span={12} style={{ marginTop: "0.8rem" }}>
                    <b className="titleStyle">Subtask </b>
                  </Col>
                  <Col span={12}>
                    <Button
                      disabled={
                        this.state.task.status === "done" ||
                        !this.ifFound(
                          this.state.task.members,
                          this.state.user_id
                        )
                      }
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
                {this.state.task.sub_tasks.length === 0 ? (
                  <div>
                    <Empty
                      imageStyle={{
                        height: 60,
                      }}
                      description={<span>No Sub Tasks</span>}
                    ></Empty>
                    ,
                  </div>
                ) : (
                  <Row className="subTaskDesign">
                    <Col span={24}>
                      <Progress
                        status="active"
                        strokeWidth={12}
                        strokeColor={{
                          "0%": "#ff4d4d",
                          "100%": "#004080",
                        }}
                        percent={this.state.percentage_of_sub_tasks_completion}
                      />
                    </Col>
                    {this.state.task.sub_tasks.map((sub_tasks) => (
                      <Col span={24}>
                        <Tooltip title={sub_tasks.description}>
                          <Checkbox
                            disabled={
                              this.state.task.status === "pending" ||
                              this.state.task.status === "done"
                            }
                            defaultChecked={sub_tasks.status === "done"}
                            onChange={(e) => {
                              let status = "done";
                              if (!e.target.checked) {
                                status = "in-progress";
                              }
                              this.handleUpdateSubTaskStatus(sub_tasks, status);
                            }}
                          >
                            {sub_tasks.name}
                          </Checkbox>
                        </Tooltip>
                      </Col>
                    ))}
                  </Row>
                )}
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
                            src={`${Server}/${comments.member.dp}`}
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
                            <span className="sendTime">
                              (
                              <TimeAgo date={comments.createdAt} />)
                            </span>
                          </div>
                          <div className="actualComment">
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
                <Row style={{ justifyContent: "center", alignItems: "center" }}>
                  <Col span={12}>
                    <b className="titleStyle">Members: </b>
                  </Col>
                  <Col span={12}>
                    <Dropdown
                      trigger={["click"]}
                      overlay={this.membersDropdownToAdd()}
                      placement="topCenter"
                      disabled={
                        this.state.task.status === "done" ||
                        this.state.user_id !== this.state.leader_id
                      }
                    >
                      <Button className="addMemberButton" type="link">
                        <PlusCircleOutlined />
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>

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
                <b className="titleStyle">Attachment(s): </b>
                <div className="attachmentsContainer">
                  {this.state.task.attachments.map((attachments) => {
                    return (
                      <div>
                        <Button
                          style={{ color: "white" }}
                          className="attachmentLink"
                          type="link"
                          onClick={() => {
                            this.handleAttachmentClick(
                              attachments.path,
                              attachments.name
                            );
                          }}
                        >
                          {attachments.name}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </Col>
              <Col span={24}>
                <Upload.Dragger
                  name="file"
                  action={`${Server}/createNewAttachment`}
                  className="draggerDesign"
                  data={{
                    member_id: this.state.user_id,
                    project_id: this.state.project_id,
                    task_id: this.state.task_id,
                  }}
                  onChange={this.onChangeUpload}
                  showUploadList={false}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Upload Attachment(s)</p>
                </Upload.Dragger>
              </Col>
            </Row>
          </Col>
          <Col span={24} className="colDesign">
            <Row>
              <Col span={24} className="buttonMasterContainer">
                {this.displayMasterButtonOnCertainConditions()}
              </Col>
              <Col span={24} className="buttonMasterContainer">
                {this.displaySubUnsubButton()}
              </Col>
            </Row>
          </Col>
        </Row>
        <Modal
          visible={this.state.add_subtask_modal}
          onCancel={this.handeladdSubtaskModalCancel}
          onOk={this.handeladdSubtaskModalCancel}
          width="50vw"
          destroyOnClose
          centered={true}
          bodyStyle={{
            backgroundColor: "steelblue",
          }}
          footer={null}
          closeIcon={
            <CloseCircleOutlined style={{ color: "white", fontSize: "2rem" }} />
          }
        >
          <LoadingOverlay
            styles={{
              overlay: (base) => ({
                ...base,
                borderRadius: "2rem",
              }),
            }}
            active={this.state.loader}
            spinner
            text="Creating The Sub Task..."
          >
            <Form
              name="add_sub_task"
              className="addSubTaskContainer"
              initialValues={{
                remember: true,
              }}
              onFinish={this.handleAddSubTask}
            >
              <Row>
                <Col span={24} className="modalTitle">
                  Add New SubTask
                </Col>
                <Col span={24}>
                  <Form.Item
                    className="formItemAddSubTask"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Required!",
                      },
                    ]}
                  >
                    <Input
                      className="formInputAddSubTask"
                      // prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="SubTask Name..."
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    className="formItemAddSubTask"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Required!",
                      },
                    ]}
                  >
                    <TextArea
                      rows={4}
                      className="formInputAddSubTask"
                      // prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Description..."
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item className="formItemAddSubTask">
                    <Button className="formButtonAddSubTask" htmlType="submit">
                      CREATE
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </LoadingOverlay>
        </Modal>
        <Modal
          visible={this.state.files_view_modal}
          onCancel={this.handleFileViewModalCancel}
          onOk={this.handleFileViewModalCancel}
          width="90vw"
          destroyOnClose
          centered={true}
          bodyStyle={{
            backgroundColor: "steelblue",
            minHeight: "90vh",
          }}
          footer={null}
          closeIcon={
            <CloseCircleOutlined style={{ color: "white", fontSize: "2rem" }} />
          }
        >
          <LoadingOverlay
            styles={{
              overlay: (base) => ({
                ...base,
                borderRadius: "2rem",
              }),
            }}
            active={this.state.loader}
            spinner
            text="Loading...!"
          ></LoadingOverlay>
        </Modal>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => ({
  response: state.addComment,
  taskData: state.taskData,
  updateStatus: state.updateTaskStatus,
  updateStatusLeader: state.updateTaskStatusLeader,
  addSubTaskResponse: state.addSubTask,
  updateSubTaskStatusResponse: state.updateSubTaskStatus,
  subscribeTheTaskResponse: state.subscribeTheTask,
  unsubscribeTheTaskResponse: state.unsubscribeTheTask,
  updateTaskResponse: state.updateTask,
  addMemberToTaskResponse: state.addMemberToTask,
});

const mapDispatchToProps = {
  addComment,
  getTaskData,
  updateTaskStatus,
  updateTaskStatusLeader,
  addSubTask,
  updateSubTaskStatus,
  subscribeTheTask,
  unsubscribeTheTask,
  updateTask,
  addMemberToTask,
};
ViewTaskDetails = connect(mapStateToProps, mapDispatchToProps)(ViewTaskDetails);

export default ViewTaskDetails;
