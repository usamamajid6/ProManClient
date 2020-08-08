import React, { Component } from "react";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Table,
  Tag,
  Collapse,
  Progress,
  Modal,
  Form,
  Select,
  Input,
  DatePicker,
  message,
  Typography,
  Tabs,
  Empty,
} from "antd";
import {
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
  ProjectFilled,
  GroupOutlined,
  RadarChartOutlined,
  FundOutlined,
  QrcodeOutlined,
  CaretRightOutlined,
  CloseCircleOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import { getProjectDetailsForLeaderDashboard } from "../../Actions/LeaderDashboardDataAction";
import { updateProjectData } from "../../Actions/UpdateProjectDataAction";
import { connect } from "react-redux";
import "./LeaderDashboard.css";
import LoadingOverlay from "react-loading-overlay";
import Navbar from "../Navbar/Navbar";
import Server from "../../ServerPath";
import io from "socket.io-client";
import UCP from "../UCP/UCP";
import OrgChart from "react-orgchart";
import "react-orgchart/index.css";
import Tree from "react-tree-graph";
import "react-tree-graph/dist/style.css";

const {  Sider, Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;
const socket = io.connect(Server);
const { Panel } = Collapse;
const { Paragraph } = Typography;
const { TabPane } = Tabs;

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

const MyNodeComponent = ({ node }) => {
  return <div className="initechNode">{node.name}</div>;
};

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
    tasks_hierarchy: [],
    collapsed: false,
    panel: "projectDetails",
    loader: false,
    update_project_data_modal: false,
    project_type: "other",
    title: "Project Details",
  };

  updateFormRef = React.createRef();

  componentDidMount = async () => {
    if (!sessionStorage.getItem("userId")) {
      this.props.history.push("/login");
      return;
    }
    if (this.props.project_id === null) {
      this.props.history.push("/userDashboard");
      return;
    }
    this.setState({ loader: true });
    const user_id = parseInt(sessionStorage.getItem("userId"));
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
      });
      // await this.props.getProjectDetailsForLeaderDashboard({
      //   _id: 1,
      // });
    } catch (error) {}
    this.setState({
      project_data: this.props.projectData.data.project,
      overdue_tasks: this.props.projectData.data.overDueTasks,
      upcoming_tasks: this.props.projectData.data.upcomingDeadlines.inDay,
      tasks: this.props.projectData.data.taskByTask,
      task_by_members: this.props.projectData.data.tasksByMembers,
      tasks_hierarchy: this.props.projectData.data.tasksHierarchy,
      // project_type: this.props.projectData.data.project.project_type,
    });
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
    switch (e.key) {
      case "projectDetails":
        this.setState({
          title: "Project Details",
        });
        break;
      case "overview":
        this.setState({
          title: "Project Overview",
        });
        break;
      case "performanceByMember":
        this.setState({
          title: "Performance By Member(s)",
        });
        break;
      case "taskByTask":
        this.setState({
          title: "Task By Task Details",
        });
        break;
      case "tasksByMembers":
        this.setState({
          title: "Task(s) By Member(s) Details",
        });
        break;
      case "tasksHierarchy":
        this.setState({
          title: "Task(s) Hierarchy",
        });
        break;
      default:
        break;
    }
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
            {moment(this.state.project_data.createdAt).format("llll")}
          </Col>
          <Col span={24} className="otherData">
            <b>Project Starting Date: </b>
            {moment(this.state.project_data.start_date).format("llll")}
          </Col>
          <Col span={24} className="otherData">
            <b>Project Ending Date: </b>
            {moment(this.state.project_data.end_date).format("llll")}
          </Col>
          <Col span={24} className="otherData">
            <Button
              type="primary"
              className="editButton"
              onClick={() => {
                this.setState({
                  update_project_data_modal: true,
                });
              }}
            >
              Edit
            </Button>
          </Col>
        </Row>
      </div>
    );
  };

  displayProjectDetailsReDesigned = () => {
    return (
      <div>
        <Row className="ProjectDetailsContainerRD">
          <Col span={24}>
            <Row className="SingleItemContainer">
              <Col span={12}>
                <div className="title">Project Name:</div>
              </Col>
              <Col span={12}>
                <div className="content">{this.state.project_data.name}</div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row className="SingleItemContainer">
              <Col span={12}>
                <div className="title">Project Status:</div>
              </Col>
              <Col span={12}>
                <div className="content">{this.state.project_data.status}</div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row className="SingleItemContainer">
              <Col span={12}>
                <div className="title">Project Leader:</div>
              </Col>
              <Col span={12}>
                <div className="content">
                  {this.state.project_data.leader.name}
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row className="SingleItemContainer">
              <Col span={12}>
                <div className="title">Project Description:</div>
              </Col>
              <Col span={12}>
                <Paragraph
                  className="content"
                  ellipsis={{
                    expandable: true,
                  }}
                >
                  {this.state.project_data.description}
                </Paragraph>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row className="SingleItemContainer">
              <Col span={12}>
                <div className="title">Project Type:</div>
              </Col>
              <Col span={12}>
                <div className="content">
                  {this.state.project_data.project_type}
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row className="SingleItemContainer">
              <Col span={12}>
                <div className="title">Project Cost:</div>
              </Col>
              <Col span={12}>
                <div className="content">{this.state.project_data.cost}</div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row className="SingleItemContainer">
              <Col span={12}>
                <div className="title">Project Creation Date:</div>
              </Col>
              <Col span={12}>
                <div className="content">
                  {" "}
                  {moment(this.state.project_data.createdAt).format("llll")}
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row className="SingleItemContainer">
              <Col span={12}>
                <div className="title">Project Starting Date:</div>
              </Col>
              <Col span={12}>
                <div className="content">
                  {" "}
                  {moment(this.state.project_data.start_date).format("llll")}
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row className="SingleItemContainer">
              <Col span={12}>
                <div className="title">Project Ending Date:</div>
              </Col>
              <Col span={12}>
                <div className="content">
                  {" "}
                  {moment(this.state.project_data.end_date).format("llll")}
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              className="editButtonRD"
              onClick={() => {
                this.setState({
                  update_project_data_modal: true,
                });
              }}
            >
              Edit
            </Button>
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
                  {members.total_tasks}
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
          TASK BY MEMBERS:
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

  tasksHierarchy = () => {
    return (
      <div className="card-container">
        <Tabs type="line" defaultActiveKey="1">
          <TabPane tab="Type A" key="1">
            {this.displayTypeATree()}
          </TabPane>

          <TabPane tab="Type B" key="2">
            {this.displayTypeBTree()}
          </TabPane>
        </Tabs>
      </div>
    );
  };

  displayTypeATree = () => {
    if (this.state.tasks_hierarchy) {
      if (this.state.tasks_hierarchy.length !== 0) {
        return (
          <Row>
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
                {this.state.tasks_hierarchy.map((hierarichal_task, index) => {
                  return (
                    <Panel header={hierarichal_task.name} key={index}>
                      <div id="initechOrgChart">
                        <OrgChart
                          tree={hierarichal_task}
                          NodeComponent={MyNodeComponent}
                        />
                      </div>
                    </Panel>
                  );
                })}
              </Collapse>
            </Col>
          </Row>
        );
      } else {
        return (
          <Empty
            imageStyle={{ height: "inherit", width: "inherit" }}
            description="No Any Task(s)"
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            className="emptyStyles"
          />
        );
      }
    }
  };

  displayTypeBTree = () => {
    if (this.state.tasks_hierarchy) {
      if (this.state.tasks_hierarchy.length !== 0) {
        return (
          <Row>
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
                {this.state.tasks_hierarchy.map((hierarichal_task, index) => {
                  return (
                    <Panel header={hierarichal_task.name} key={index}>
                      <div className="custom-container">
                        <Tree
                          data={hierarichal_task}
                          height={500}
                          width={1000}
                          svgProps={{
                            className: "custom",
                            // transform: "rotate(90)",
                          }}
                          animated
                          // duration={1000}
                          // steps={40}
                        />
                      </div>
                      {/* <div
                        id="treeWrapper"
                        style={{ width: "100vw", height: "100vh" }}
                      >
                        <HTree data={hierarichal_task} />
                      </div> */}
                    </Panel>
                  );
                })}
              </Collapse>
            </Col>
          </Row>
        );
      } else {
        return (
          <Empty
            imageStyle={{ height: "inherit", width: "inherit" }}
            description="No Any Task(s)"
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            className="emptyStyles"
          />
        );
      }
    }
  };

  displayContent = () => {
    if (this.state.panel === "projectDetails") {
      return (
        <div>
          <div className="headTitle">{this.state.title}</div>
          <div>{this.displayProjectDetailsReDesigned()}</div>
        </div>
      );
    }
    if (this.state.panel === "overview") {
      return (
        <div>
          <div className="headTitle">{this.state.title}</div>
          <div>{this.projectOverview()}</div>
        </div>
      );
    }
    if (this.state.panel === "performanceByMember") {
      return (
        <div>
          <div className="headTitle">{this.state.title}</div>
          <Row className="showMember">{this.performanceByMember()}</Row>
        </div>
      );
    }
    if (this.state.panel === "taskByTask") {
      return (
        <div>
          <div className="headTitle">{this.state.title}</div>
          <div>{this.taskByTask()}</div>
        </div>
      );
    }
    if (this.state.panel === "tasksByMembers") {
      return (
        <div>
          <div className="headTitle">{this.state.title}</div>
          <div>{this.taskByMembers()}</div>
        </div>
      );
    }
    if (this.state.panel === "tasksHierarchy") {
      return (
        <div>
          <div className="headTitle">{this.state.title}</div>
          <div>{this.tasksHierarchy()}</div>
        </div>
      );
    }
  };

  handleUpdateProjectDataModalCancel = (e) => {
    this.setState({
      update_project_data_modal: false,
    });
  };

  showUCPOrNot = () => {
    if (this.state.project_type === "software") {
      return <UCP />;
    }
  };

  handleUpdateProject = async (values) => {
    let data = {
      _id: this.state.project_data._id,
      name: values.name,
      description: values.description,
      status: values.status,
      end_date: values.end_date._d,
      project_type: values.project_type,
    };
    if (values.project_type === "other") {
      data.cost = "No Data!";
    }
    if (values.project_type === "software") {
      if (isNaN(this.state.project_data.cost)) {
        if (this.props.ucp.result === "To Be Calculated!") {
          message.warning("First Calculate UCP Then Proceed!");
          return;
        }
        data.cost = this.props.ucp.result;
      } else {
        data.cost = this.state.project_data.cost;
      }
    }
    try {
      this.setState({ loader: true });
      await this.props.updateProjectData(data);
      await this.updateData();
      message.success("Data Updated Successfully!");
      this.setState({ loader: false, update_project_data_modal: false });
    } catch (e) {
      this.setState({ loader: false });
      message.error("Some Problem Occur!");
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
                  defaultSelectedKeys="projectDetails"
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
                  <Menu.Item
                    onClick={() => {
                      //   this.setState({ add_team_modal: true });
                    }}
                    key="tasksHierarchy"
                    icon={<BranchesOutlined />}
                  >
                    Tasks Hierarchy
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
                    <Row className="mainContainer">
                      {/* <Col span={24}>
                        <div className="headTitle">{this.state.title}</div>
                      </Col> */}
                      <Col span={24}>{this.displayContent()}</Col>
                    </Row>
                  </LoadingOverlay>
                </Content>
              </Layout>
            </Layout>
          </Col>
        </Row>
        <Modal
          width="60vw"
          visible={this.state.update_project_data_modal}
          onCancel={this.handleUpdateProjectDataModalCancel}
          onOk={this.handleUpdateProjectDataModalCancel}
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
              }),
            }}
            active={this.state.loader}
            spinner
            text="Updating Data ..."
          >
            <Form
              name="update_project"
              className="updateProjectContainer"
              scrollToFirstError={true}
              initialValues={{
                remember: true,
                name: this.state.project_data.name,
                description: this.state.project_data.description,
                end_date: moment(this.state.project_data.end_date),
                project_type: this.state.project_data.project_type,
                status: this.state.project_data.status,
              }}
              onFinish={this.handleUpdateProject}
              ref={this.updateFormRef}
            >
              <Row>
                <Col span={24} className="modalTitle">
                  Update Data
                </Col>
                <Col span={24}>
                  <Form.Item
                    className="formItemUpdateProject"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Required!",
                      },
                    ]}
                  >
                    <Input
                      className="formInputUpdateProject"
                      // prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Project Name..."
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    className="formItemUpdateProject"
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
                      className="formInputUpdateProject"
                      // prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Description..."
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    className="formItemUpdateProject"
                    name="end_date"
                    rules={[
                      {
                        required: true,
                        message: "Required!",
                      },
                    ]}
                  >
                    <DatePicker
                      className="formInputUpdateProject"
                      placeholder="Select End Date"
                      // prefix={<LockOutlined className="site-form-item-icon" />}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    className="formItemUpdateProject"
                    name="status"
                    rules={[
                      {
                        required: true,
                        message: "Required!",
                      },
                    ]}
                  >
                    <Select
                      key="3"
                      className="formInputUpdateProject"
                      placeholder="Project Status"
                    >
                      <Option value="in-progress">In Progress</Option>
                      <Option value="done">Done</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    className="formItemUpdateProject"
                    name="project_type"
                    rules={[
                      {
                        required: true,
                        message: "Required!",
                      },
                    ]}
                  >
                    <Select
                      key="2"
                      className="formInputUpdateProject"
                      placeholder="Project Type"
                      onChange={(value) => {
                        this.setState({
                          project_type: value,
                        });
                      }}
                    >
                      <Option value="software">Software Project</Option>
                      <Option value="other">
                        Other(any project other than software) Project
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>{this.showUCPOrNot()}</Col>
                <Col span={24}>
                  <Form.Item className="formItemUpdateProject ">
                    <Button className="formButtonAddProject" htmlType="submit">
                      Update
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </LoadingOverlay>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projectData: state.leaderDashboard,
  project_id: state.projectId,
  updateProjectDataResponse: state.updateProjectData,
  ucp: state.UCP,
});

const mapDispatchToProps = {
  getProjectDetailsForLeaderDashboard,
  updateProjectData,
};

LeaderDashboard = connect(mapStateToProps, mapDispatchToProps)(LeaderDashboard);

export default LeaderDashboard;
