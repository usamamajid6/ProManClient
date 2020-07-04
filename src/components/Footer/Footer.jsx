import React, { Component } from "react";
import { Row, Col } from "antd";
import "./Footer.css";
class Footer extends Component {
  state = {};
  render() {
    return (
      <div>
        <Row className="Footer">
          <Col span={24}>
            <div className="mainContainer">
              <div className="mainContent">
                <div>PROMAN</div>
                <div>All Rights Reserved&copy;</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Footer;
