import React, { Component } from "react";
import { Layout, Menu, Button, Row, Col } from "antd";
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
} from "@ant-design/icons";
import { getProjectDetailsForLeaderDashboard } from "../../Actions/LeaderDashboardDataAction";
import { connect } from "react-redux";
import "./LeaderDashboard.css";
import LoadingOverlay from "react-loading-overlay";
import Navbar from "../Navbar/Navbar";
import Server from "../../ServerPath";
import io from "socket.io-client";
const { Header, Sider, Content } = Layout;
const socket = io.connect(Server);

class LeaderDashboard extends Component {
  state = {
    project_data: {
      leader: {},
    },
    collapsed: false,
    panel: "projectDetails",
  };
  componentDidMount = async () => {
    if (!localStorage.getItem("userId")) {
      this.props.history.push("/login");
      return;
    }
    // if (this.props.project_id === null) {
    //   this.props.history.push("/userDashboard");
    //   return;
    // }
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
      // await this.props.getProjectData({
      //   _id: parseInt(this.props.project_id.data),
      //   user_id: this.state.user_id,
      // });
      await this.props.getProjectDetailsForLeaderDashboard({
        _id: 46,
        user_id: 10,
      });
    } catch (error) {}
    this.setState({
      project_data: this.props.projectData.data.project,
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
    this.setState({ panel: e.key });
  };

  displayContent = () => {
    if (this.state.panel === "projectDetails") {
      return <div>Project Deatlis</div>;
    }
    if (this.state.panel === "overview") {
      return <div>Overview</div>;
    }
    if (this.state.panel === "performanceByMember") {
      return <div>Performance By Member</div>;
    }
    if (this.state.panel === "taskByTask") {
      return <div>Task By Task</div>;
    }
    if (this.state.panel === "tasksByMembers") {
      return <div>Tasks By Members</div>;
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
                        height: "100vh",
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
});

const mapDispatchToProps = {
  getProjectDetailsForLeaderDashboard,
};

LeaderDashboard = connect(mapStateToProps, mapDispatchToProps)(LeaderDashboard);

export default LeaderDashboard;
