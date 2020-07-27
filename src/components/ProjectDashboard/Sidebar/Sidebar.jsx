import React, { Component } from "react";
import { Tabs, Row, Col, Timeline, Avatar } from "antd";
import "./Sidebar.css";
import {
  FieldTimeOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Server from "../../../ServerPath";
import moment from "moment";
const { TabPane } = Tabs;
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_data: props.project_data,
      timelines: props.timelines,
      members: props.project_data.members,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      project_data: nextProps.project_data,
      timelines: nextProps.timelines,
      members: nextProps.project_data.members,
    });
  }

  displayTimeline = () => {
    if (this.state.timelines) {
      if (this.state.timelines.length !== 0) {
        return this.state.timelines.map((timeline) => {
          return (
            <Timeline.Item
              color={timeline.type}
              label={moment(timeline.createdAt).format(
                "dddd, MMMM Do YYYY, h:mm a"
              )}
            >
              {timeline.content}
            </Timeline.Item>
          );
        });
      }
    }
  };

  displayMembers = () => {
    if (this.state.members) {
      if (this.state.members.length !== 0) {
        return this.state.members.map((member) => {
          return (
            <Row className="memberContainer">
              <Col span={6}>
                <Avatar
                  style={{
                    backgroundColor: "#87d068",
                  }}
                  src={`${Server}/${member.member.dp}`}
                  icon={<UserOutlined />}
                />
              </Col>
              <Col span={18} className="memberName">
                {member.member.name}
              </Col>
            </Row>
          );
        });
      }
    }
  };
  render() {
    return (
      <Row className="Sidebar">
        <Col span={24}>
          <div>
            <span className="labelStyle">Project Name : </span>
            <span className="projectName"> {this.state.project_data.name}</span>
          </div>
          <div>
            <span className="labelStyle">Lead By : </span>
            <span className="leaderName">
              {this.state.project_data.leader.name}
            </span>
          </div>
        </Col>
        <Col span={24}>
          <Tabs defaultActiveKey="timeline" centered className="tabStyle">
            <TabPane
              tab={
                <span>
                  <FieldTimeOutlined /> Timeline
                </span>
              }
              key="timeline"
            >
              <Timeline reverse={true} mode="alternate">
                {this.displayTimeline()}
              </Timeline>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <TeamOutlined />
                  Members
                </span>
              }
              key="members"
            >
              {this.displayMembers()}
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

export default Sidebar;
