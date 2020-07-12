import React, { Component } from "react";
import {
  Layout,
  Menu,
  Modal,
  Row,
  Col,
  Button,
  Empty,
  Form,
  Input,
  DatePicker,
  Select,
  message,
} from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  ProjectFilled,
  PlusSquareTwoTone,
  PlusSquareOutlined,
  LockOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "./UserDashboard.css";
import { connect } from "react-redux";
import UCP from "../UCP/UCP";
import { createNewProject } from "../../Actions/addProjectAction";
import { getUserData } from "../../Actions/userDataAction";
import { createNewTeam } from "../../Actions/addTeamAction";
import { setProjectId } from "../../Actions/setProjectIdAction";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import Navbar from "../Navbar/Navbar";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = "MM-DD-YYYY";
class UserDashboard extends Component {
  state = {
    userData: {},
    collapsed: false,
    searchText: "",
    projects: [],
    orignalProjectsList: [],
    teams: [],
    add_project_modal: false,
    project_type: "",
    loader: false,
    add_team_modal: false,
  };

  componentDidMount = async () => {
    if (!localStorage.getItem("userId")) {
      this.props.history.push("/login");
      return;
    }
    this.setState({ loader: true });
    try {
      await this.props.getUserData({
        _id: parseInt(localStorage.getItem("userId")),
      });
    } catch (error) {
      message.info("Some Problem Occur!");
      this.setState({ loader: false });
    }

    this.setState({
      userData: this.props.userData.data.result,
      projects: this.props.userData.data.projects,
      orignalProjectsList: this.props.userData.data.projects,
      teams: this.props.userData.data.teams,
    });
    this.setState({ loader: false });
  };

