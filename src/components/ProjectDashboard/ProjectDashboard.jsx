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
  message,
} from "antd";
import Navbar from "../Navbar/Navbar";
import { connect } from "react-redux";
import { getProjectData } from "../../Actions/projectDataAction";
import Board from "./Board/Board";
import "./ProjectDashboard.css";
import AddNewTask from "./AddNewTask/AddNewTask";
import ViewTaskDetails from "./ViewTaskDetails/ViewTaskDetails";
import Icon, {
  MenuFoldOutlined,
  TableOutlined,
  BarcodeOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import Sidebar from "react-sidebar";
import SidebarContent from "./Sidebar/Sidebar";
import AddNewTaskList from "./AddNewTaskList/AddNewTaskList";
import Server from "../../ServerPath";
import io from "socket.io-client";
const socket = io.connect(Server);
const { Panel } = Collapse;

const columns = [
  {
    title: () => {
      return <div>Name</div>;
    },
    dataIndex: "name",
    key: " name",
    align: "center",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: " description",
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
              {member.member.name.toUpperCase()}
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
        {sub_tasks.map((sub_task) => {
          return (
            <Tag color={"orange"} key={sub_task._id}>
              {sub_task.name.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
    align: "center",
  },
];

class ProjectDashboard extends Component {
  state = {
    project_data: {
      leader: {},
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
  };

  componentWillUnmount = () => {
    socket.emit("leaveTheProjectRoom", this.state.project_data);
  };

  componentDidMount = async () => {
    if (!localStorage.getItem("userId")) {
      this.props.history.push("/login");
      return;
    }
    if (this.props.project_id === null) {
      this.props.history.push("/userDashboard");
      return;
    }
    const user_id = parseInt(localStorage.getItem("userId"));
    this.setState({ user_id });
    await this.updateData();

    socket.emit("joinTheProjectRoom", this.state.project_data);

    socket.on("updateProjectData", () => {
      this.updateData();
    });
  };

  updateData = async () => {
    try {
      await this.props.getProjectData({
        _id: parseInt(this.props.project_id.data),
        user_id: this.state.user_id,
      });
      // await this.props.getProjectData({
      //   _id: 46,
      //   user_id: 10,
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
          description="No Any Project(s)"
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
              ,
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
        <Button type="primary" onClick={() => {}}>
          Open Leader Dashboard
        </Button>
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
          <Button type="primary" className="chatButton">
            Chat
          </Button>

          <Col span={24}>
            <Row>
              <Col span={4}>
                <div className="projectTitle">
                  {this.state.project_data.name}
                </div>
              </Col>
              <Col span={10}></Col>
              <Col span={4} className="leaderButton">
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
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project_id: state.projectId,
  project_data: state.projectData,
});

const maptDispatchToProps = {
  getProjectData,
};

ProjectDashboard = connect(
  mapStateToProps,
  maptDispatchToProps
)(ProjectDashboard);

export default ProjectDashboard;
