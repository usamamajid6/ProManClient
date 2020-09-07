import React, { Component } from "react";
import TimeAgo from "react-timeago";
import {
  Row,
  Col,
  Empty,
  Button,
  Modal,
  Tooltip,
  Radio,
  Collapse,
  Table,
  Tag,
  Form,
  Input,
  message,
  Avatar,
  Badge,
  Typography,
} from "antd";
import Navbar from "../Navbar/Navbar";
import LoadingOverlay from "react-loading-overlay";
import { connect } from "react-redux";
import { getProjectData } from "../../Actions/projectDataAction";
import { getChatsByProjectId } from "../../Actions/ChatsDataAction";
import { addMemberToProject } from "../../Actions/AddMemberToProjectAction";
import { getUserByEmail } from "../../Actions/GetUserByEmailAction";
import { setProjectId } from "../../Actions/setProjectIdAction";
import Board from "./Board/Board";
import "./ProjectDashboard.css";
import AddNewTask from "./AddNewTask/AddNewTask";
import ViewTaskDetails from "./ViewTaskDetails/ViewTaskDetails";
import {
  MenuFoldOutlined,
  TableOutlined,
  BarcodeOutlined,
  CloseCircleOutlined,
  PlusCircleOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import alertSound from "../../Audio/alert.mp3";
import Sidebar from "react-sidebar";
import SidebarContent from "./Sidebar/Sidebar";
import AddNewTaskList from "./AddNewTaskList/AddNewTaskList";
import Server from "../../ServerPath";
import ScrollToBottom from "react-scroll-to-bottom";
import moment from "moment";
import io from "socket.io-client";
const socket = io.connect(Server);
const { Panel } = Collapse;
const { Paragraph } = Typography;
const notificationSound = new Audio(alertSound);
const columns = [
  {
    title: () => {
      return <div>Name</div>;
    },
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (data) => {
      return <div>{data}</div>;
    },
    ellipsis: true,

    align: "center",
  },
  {
    title: "Pre Requisitte",
    dataIndex: "pre_req",
    key: "pre_req",
    render: (data) => {
      if (data) {
        return <div>{data.name}</div>;
      } else {
        return <div>No Any</div>;
      }
    },
    ellipsis: true,
    align: "center",
  },
  {
    title: "Creation Date",
    dataIndex: "createdAt",
    key: " createdAt",
    sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
    render: (data) => {
      return <TimeAgo date={data} />;
    },
    align: "center",
  },
  {
    title: "Due Date",
    dataIndex: "due_date",
    key: " due_date",
    render: (data) => {
      return <TimeAgo date={data} />;
    },
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: " status",
    render: (data) => {
      let color = "geekblue";
      if (data === "in-progress") {
        color = "volcano";
      }
      if (data === "pending") {
        color = "lightblue";
      }
      return (
        <span>
          <Tag color={color}>{data.toUpperCase()}</Tag>
        </span>
      );
    },
    ellipsis: true,
    align: "center",
    filters: [
      {
        text: "In-Progress",
        value: "in-progress",
      },
      {
        text: "Pending",
        value: "pending",
      },
      {
        text: "Done",
        value: "done",
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
  },
  {
    title: "Members",
    dataIndex: "members",
    key: " members",
    render: (members) => (
      <span>
        {members.map((member) => {
          return (
            <Tag color={"purple"} key={member._id}>
              {member.member.name}
            </Tag>
          );
        })}
      </span>
    ),
    align: "center",
  },
  {
    title: "Sub Tasks",
    dataIndex: "sub_tasks",
    key: " sub_tasks",
    render: (sub_tasks) => (
      <span>
        {sub_tasks.length !== 0 ? (
          sub_tasks.map((sub_task) => {
            return (
              <Tag color={"orange"} key={sub_task._id}>
                {sub_task.name.toUpperCase()}
              </Tag>
            );
          })
        ) : (
          <div>No Any</div>
        )}
      </span>
    ),
    align: "center",
  },
];

class ProjectDashboard extends Component {
  state = {
    project_data: {
      leader: {},
      name: "",
      members: [],
    },
    data: [],
    view_type: "board",
    sidebar_status: false,
    add_new_task_list_modal: false,
    interval: null,
    task_list_id_to_add: null,
    view_task: {},
    user_id: null,
    project_timeline: [],
    chats: [],
    add_member_to_project_modal: false,
    member_data_for_add_member_to_project: {},
    loader: false,
    unReadChatMessages: 0,
  };

  chatFormRef = React.createRef();

  componentWillUnmount = () => {
    socket.emit("leaveTheProjectRoom", this.state.project_data);
  };

  handleClickOnScreen = (e) => {
    if (!e.path.some((path) => path.id === "ChatBox")) {
      this.closeChatBox();
    }
  };

  componentDidMount = async () => {
    document.addEventListener("mousedown", this.handleClickOnScreen, false);
    if (!(sessionStorage.getItem("userId") || localStorage.getItem("userId"))) {
      this.props.history.push("/login");
      return;
    }
    if (this.props.project_id === null) {
      this.props.history.push("/userDashboard");
      return;
    }
    this.setState({ loader: true });
    const user_id = parseInt(
      sessionStorage.getItem("userId") || localStorage.getItem("userId")
    );
    this.setState({ user_id });
    await this.updateData();

    socket.emit("joinTheProjectRoom", this.state.project_data);

    socket.on("updateProjectData", () => {
      this.updateData();
    });

    await this.props.getChatsByProjectId({
      project_id: this.state.project_data._id,
    });
    this.setState({
      chats: this.props.chats.data,
    });
    this.setState({ loader: false });

    socket.on("updateChatsData", (data) => {
      let chats = this.state.chats;
      chats.push(data);
      this.setState({ chats });
      if (data.member._id !== this.state.user_id) {
        notificationSound.play();
        this.setState({
          unReadChatMessages: ++this.state.unReadChatMessages,
        });
      }
    });
  };

  updateData = async () => {
    try {
      await this.props.getProjectData({
        _id: parseInt(this.props.project_id.data),
        user_id: parseInt(
          sessionStorage.getItem("userId") || localStorage.getItem("userId")
        ),
      });
      // await this.props.getProjectData({
      //   _id: 1,
      // });
    } catch (error) {}
    this.setState({
      project_data: this.props.project_data.data.result,
      data: this.props.project_data.data,
      project_timeline: this.props.project_data.data.result.timelines,
    });
  };

  componentWillUnmount = () => {
    socket.emit("leaveTheProjectRoom", this.state.project_data);
  };

  tellServerToUpdateData = () => {
    socket.emit("tellRoomMatesToUpdateProject", this.state.project_data);
  };

  displayProject = () => {
    if (this.state.data.length === 0) {
      return (
        <Empty
          imageStyle={{ height: "inherit", width: "inherit" }}
          description="No Data"
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          // className="emptyStyles"
        />
      );
    } else if (this.state.view_type === "board") {
      return (
        <Board
          id="board"
          onTaskClick={this.handleTaskClick}
          onAddNewTaskClick={this.handleAddNewTask}
          onAddNewTaskListClick={this.handleAddNewTaskList}
          data={this.state.data.taskList}
          leader_id={this.state.project_data.leader._id}
          user_id={this.state.user_id}
        />
      );
    } else if (this.state.view_type === "table") {
      return (
        <div className="tableContainer">
          <Row>
            <Col span={24}>
              <Collapse defaultActiveKey={["0"]} ghost>
                {this.state.data.taskList.length !== 0 ? (
                  this.state.data.taskList.map((task_list, index) => {
                    return (
                      <Panel header={task_list.name} key={index}>
                        <Table
                          // style={{ backgroundColor: "steelblue", color: "white" }}
                          bordered
                          size="small"
                          columns={columns}
                          dataSource={task_list.tasks}
                          key={index}
                          rowClassName="tableRowClass"
                          className="tableStyles"
                          pagination="4"
                        />
                      </Panel>
                    );
                  })
                ) : (
                  <Empty
                    imageStyle={{ height: "inherit", width: "inherit" }}
                    description="No Any Tasks"
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    // className="emptyStyles"
                  />
                )}
              </Collapse>
            </Col>
          </Row>
        </div>
      );
    }
  };

  handleTaskClick = (task) => {
    this.setState({
      view_task: task,
    });
    this.setState({
      view_taskdetails_modal: true,
    });
  };

  handleAddNewTask = (task_list_id) => {
    this.setState({
      task_list_id_to_add: task_list_id,
    });

    this.setState({
      add_new_task_modal: true,
    });
  };

  handleAddNewTaskList = () => {
    this.setState({
      add_new_task_list_modal: true,
    });
  };

  displayLeaderButton = () => {
    if (this.state.user_id === this.state.project_data.leader._id) {
      return (
        <Row>
          <Col span={18}>
            <Button
              type="link"
              onClick={() => {
                this.props.setProjectId(this.state.project_data._id);
                this.props.history.push("/leaderDashboard");
              }}
            >
              Open Leader Dashboard
            </Button>
          </Col>
          <Col span={6}>
            {" "}
            <Button
              style={{
                width: "100%",
                fontSize: "1.3rem",
                lineHeight: "1.3rem",
              }}
              type="link"
              onClick={() => {
                this.setState({
                  add_member_to_project_modal: true,
                });
              }}
            >
              <Tooltip title="Add Member">
                <PlusCircleOutlined />
              </Tooltip>
            </Button>
          </Col>
        </Row>
      );
    }
  };

  onSetSidebarOpen = (open) => {
    this.setState({ sidebar_status: open });
  };

  handelAddNewTaskListModalCancel = (e) => {
    this.setState({
      add_new_task_list_modal: false,
    });
  };

  closeAddNewTaskListModal = () => {
    this.setState({
      add_new_task_list_modal: false,
    });
    this.tellServerToUpdateData();
  };

  updateProjectFormViewTaskDetails = () => {
    this.tellServerToUpdateData();
  };

  handelAddNewTaskModalCancel = (e) => {
    this.setState({
      add_new_task_modal: false,
    });
  };

  closeAddNewTaskModal = () => {
    this.setState({
      add_new_task_modal: false,
    });
    this.tellServerToUpdateData();
  };

  handelViewTaskDetailsCancel = (e) => {
    this.setState({
      view_taskdetails_modal: false,
    });
  };

  closeViewTaskDetailsModal = () => {
    this.setState({
      view_taskdetails_modal: false,
    });
    this.tellServerToUpdateData();
  };

  onChatBoxMessage = async (values) => {
    let data = {
      message: values.message,
      member_id: this.state.user_id,
      project_id: this.state.project_data._id,
    };
    try {
      this.setState({ loader: true });
      socket.emit("addChatMessageToProject", data);

      this.setState({ loader: false });
      // message.success("Added!");
      this.chatFormRef.current.resetFields();
    } catch (error) {
      this.setState({ loader: false });

      // message.error("Some Problem Occur!");
    }
  };

  displayChats = () => {
    if (this.state.chats) {
      if (this.state.chats.length !== 0) {
        const chats = this.state.chats;
        return chats.map((message) => {
          return (
            <Row className="messageContainer">
              <Col span={5}>
                <Avatar
                  style={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                  }}
                >
                  {message.member.name.substring(0, 1)}
                </Avatar>
              </Col>
              <Col span={19}>
                <div>
                  <span className="chaterName">{message.member.name}</span>
                  <span className="sendTime">
                    (
                    <TimeAgo date={message.createdAt} />)
                  </span>
                </div>
                <div className="actualComment">{message.message}</div>
              </Col>
            </Row>
          );
        });
      }
    }
  };

  handleAddMembersToProjectModalOk = () => {
    this.setState({
      add_member_to_project_modal: false,
    });
  };

  handleAddMemberToProject = async (values) => {
    let found = -1;
    for (let i = 0; i < this.state.project_data.members.length; i++) {
      const element = this.state.project_data.members[i];
      if (element.member.email === values.user_email) {
        found = i;
        break;
      }
    }

    if (found !== -1) {
      message.info(
        this.state.project_data.members[found].member.name +
          " is already a member of " +
          this.state.project_data.name +
          "!"
      );
    } else {
      try {
        this.setState({ loader: true });
        await this.props.getUserByEmail({ email: values.user_email });
        const response = this.props.userByEmail;
        if (response.message === "User Not Found!") {
          message.warn(response.message);
        } else {
          this.setState({
            member_data_for_add_member_to_project: response.data,
          });
        }
        this.setState({ loader: false });
      } catch (e) {
        this.setState({ loader: false });

        message.error("Sorry Some Problem Occur!");
      }
    }
  };

  openChatBox = () => {
    document.getElementById("ChatBox").style.display = "block";
  };

  closeChatBox = () => {
    if (document.getElementById("ChatBox")) {
      if (document.getElementById("ChatBox").style.display === "block") {
        this.setState({
          unReadChatMessages: 0,
        });
      }
      document.getElementById("ChatBox").style.display = "none";
    }
  };

  render() {
    return (
      <div>
        <Sidebar
          open={this.state.sidebar_status}
          styles={{
            sidebar: { background: "white", width: "25vw", minHeight: "100vh" },
          }}
          onSetOpen={this.onSetSidebarOpen}
          sidebar={
            <SidebarContent
              project_data={this.state.project_data}
              timelines={this.state.project_timeline}
            />
          }
          transitions={true}
          pullRight={true}
        />
        <Navbar />
        <Row className="ProjectDashboard">
          <Badge
            className="chatButtonContainer"
            count={this.state.unReadChatMessages}
            offset={[-130, 5]}
            style={
              {
                // backgroundColor: "#52c41a",
                // fontWeight: "bold",
                // fontSize: "1.1rem",
                // paddingRight: "0.2rem",
                // paddingLeft: "0.1rem",
                // border: "none",
                // zIndex: "1",
              }
            }
          >
            <Button
              type="primary"
              className="chatButton"
              onClick={() => {
                this.openChatBox();
                this.setState({
                  unReadChatMessages: 0,
                });
              }}
            >
              <CommentOutlined className="chatButtonIcon" />
              Chat
            </Button>
          </Badge>

          <Col span={24}>
            <LoadingOverlay
              styles={{
                overlay: (base) => ({
                  ...base,
                  height: "100vh",
                }),
              }}
              active={this.state.loader}
              spinner
              text="Fetching Data ..."
            >
              <Row>
                <Col span={8}>
                  <div>
                    <Paragraph ellipsis className="projectTitle">
                      {this.state.project_data.name}
                    </Paragraph>
                    {/* {this.state.project_data.name} */}
                  </div>
                </Col>
                <Col span={4}></Col>
                <Col span={6} className="leaderButton">
                  {this.displayLeaderButton()}
                </Col>
                <Col span={4} className="viewClass">
                  <Radio.Group
                    onChange={(e) => {
                      this.setState({ view_type: e.target.value });
                    }}
                    defaultValue={this.state.view_type}
                  >
                    <Radio.Button value="board">
                      <Tooltip title="Board View">
                        <BarcodeOutlined />
                      </Tooltip>
                    </Radio.Button>
                    <Radio.Button value="table">
                      <Tooltip title="Table View">
                        <TableOutlined />
                      </Tooltip>
                    </Radio.Button>
                  </Radio.Group>
                </Col>

                <Col span={2} className="menuClass">
                  <Tooltip title="Open Menu">
                    <MenuFoldOutlined
                      onClick={() => {
                        this.setState({ sidebar_status: true });
                      }}
                    />
                  </Tooltip>
                </Col>
              </Row>
            </LoadingOverlay>
          </Col>
          <Col span={24}>{this.displayProject()}</Col>
        </Row>

        <Modal
          width="60vw"
          visible={this.state.add_new_task_list_modal}
          onCancel={this.handelAddNewTaskListModalCancel}
          onOk={this.handelAddNewTaskListModalCancel}
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
          <AddNewTaskList
            closeAddNewTaskListModal={this.closeAddNewTaskListModal}
            project_id={this.state.project_data._id}
          />
        </Modal>

        <Modal
          width="60vw"
          visible={this.state.add_new_task_modal}
          onCancel={this.handelAddNewTaskModalCancel}
          onOk={this.handelAddNewTaskModalCancel}
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
          <AddNewTask
            closeAddNewTaskModal={this.closeAddNewTaskModal}
            project_id={this.state.project_data._id}
            task_list_id={this.state.task_list_id_to_add}
          />
        </Modal>

        <Modal
          visible={this.state.view_taskdetails_modal}
          onCancel={this.handelViewTaskDetailsCancel}
          onOk={this.handelViewTaskDetailsCancel}
          width="60vw"
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
          <ViewTaskDetails
            closeViewTaskDetailsModal={this.closeViewTaskDetailsModal}
            updateProject={this.updateProjectFormViewTaskDetails}
            project_id={this.state.project_data._id}
            task={this.state.view_task}
            user_id={this.state.user_id}
            leader_id={this.state.project_data.leader._id}
            project_members={this.state.project_data.members}
          />
        </Modal>

        <Modal
          width="60vw"
          visible={this.state.add_member_to_project_modal}
          onOk={this.handleAddMembersToProjectModalOk}
          onCancel={this.handleAddMembersToProjectModalOk}
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
            text="Processing..."
          >
            <Form
              name="add_member_to_project"
              className="addMembersToProject"
              initialValues={{
                remember: true,
              }}
              onFinish={this.handleAddMemberToProject}
            >
              <Row>
                <Col span={24} className="modalTitle">
                  Add Members to {this.state.project_data.name}
                </Col>
                <Col span={24}>
                  <Form.Item
                    className="formItemAddMembersToProject"
                    name="user_email"
                    rules={[
                      {
                        required: true,
                        message: "Required!",
                      },
                    ]}
                  >
                    <Input
                      className="formInputAddMembersToProject"
                      // prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="User Email"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  {Object.keys(this.state.member_data_for_add_member_to_project)
                    .length === 0 ? (
                    <div></div>
                  ) : (
                    <div>
                      <Row className="memberDataInAddMember">
                        <Col span={20}>
                          <span className="memberNameTitle">Name:</span>
                          <span className="memberName">
                            {
                              this.state.member_data_for_add_member_to_project
                                .name
                            }
                          </span>
                        </Col>
                        <Col span={4}>
                          <Button
                            className="addButtonAddMembersToProject"
                            onClick={async () => {
                              let data = {
                                _id: this.state.project_data._id,
                                member_id: this.state
                                  .member_data_for_add_member_to_project._id,
                              };

                              try {
                                this.setState({ loader: true });
                                await this.props.addMemberToProject(data);
                                const response = this.props
                                  .addMemberToProjectResponse;
                                this.setState({
                                  member_data_for_add_member_to_project: {},
                                });
                                await this.updateData();
                                message.success(response.data.message);
                                this.setState({
                                  add_member_to_project_modal: false,
                                });
                                this.setState({ loader: false });
                              } catch (e) {
                                this.setState({ loader: false });
                                message.error("Some Problem Occur!");
                              }
                            }}
                          >
                            Add
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  )}
                </Col>

                <Col span={24}>
                  <Form.Item className="formItemAddMembersToProject">
                    <Button
                      className="formButtonAddMembersToProject"
                      htmlType="submit"
                    >
                      SEARCH
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </LoadingOverlay>
        </Modal>

        <div className="ChatBox" id="ChatBox">
          <Row>
            <Col
              span={22}
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "dodgerBlue",
              }}
            >
              CHAT BOX
            </Col>
            <Col span={2}>
              <Button
                type="link"
                onClick={() => {
                  this.closeChatBox();
                }}
                style={{
                  lineHeight: "2rem",
                  fontSize: "2rem",
                  padding: "0",
                  margin: "0",
                }}
              >
                <CloseCircleOutlined />
              </Button>
            </Col>
          </Row>
          <ScrollToBottom id="sTob" className="chatMessagesContainer">
            {this.displayChats()}
          </ScrollToBottom>

          <div className="sendMessageForm">
            <Form
              name="chatBox"
              onFinish={this.onChatBoxMessage}
              className="commentForm"
              ref={this.chatFormRef}
            >
              <Row>
                <Col span={17}>
                  <Form.Item
                    name="message"
                    rules={[
                      {
                        required: true,
                        message: "Message can't be empty!",
                      },
                    ]}
                  >
                    <Input className="chatInput" />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item>
                    <Button
                      className="chatButton"
                      type="primary"
                      htmlType="submit"
                    >
                      Send
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project_id: state.projectId,
  project_data: state.projectData,
  chats: state.chatsMessages,
  addMemberToProjectResponse: state.addMemberToProject,
  userByEmail: state.userByEmail,
});

const maptDispatchToProps = {
  getProjectData,
  getChatsByProjectId,
  addMemberToProject,
  getUserByEmail,
  setProjectId,
};

ProjectDashboard = connect(
  mapStateToProps,
  maptDispatchToProps
)(ProjectDashboard);

export default ProjectDashboard;
