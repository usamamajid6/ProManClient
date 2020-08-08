import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";
import { Row, Col } from "antd";
import "./Homepage.css";
import svg from "./undraw_quiz_nlyh.svg";
class Homepage extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar parent="Homepage" />
        <Row className="Homepage">
          <Col span={24}>
            <Row className="mainContainer">
              <Col span={12}>
                <div className="mainTitleContainer">
                  <div className="mainTitle">
                    <motion.div
                      initial={{ x: "-50vw" }}
                      animate={{ x: 0 }}
                      transition={{ duration: 1, ease: "linear" }}
                    >
                      PROMAN
                    </motion.div>
                  </div>
                  <div className="subTitle">
                    <motion.div
                      initial={{ y: "-50vw" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, ease: "easeIn", delay: 1 }}
                    >
                      A PROject MANager
                    </motion.div>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="mainImageContainer">
                  <motion.img
                    initial={{ opacity: 0, scale: 2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "linear", delay: 1 }}
                    className="mainImage"
                    src={svg}
                    alt="Illustration"
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Homepage;
