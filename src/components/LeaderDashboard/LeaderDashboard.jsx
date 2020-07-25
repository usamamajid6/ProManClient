import React, { Component, PureComponent } from "react";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Table,
  Tag,
  Space,
  Collapse,
  Progress,
} from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import TimeAgo from "react-timeago";
import moment from "moment";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  ProjectFilled,
  PlusSquareOutlined,
  TeamOutlined,
  GroupOutlined,
  RadarChartOutlined,
  FundOutlined,
  QrcodeOutlined,
  CaretRightOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons";
import { getProjectDetailsForLeaderDashboard } from "../../Actions/LeaderDashboardDataAction";
import { connect } from "react-redux";
import "./LeaderDashboard.css";
import LoadingOverlay from "react-loading-overlay";
import Navbar from "../Navbar/Navbar";
import Server from "../../ServerPath";
import io from "socket.io-client";
const { Column, ColumnGroup } = Table;
const { Header, Sider, Content } = Layout;
const socket = io.connect(Server);
const { Panel } = Collapse;

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

class LeaderDashboard extends Component {
  state = {
    project_data: {
      leader: {},
      members: [],
    },
    tasks: [],
    overdue_tasks: [],
    task_by_members: [],
    upcoming_tasks: [],
    collapsed: false,
    panel: "projectDetails",
    loader: false,
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
    this.setState({ loader: true });
    const user_id = parseInt(localStorage.getItem("userId"));
    this.setState({ user_id });
    await this.updateData();
    this.setState({ loader: false });

    socket.emit("joinTheProjectRoom", this.state.project_data);

    socket.on("updateProjectData", () => {
      this.updateData();
    });
  };

