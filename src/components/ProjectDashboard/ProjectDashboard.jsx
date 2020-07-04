import React from "react";
import { Row, Col } from "antd";
import Navbar from "../Navbar/Navbar";
class ProjectDashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar />
        <Row className="ProjectDashboard">
          <Col span={24}>
              <div className="projectTitle"></div>
          </Col>
          <Col span={24}>
              
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProjectDashboard;
