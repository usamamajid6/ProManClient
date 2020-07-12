import React, { Component } from "react";
import { connect } from "react-redux";
import { message, Avatar, Row, Col, Progress, Collapse, Tabs } from "antd";
import { getUserData } from "../../Actions/userDataAction";
import "./Profile.css";
import Navbar from "../Navbar/Navbar";

const { Panel } = Collapse;
const { TabPane } = Tabs;

class Profile extends Component {
  state = {
    userData: {},
    projects: [],
    teams: [],
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
    console.log(this.props.userData);
    this.setState({
      userData: this.props.userData.data.result,
      projects: this.props.userData.data.projects,
      teams: this.props.userData.data.teams,
    });
    console.log(this.state.userData);
    console.log(this.state.projects);
    console.log(this.state.teams);
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
                  color: "#f56a00",
                  backgroundColor: "#80bffa",
                  fontSize: "5rem",
                }}
              >
                {this.state.userData.name}
              </Avatar>
            </Col>

            <Col className="mainComponent" span={24}>
              {this.state.userData.name}
            </Col>
            <Col className="innerComponent" span={24}>
              <Col span={24}>{this.state.userData.email} </Col>
              <Col span={24}>{this.state.userData.phone_number}</Col>
              <Col span={24}>
                Efficiency:{" "}
                {(this.state.userData.efficiency_score /
                  this.state.userData.total_tasks) *
                  100}
              </Col>
              <Col span={24}>Total Projects: {this.state.projects.length} </Col>
              <Col span={24}>
                Total Tasks: {this.state.userData.total_tasks}
              </Col>
            </Col>
          </Row>

          <Tabs className="tabStyle">
            <TabPane tab="Projects" key="1">
              <Row span={24}>
                <Col span={24} className="tabComponent">
                  Projects
                </Col>
                <Col span={24}>
                  {this.state.projects.map((projects, index) => (
                    <Collapse className="tabInnerComponent">
                      <Panel header={projects.name}></Panel>
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
                    <Collapse className="tabInnerComponent">
                      <Panel header={teams.name}>
                        <p>{teams.description}</p>
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
