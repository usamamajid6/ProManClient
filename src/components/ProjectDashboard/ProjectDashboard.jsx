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
} from "antd";
import Navbar from "../Navbar/Navbar";
import { connect } from "react-redux";
import { getProjectData } from "../../Actions/projectDataAction";
import Board from "./Board/Board";
import "./ProjectDashboard.css";
import Icon, {
  MenuFoldOutlined,
  TableOutlined,
  BarcodeOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import Sidebar from "react-sidebar";
import Homepage from "../Homepage/Homepage";
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
    // ellipsis: true,

    align: "center",
  },
  {
    title: "Pre Requisitte",
    dataIndex: "pre_req",
    key: " pre_req",
    render: (data) => {
      return <div>{data.name}</div>;
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
              {member.name.toUpperCase()}
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

const boardSVG = () => (
  <svg
    enable-background="new 0 0 33.8 21.2"
    version="1.1"
    viewBox="0 0 33.8 21.2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="#231F20">
      <rect y="13" width="5.3" height="8.2" />
      <rect x="7.2" y="3.2" width="5.3" height="18" />
      <rect x="14.3" y="7.9" width="5.3" height="13.4" />
      <rect x="21.4" y="13.4" width="5.3" height="7.9" />
      <rect x="28.5" y="3.8" width="5.3" height="17.4" />
    </g>
  </svg>
);
const BoardIcon = (props) => <Icon component="" {...props} />;

class ProjectDashboard extends Component {
  state = {
    project_data: {},
    data: [],
    view_type: "board",
    sidebar_status: false,
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae ex praesentium harum ipsum iure aut impedit expedita officia facilis quis, tempora architecto voluptatum, hic tenetur quae blanditiis a libero. Consequuntur!",
  };

  componentDidMount = async () => {
    await this.props.getProjectData({
      _id: 1,
      user_id: 1,
    });
    this.setState({
      project_data: this.props.project_data.data.result,
      data: this.props.project_data.data,
    });
    console.log("====================================");
    console.log(this.state.data.taskList);
    console.log("====================================");
  };

  displayProject = () => {
    if (this.state.data.length === 0) {
      return (
        <Empty
          imageStyle={{ height: "inherit", width: "inherit" }}
          description="No Any Project(s)"
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          className="emptyStyles"
        />
      );
    } else if (this.state.view_type === "board") {
      return (
        <Board
          onTaskClick={this.handleTaskClick}
          onAddNewTaskClick={this.handleAddNewTask}
          onAddNewTaskListClick={this.handleAddNewTaskList}
          data={this.state.data.taskList}
        />
      );
    } else if (this.state.view_type === "table") {
      return (
        <div className="tableContainer">
          <Row>
            <Col span={24}>
              <Collapse defaultActiveKey={["0"]} ghost>
                {this.state.data.taskList.map((task_list, index) => {
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
                })}
              </Collapse>
              ,
            </Col>
          </Row>
        </div>
      );
    }
  };

  handleTaskClick = (task) => {
    console.log("====================================");
    console.log(task);
    console.log("====================================");
  };

  handleAddNewTask = (task_list_id) => {
    console.log("====================================");
    console.log(task_list_id);
    console.log("====================================");
  };

  handleAddNewTaskList = () => {
    console.log("====================================");
    console.log("Calls");
    console.log("====================================");
  };

  displayLeaderButton = () => {
    if (true) {
      return <Button type="primary">Open Leader Dashboard</Button>;
    }
  };

  onSetSidebarOpen = (open) => {
    this.setState({ sidebar_status: open });
  };

  render() {
    return (
      <div>
        <Sidebar
          open={this.state.sidebar_status}
          styles={{
            sidebar: { background: "white", width: "20vw", minHeight: "100vh" },
          }}
          onSetOpen={this.onSetSidebarOpen}
          // sidebar={<Homepage />}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
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
