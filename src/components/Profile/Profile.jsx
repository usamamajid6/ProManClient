import React, { Component } from "react";
import { connect } from "react-redux";
import { message, Avatar, Row, Col, Progress, Collapse, Tabs } from "antd";
import { getUserData } from "../../Actions/userDataAction";
import { CaretRightOutlined } from "@ant-design/icons";
import "./Profile.css";
import Navbar from "../Navbar/Navbar";

const { Panel } = Collapse;
const { TabPane } = Tabs;

class Profile extends Component {
  state = {
    userData: {},
    projects: [],
    teams: [],
    avatar: "",
    efficiency: 0,
  };

  componentDidMount = async () => {
    if (!localStorage.getItem("userId")) {
      this.props.history.push("/login");
      return;
    }
    try {
      await this.props.getUserData({
        _id: parseInt(localStorage.getItem("userId")),
      });
    } catch (error) {
      message.info("Some Problem Occur!");
    }

    this.setState({
      userData: this.props.userData.data.result,
      projects: this.props.userData.data.projects,
      teams: this.props.userData.data.teams,
    });
    let avatar = this.props.userData.data.result.name;
    avatar = avatar.substring(0, 1);
    let efficiency =
      (parseInt(this.state.userData.efficiency_score) /
        parseInt(this.state.userData.total_tasks)) *
      100;
    if (isNaN(efficiency)) {
      efficiency = 0;
    }
    this.setState({ avatar, efficiency });
  };

  callback(key) {
    console.log(key);
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="Profile">
          <Row>
            <Col span={24} style={{ textAlign: "center" }}>
              <Avatar
                size={150}
                style={{
                  color: "blue",
                  backgroundColor: "#80bffa",
                  fontSize: "6rem",
                }}
              >
                {this.state.avatar}
              </Avatar>
            </Col>

            <Col className="mainComponent" span={24}>
              {this.state.userData.name}
            </Col>
            <Col className="innerComponent" span={24}>
              <Col span={24}>{this.state.userData.email} </Col>
              <Col span={24}>{this.state.userData.phone_number}</Col>
              <Col span={24}>
                <span>
                  <b> Efficiency : </b>
                </span>
                {this.state.efficiency}
              </Col>
              <Col span={24}>
                <span>
                  <b>Total Projects : </b>
                </span>
                {this.state.projects.length}
              </Col>
              <Col span={24}>
                <span>
                  <b>Total Tasks : </b>
                </span>
                {this.state.userData.total_tasks}
              </Col>
            </Col>
          </Row>

          <Tabs
            tabBarStyle={{ paddingTop: "2rem" }}
            className="tabStyle"
            size="large"
            tabBarGutter={30}
            // tabPosition="left"
            // type="card"
            centered={true}
          >
            <TabPane tab="Projects" key="1">
              <Row span={24}>
                <Col span={24} className="tabComponent">
                  Projects
                </Col>
                <Col span={24}>
                  {this.state.projects.map((projects) => (
                    <Collapse
                      bordered={false}
                      expandIcon={({ isActive }) => (
                        <CaretRightOutlined rotate={isActive ? 90 : 0} />
                      )}
                    >
                      <Panel header={projects.name}>
                        <div className="paneldescription">
                          {projects.description}
                        </div>
                      </Panel>
                    </Collapse>
                  ))}
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Teams" key="2">
              <Row span={24}>
                <Col className="tabComponent" span={24}>
                  Teams
                </Col>
                <Col span={24}>
                  {this.state.teams.map((teams, index) => (
                    <Collapse
                      bordered={false}
                      expandIcon={({ isActive }) => (
                        <CaretRightOutlined rotate={isActive ? 90 : 0} />
                      )}
                    >
                      <Panel header={teams.name}>
                        <div className="paneldescription">
                          {teams.description}
                        </div>
                      </Panel>
                    </Collapse>
                  ))}
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.userData,
});

const mapDispatchToProps = {
  getUserData,
};

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile;
