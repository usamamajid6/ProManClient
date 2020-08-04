import React, { Component } from "react";
import { connect } from "react-redux";
import {
  message,
  Avatar,
  Row,
  Col,
  Collapse,
  Tabs,
  Typography,
  Upload,
  Tooltip,
} from "antd";
import { getUserData } from "../../Actions/userDataAction";
import { updateUser } from "../../Actions/UpdateUserAction";
import { updateOrNotNavbar } from "../../Actions/UpdateOrNotNavbarAction";
import { CaretRightOutlined } from "@ant-design/icons";
import "./Profile.css";
import Navbar from "../Navbar/Navbar";
import LoadingOverlay from "react-loading-overlay";
import Server from "../../ServerPath";
import BounceLoader from 'react-spinners/BounceLoader'

const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Text } = Typography;
class Profile extends Component {
  state = {
    userData: {},
    projects: [],
    teams: [],
    avatar: "",
    efficiency: 0,
    loader: false,
  };

  componentDidMount = async () => {
    if (!sessionStorage.getItem("userId")) {
      this.props.history.push("/login");
      return;
    }
    try {
      this.setState({ loader: true });
      await this.loadUserData();
      this.setState({ loader: false });
    } catch (error) {
      message.info("Some Problem Occur!");
    }
  };

  loadUserData = async () => {
    try {
      await this.props.getUserData({
        _id: parseInt(sessionStorage.getItem("userId")),
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
      parseInt(this.state.userData.efficiency_score) /
      parseInt(this.state.userData.total_tasks);
    if (isNaN(efficiency)) {
      efficiency = 0;
    }
    this.setState({ avatar, efficiency });
  };

  callback(key) {
    console.log(key);
  }
  componentDidUpdate = () => {};

  onChangeName = async (name) => {
    try {
      this.setState({ loader: true });
      await this.props.updateUser({
        _id: this.state.userData._id,
        name: name,
        phone_number: this.state.userData.phone_number,
      });
      await this.loadUserData();
      this.setState({ loader: false });
      this.props.updateOrNotNavbar(true);
    } catch (e) {
      this.setState({ loader: false });
      message.error("Some Problem Occur!");
    }
  };

  onChangeNumber = async (number) => {
    if (isNaN(number)) {
      message.warning("Phone Number Must Be In Digits!");
      return;
    }
    try {
      this.setState({ loader: true });
      await this.props.updateUser({
        _id: this.state.userData._id,
        name: this.state.userData.name,
        phone_number: number,
      });
      await this.loadUserData();
      this.setState({ loader: false });
    } catch (e) {
      this.setState({ loader: false });
      message.error("Some Problem Occur!");
    }
  };

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  onChangeUpload = async (info) => {
    this.setState({ loader: true });
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
      this.setState({ loader: false });
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
      await this.loadUserData();
      this.setState({ loader: false });
      this.props.updateOrNotNavbar(true);

      // this.refreshPage();
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      this.setState({ loader: false });
    }
  };

  refreshPage = () => {
    window.location.reload();
  };

  render() {
    return (
      <div>
        <Navbar parent="Profile" />
        <LoadingOverlay
          styles={{
            overlay: (base) => ({
              ...base,
              minHeight: "100vh",
            }),
          }}
          
          active={this.state.loader}
          spinner
          text="Processing..."
        >
          <div className="Profile">
            <Row>
              <Col span={24} style={{ textAlign: "center" }}>
                <Upload
                  name="dp"
                  showUploadList={false}
                  action={`${Server}/uploadDP`}
                  data={{
                    _id: this.state.userData._id,
                  }}
                  beforeUpload={this.beforeUpload}
                  onChange={this.onChangeUpload}
                >
                  <Tooltip title="Change Profile Picture" placement="bottom">
                    <Avatar
                      className="mainAvatar"
                      size={150}
                      src={`${Server}/${this.state.userData.dp}`}
                      style={{
                        color: "blue",
                        backgroundColor: "#80bffa",
                        fontSize: "6rem",
                      }}
                    >
                      {this.state.avatar}
                    </Avatar>
                  </Tooltip>
                </Upload>
              </Col>

              <Col className="mainComponent" span={24}>
                <Text editable={{ onChange: this.onChangeName }}>
                  {this.state.userData.name}
                </Text>
              </Col>
              <Col className="innerComponent" span={24}>
                <Col span={24}>{this.state.userData.email} </Col>
                <Col span={24}>
                  <b>Number : </b>
                  <Text editable={{ onChange: this.onChangeNumber }}>
                    {this.state.userData.phone_number}
                  </Text>
                </Col>
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
        </LoadingOverlay>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.userData,
  updateUserResponse: state.updateUser,
  updateOrNotNavbarState: state.updateOrNotNavbar,
});

const mapDispatchToProps = {
  getUserData,
  updateUser,
  updateOrNotNavbar,
};

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile;