  updateData = async () => {
    try {
      await this.props.getProjectDetailsForLeaderDashboard({
        _id: parseInt(this.props.project_id.data),
        user_id: this.state.user_id,
      });
      // await this.props.getProjectDetailsForLeaderDashboard({
      //   _id: 1,
      //   user_id: 10,
      // });
    } catch (error) {}
    this.setState({
      project_data: this.props.projectData.data.project,
      overdue_tasks: this.props.projectData.data.overDueTasks,
      upcoming_tasks: this.props.projectData.data.upcomingDeadlines.inDay,
      tasks: this.props.projectData.data.taskByTask,
      task_by_members: this.props.projectData.data.tasksByMembers,
    });
    console.log(this.props.projectData);
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  handleClick = (e) => {
    this.setState({ panel: e.key });
  };

  displayProjectDetails = () => {
    return (
      <div>
        <Row className="mainHeading">
          <Col span={24}>
            <b> Project Name: </b>
            {this.state.project_data.name}
          </Col>
          <Col span={24}>
            <b>Project Status: </b>
            {this.state.project_data.status}
          </Col>
        </Row>

        <Row>
          <Col span={24} className="otherData">
            <b>Leader Name: </b> {this.state.project_data.leader.name}
          </Col>
          <Col span={24} className="otherData">
            <b>Project Description: </b>
            {this.state.project_data.description}
          </Col>
          <Col span={24} className="otherData">
            <b>Project Type: </b>
            {this.state.project_data.project_type}
          </Col>
          <Col span={24} className="otherData">
            <b>Project Cost: </b>
            {this.state.project_data.cost}
          </Col>
          <Col span={24} className="otherData">
            <b>Project Creation Date: </b>
            {moment(this.state.project_data.createdAt).format("L")}
          </Col>
          <Col span={24} className="otherData">
            <b>Project Starting Date: </b>
            {moment(this.state.project_data.start_date).format("L")}
          </Col>
          <Col span={24} className="otherData">
            <b>Project Ending Date: </b>
            {moment(this.state.project_data.end_date).format("L")}
          </Col>
        </Row>
      </div>
    );
  };

  projectOverview = () => {
    return (
      <div>
        <Row>
          <Col className="overviewHeading" span={24}>
            MEMBER-EFFICIENCY GRAPH:
            {/* <LineChart
              width={1000}
              height={500}
              data={this.state.project_data.members}
              margin={{
                top: 15,
                right: 40,
                left: 20,
                bottom: 15,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="member.name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="#8884d8"
                activeDot={{ r: 2 }}
              />
            </LineChart> */}
            <BarChart
              style={{ width: "100vw", height: "100vh", margin: "2rem" }}
              width={1000}
              height={500}
              data={this.state.project_data.members}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="member.name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="efficiency" fill="#8884d8" />
            </BarChart>
          </Col>

          <Col span={24} className="overviewHeading">
            OVERDUE TASKS
            <div>
              <Table
                bordered
                size="small"
                columns={columns}
                dataSource={this.state.overdue_tasks}
                pagination="10"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={24} className="overviewHeading">
            {" "}
            UPCOMING DEADLINES
            <div>
              <Table
                bordered
                size="small"
                columns={columns}
                dataSource={this.state.upcoming_tasks}
                pagination="10"
              />
            </div>
          </Col>
          {/* <Col span={24} className="overviewHeading">
            DAYS OF PROJECT LAUNCHED
            <div className="overviewBigText">
              {moment(this.state.project_data.createdAt, "YYYYMMDD").fromNow()}
            </div>
          </Col> */}
        </Row>
      </div>
    );
  };

  performanceByMember = () => {
    if (this.state.project_data) {
      if (this.state.project_data.members) {
        let members = this.state.project_data.members;
        if (members.length !== 0) {
          return members.map((members, index) => (
            <Col
              lg={index === 0 ? 24 : 8}
              md={index === 0 ? 24 : 12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Row className="memberContainer">
                <Col
                  span={24}
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Progress
                    format={(percent) => `${percent}%`}
                    type="circle"
                    strokeColor={{
                      "0%": "#ff4d4d",
                      "100%": "#004080",
                    }}
                    status="exception"
                    percent={members.efficiency}
                  />
                </Col>

                <Col span={24} className="innerContainer">
                  <b>Name:</b> {members.member.name}{" "}
                </Col>
                <Col span={24} className="innerContainer">
                  <b>Email:</b> {members.member.email}{" "}
                </Col>
                <Col span={24} className="innerContainer">
                  <b>Phone Number:</b> {members.member.phone_number}
                </Col>
                <Col span={24} className="innerContainer">
                  <span>
                    <b> Efficiency : </b>
                  </span>
                  {members.efficiency}%
                </Col>
                <Col span={24} className="innerContainer">
                  <span>
                    <b>Tasks : </b>
                  </span>
                  {members.member.total_tasks}
                </Col>
              </Row>
            </Col>
          ));
        }
      }
    }
  };

  taskByTask = () => {
    return (
      <Row>
        <Col span={24} className="overviewHeading">
          Task By Task
          <div>
            <Table
              // style={{ backgroundColor: "steelblue", color: "white" }}
              bordered
              size="small"
              columns={columns}
              dataSource={this.state.tasks}
              // rowClassName="tableRowClass"
              // className="tableStyles"
              pagination="10"
            />
          </div>
        </Col>
      </Row>
    );
  };

  taskByMembers = () => {
    return (
      <Row>
        <Col span={24} className="overviewHeading">
          TASK BY MEMBERS:{" "}
        </Col>
        <Col span={24}>
          <Collapse
            defaultActiveKey={["0"]}
            ghost
            bordered={false}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            className="site-collapse-custom-collapse"
          >
            {this.state.task_by_members.map((task_by_members, index) => {
              return (
                <Panel header={task_by_members.name} key={index}>
                  <Table
                    bordered
                    size="small"
                    columns={columns}
                    dataSource={task_by_members.tasks}
                    key={index}
                    pagination="10"
                  />
                </Panel>
              );
            })}
          </Collapse>
        </Col>
      </Row>
    );
  };

  displayContent = () => {
    if (this.state.panel === "projectDetails") {
      return <div>{this.displayProjectDetails()}</div>;
    }
    if (this.state.panel === "overview") {
      return <div>{this.projectOverview()}</div>;
    }
    if (this.state.panel === "performanceByMember") {
      return <Row className="showMember">{this.performanceByMember()}</Row>;
    }
    if (this.state.panel === "taskByTask") {
      return <div>{this.taskByTask()}</div>;
    }
    if (this.state.panel === "tasksByMembers") {
      return <div>{this.taskByMembers()}</div>;
    }
  };

  render() {
    return (
      <div>
        <Navbar />
        <Row className="LeaderDashboard">
          <Col span={24}>
            <Layout style={{ minHeight: "100vh" }}>
              <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
              >
                <Menu
                  className="menuContainer"
                  theme="dark"
                  mode="inline"
                  onClick={this.handleClick}
                >
                  <Menu.Item key="projectDetails" icon={<ProjectFilled />}>
                    Project Deatils
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      //   this.setState({ add_project_modal: true });
                    }}
                    key="overview"
                    icon={<RadarChartOutlined />}
                  >
                    Overview
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      //   this.setState({ add_team_modal: true });
                    }}
                    key="performanceByMember"
                    icon={<FundOutlined />}
                  >
                    Performance By Member
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      //   this.setState({ add_team_modal: true });
                    }}
                    key="taskByTask"
                    icon={<QrcodeOutlined />}
                  >
                    Task By Task
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      //   this.setState({ add_team_modal: true });
                    }}
                    key="tasksByMembers"
                    icon={<GroupOutlined />}
                  >
                    Tasks By Members
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Content>
                  <LoadingOverlay
                    styles={{
                      overlay: (base) => ({
                        ...base,
                        minHeight: "100vh",
                      }),
                    }}
                    active={this.state.loader}
                    spinner
                    text="Fetching Data ..."
                  >
                    <div className="mainContainer">{this.displayContent()}</div>
                  </LoadingOverlay>
                </Content>
              </Layout>
            </Layout>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projectData: state.leaderDashboard,
  project_id: state.projectId,
});

const mapDispatchToProps = {
  getProjectDetailsForLeaderDashboard,
};

LeaderDashboard = connect(mapStateToProps, mapDispatchToProps)(LeaderDashboard);

export default LeaderDashboard;