  updateUserData = async () => {
    try {
      await this.props.getUserData({
        _id: parseInt(this.state.userData._id),
      });
    } catch (error) {
      message.info("Some Problem Occur!");
    }
    this.setState({
      userData: this.props.userData.data.result,
      projects: this.props.userData.data.projects,
      orignalProjectsList: this.props.userData.data.projects,
      teams: this.props.userData.data.teams,
    });
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  handleSearchProject = async (e) => {
    e.preventDefault();
    let projects = [];
    for (let i = 0; i < this.state.projects.length; i++) {
      const element = this.state.projects[i];
      let project_name = element.name.toUpperCase();
      let result = project_name.search(this.state.searchText.toUpperCase());
      if (result !== -1) {
        projects.push(element);
      }
    }

    this.setState({ projects });
  };

  displayProjects = () => {
    if (this.state.projects.length === 0) {
      return (
        <Empty
          imageStyle={{ height: "inherit", width: "inherit" }}
          description="No Any Project(s)"
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          className="emptyStyles"
        />
      );
    } else {
      return this.state.projects.map((project, index) => {
        return (
          <Col md={24} lg={12}>
            <div className="projectContainer">
              <div className="projectHead">{project.name}</div>
              <div className="projectDescription"> {project.description}</div>
              <div className="projectButton">
                <Button
                  type="primary"
                  onClick={() => {
                    this.props.setProjectId(project._id);
                    this.props.history.push("/projectDashboard");
                  }}
                >
                  Proceed
                </Button>
              </div>
            </div>
          </Col>
        );
      });
    }
  };

  handleTeamClick = (team) => {
    this.setState({
      projects: team.projects,
    });
  };

  displayTeams = () => {
    return this.state.teams.map((team, index) => {
      console.log(team);
      return (
        <Menu.Item
          onClick={() => {
            this.handleTeamClick(team);
          }}
        >
          {team.name}
        </Menu.Item>
      );
    });
  };

  displayTeamsAddProject = () => {
    return this.state.teams.map((team, index) => {
      return <Option value={team._id}>{team.name}</Option>;
    });
  };

  handleAddProjectModalOk = () => {
    this.setState({
      add_project_modal: false,
    });
  };

  handleAddTeamModalOk = () => {
    this.setState({
      add_team_modal: false,
    });
  };

  handleAddProject = async (values) => {
    // console.log(values.date[0]._d);
    let data = {
      name: values.name,
      description: values.description,
      start_date: values.date[0]._d,
      end_date: values.date[1]._d,
      project_type: values.project_type,
      leader_id: parseInt(this.state.userData._id),
      team_id: values.team,
    };
    const ucp_result = this.props.ucp.result;
    if (
      values.project_type === "software" &&
      ucp_result === "To Be Calculated!"
    ) {
      message.error("UCP Must Be Calculated First Then Proceed!");
      return;
    }

    if (this.props.ucp_result !== "To Be Calculated!") {
      data.cost = this.props.ucp_result;
    } else {
      data.cost = "No Info!";
    }

    try {
      this.setState({
        loader: true,
      });
      await this.props.createNewProject(data);

      this.setState({
        loader: false,
        add_project_modal: false,
      });

      message.success(this.props.addProject.message);
      await this.updateUserData();
    } catch (error) {
      this.setState({
        loader: false,
      });
      message.error("Some Problem Ocurr!");
    }
  };

  handleAddTeam = async (values) => {
    let data = {
      name: values.name,
      description: values.description,
      leader_id: parseInt(this.state.userData._id),
    };

    try {
      this.setState({
        loader: true,
      });
      await this.props.createNewTeam(data);

      this.setState({
        loader: false,
        add_team_modal: false,
      });
      message.success(this.props.addTeam.message);
      await this.updateUserData();
    } catch (error) {
      this.setState({
        loader: false,
      });
      message.success("Some Problem Ocurr!");
    }
  };

  handleProjectClick = () => {
    this.setState({ projects: this.state.orignalProjectsList, searchText: "" });
  };

  showUCPOrNot = () => {
    if (this.state.project_type === "software") {
      return <UCP />;
    }
  };

  render() {
    return (
      <div>
        <Navbar />
        <Row className="UserDashboard">
          <Col span={24}>
            <Layout style={{ minHeight: "100vh" }}>
              <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
              >
                <Menu className="menuContainer" theme="dark" mode="inline">
                  <Menu.Item
                    key="projects"
                    onClick={this.handleProjectClick}
                    icon={<ProjectFilled />}
                  >
                    All Project(s)
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      this.setState({ add_project_modal: true });
                    }}
                    key="addprojects"
                    icon={<PlusSquareOutlined />}
                  >
                    Add Project
                  </Menu.Item>
                  <SubMenu
                    key="teams"
                    icon={<TeamOutlined />}
                    title="Project By Team(s)"
                  >
                    {this.displayTeams()}
                  </SubMenu>
                  <Menu.Item
                    onClick={() => {
                      this.setState({ add_team_modal: true });
                    }}
                    key="addteam"
                    icon={<PlusSquareOutlined />}
                  >
                    Add Team
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Content>
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
                      <Col span={24}>
                        <div className="searchProjectContainer">
                          <form className="searchProjectForm">
                            <input
                              className="searchProjectInput"
                              type="text"
                              placeholder="Search Project By Name!"
                              value={this.state.searchText}
                              onChange={(e) => {
                                this.setState({
                                  searchText: e.target.value,
                                });
                                if (e.target.value === "") {
                                  this.setState({
                                    projects: this.state.orignalProjectsList,
                                  });
                                }
                              }}
                            />
                            <Button
                              className="searchProjectButton"
                              type="primary"
                              htmlType="submit"
                              onClick={this.handleSearchProject}
                            >
                              Search
                            </Button>
                          </form>
                        </div>
                      </Col>
                      <Col span={24}>
                        <Row className="projectsContainer">
                          {this.displayProjects()}
                        </Row>
                      </Col>
                    </Row>
                  </LoadingOverlay>
                </Content>
              </Layout>
            </Layout>
          </Col>

          <Col span={24}>
            <Modal
              width="60vw"
              visible={this.state.add_project_modal}
              onOk={this.handleAddProjectModalOk}
              onCancel={this.handleAddProjectModalOk}
              destroyOnClose
              centered={true}
              bodyStyle={{
                backgroundColor: "steelblue",
              }}
              footer={null}
              closeIcon={
                <CloseCircleOutlined
                  style={{ color: "white", fontSize: "2rem" }}
                />
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
                text="Creating The Project..."
              >
                <Form
                  name="add_project"
                  className="addProjectContainer"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={this.handleAddProject}
                >
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        className="formItemAddProject"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Required!",
                          },
                        ]}
                      >
                        <Input
                          className="formInputAddProject"
                          // prefix={<UserOutlined className="site-form-item-icon" />}
                          placeholder="Project Name..."
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        className="formItemAddProject"
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
                          className="formInputAddProject"
                          // prefix={<LockOutlined className="site-form-item-icon" />}
                          placeholder="Description..."
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        className="formItemAddProject"
                        name="date"
                        rules={[
                          {
                            required: true,
                            message: "Required!",
                          },
                        ]}
                      >
                        <RangePicker
                          className="formInputAddProject"
                          format={dateFormat}
                          // prefix={<LockOutlined className="site-form-item-icon" />}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        className="formItemAddProject"
                        name="team"
                        rules={[
                          {
                            required: true,
                            message: "Required!",
                          },
                        ]}
                      >
                        <Select
                          key="1"
                          className="formInputAddProject"
                          placeholder="Select A Team"
                        >
                          <Option value="no-team">No Team</Option>
                          {this.state.teams.map((team, index) => (
                            <Option value={team._id}>{team.name}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        className="formItemAddProject"
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
                          className="formInputAddProject"
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
                      <Form.Item className="formItemAddProject ">
                        <Button
                          className="formButtonAddProject"
                          htmlType="submit"
                        >
                          CREATE
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </LoadingOverlay>
            </Modal>
          </Col>

          <Col span={24}>
            <Modal
              width="60vw"
              visible={this.state.add_team_modal}
              onOk={this.handleAddTeamModalOk}
              onCancel={this.handleAddTeamModalOk}
              destroyOnClose
              centered={true}
              bodyStyle={{
                backgroundColor: "steelblue",
              }}
              footer={null}
              closeIcon={
                <CloseCircleOutlined
                  style={{ color: "white", fontSize: "2rem" }}
                />
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
                text="Creating The Team..."
              >
                <Form
                  name="add_team"
                  className="addTeamContainer"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={this.handleAddTeam}
                >
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        className="formItemAddTeam"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Required!",
                          },
                        ]}
                      >
                        <Input
                          className="formInputAddTeam"
                          // prefix={<UserOutlined className="site-form-item-icon" />}
                          placeholder="Team Name..."
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        className="formItemAddTeam"
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
                          className="formInputAddTeam"
                          // prefix={<LockOutlined className="site-form-item-icon" />}
                          placeholder="Description..."
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item className="formItemAddTeam">
                        <Button className="formButtonAddTeam" htmlType="submit">
                          CREATE
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </LoadingOverlay>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.userData,
  ucp: state.UCP,
  addProject: state.addProject,
  addTeam: state.addTeam,
});

const mapDispatchToProps = {
  createNewProject,
  getUserData,
  createNewTeam,
  setProjectId,
};

UserDashboard = connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
export default UserDashboard;
