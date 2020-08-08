import React, { Component } from "react";
import {
  Row,
  Col,
  Avatar,
  Button,
  Menu,
  Dropdown,
  message,
  Typography,
  Tooltip,
  Badge,
  notification,
} from "antd";
import {
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateOrNotNavbar } from "../../Actions/UpdateOrNotNavbarAction";
import { getUserData } from "../../Actions/userDataAction";
import { getNotifications } from "../../Actions/GetNotificationsAction";
import { markNotificationsAsRead } from "../../Actions/MarkNotificationsAsReadAction";
import alertSound from "../../Audio/alert.mp3";
import "./Navbar.css";
import logo from "../../Images/logo1.png";
import Server from "../../ServerPath";
const { Paragraph } = Typography;
const notificationSound = new Audio(alertSound);
class Navbar extends Component {
  state = {
    login_status: false,
    userData: {},
    user_id: null,
    notifications: [],
    unReadNotifications: 0,
    updateOrNot: false,
    latest_current_notification_id: 0,
    notification_loader: false,
    interval: null,
  };

  componentDidMount = async () => {
    if (!sessionStorage.getItem("userId")) {
      // this.props.history.push("/login");
      this.setState({
        login_status: false,
      });
      // return;
    } else {
      await this.loadData();
      this.setState({
        interval: setInterval(async () => {
          await this.loadNotifications();
        }, 2000),
      });
    }
  };

  componentDidUpdate = async () => {
    if (this.props.updateOrNotNavbarState) {
      if (sessionStorage.getItem("userId")) {
        await this.loadData();
        this.props.updateOrNotNavbar(false);
      }
    }
  };

  componentWillUnmount = () => {
    clearInterval(
      this.setState({
        interval: clearInterval(this.state.interval),
      })
    );
  };

  loadData = async () => {
    try {
      await this.props.getUserData({
        _id: parseInt(sessionStorage.getItem("userId")),
      });
      this.setState({
        login_status: true,
        userData: this.props.userData,
        user_id: parseInt(sessionStorage.getItem("userId")),
      });
      if (!this.state.userData.data.result.isVerified) {
        this.props.history.push("/notVerified");
      }
      if (this.state.userData.data.result.phone_number === "") {
        message.info("Phone Number Required!");
        this.props.history.push("/profile");
      }
    } catch (error) {
      message.info("Some Problem Occur!");
    }
  };

  loadNotifications = async () => {
    if (sessionStorage.getItem("userId")) {
      try {
        this.setState({ notification_loader: true });
        await this.props.getNotifications({
          member_id: this.state.user_id,
          latest_current_notification_id: this.state
            .latest_current_notification_id,
        });

        this.setState({
          unReadNotifications: this.props.notifications.data.unread,
          notifications: this.props.notifications.data.notifications,
        });

        if (this.state.notifications.length > 0) {
          this.setState({
            latest_current_notification_id: this.state.notifications[0]._id,
          });
        }
        this.setState({ notification_loader: false });
        // console.log("====================================");
        // console.log(this.props.notifications.data);
        // console.log("====================================");
        if (this.props.notifications.data.latest.length > 0) {
          for (
            let i = 0;
            i < this.props.notifications.data.latest.length;
            i++
          ) {
            const element = this.props.notifications.data.latest[i];
            this.displayNotification(element.name, element.description);
          }
        }
      } catch (e) {
        console.log("====================================");
        console.log("Some Problem Occur!", e);
        console.log("====================================");
        this.setState({ notification_loader: false });
      }
    }
  };

  displayUserDropdown = () => {
    return (
      <Menu>
        <Menu.Item>
          <Button
            type="link"
            onClick={() => {
              this.props.history.push("/Profile");
            }}
          >
            <UserOutlined /> PROFILE
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            onClick={() => {
              this.props.history.push("/userDashboard");
            }}
            type="link"
          >
            <AppstoreOutlined /> DASHBOARD
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            onClick={() => {
              this.props.history.push("/logout");
            }}
            type="link"
          >
            <LogoutOutlined /> LOGOUT
          </Button>
        </Menu.Item>
      </Menu>
    );
  };

  displayUserRelatedNavItems = () => {
    if (this.state.login_status) {
      return (
        <Row>
          <Col span={13}>
            <div className="navItem">
              <div>
                <Paragraph className="navName" ellipsis>
                  <Tooltip title={this.state.userData.data.result.name}>
                    {this.state.userData.data.result.name}
                  </Tooltip>
                </Paragraph>
              </div>
            </div>
          </Col>
          <Col span={3}>
            <div className="navItem" style={{ marginTop: "0.7rem" }}>
              <Badge
                count={this.state.unReadNotifications}
                offset={[-20, 5]}
                style={{
                  backgroundColor: "#52c41a",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  paddingRight: "0.2rem",
                  paddingLeft: "0.1rem",
                  border: "none",
                }}
              >
                <div className="navNotification">
                  <Dropdown
                    overlay={this.notificationBox()}
                    placement="bottomLeft"
                    trigger={["click"]}
                  >
                    <BellOutlined
                      className="onHoverPointer"
                      onClick={async () => {
                        try {
                          if (this.state.unReadNotifications !== 0) {
                            await this.props.markNotificationsAsRead({
                              member_id: this.state.user_id,
                            });
                          }
                        } catch (e) {}
                      }}
                    />
                  </Dropdown>
                </div>
              </Badge>
            </div>
          </Col>
          <Col span={4}>
            <div className="navItem">
              <Dropdown
                overlay={this.displayUserDropdown()}
                placement="bottomCenter"
              >
                <Avatar
                  className="onHoverPointer"
                  src={`${Server}/${this.state.userData.data.result.dp}`}
                  size={50}
                  style={{ color: "purple", backgroundColor: "lightblue" }}
                >
                  {this.state.userData.data.result.name.substring(0, 1)}
                </Avatar>
              </Dropdown>
            </div>
          </Col>
          <Col span={4}></Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col span={24}>
            <div className="navItem">
              <div className="navContent">
                <Button
                  onClick={() => {
                    this.props.history.push("/login");
                  }}
                  className="navLink"
                  type="link"
                >
                  <LoginOutlined /> Login
                </Button>
                |
                <Button
                  onClick={() => {
                    this.props.history.push("/register");
                  }}
                  className="navLink"
                  type="link"
                >
                  <UserAddOutlined /> Register
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      );
    }
  };

  notificationBox = () => {
    if (this.state.notifications.length > 0) {
      return (
        <div className="notificationContainer">
          {this.state.notifications.map((notification, index) => (
            <div id={index}>
              <div className="notification">
                <div className="notificationName">{notification.name}</div>
                <div className="notificationDescription">
                  <Paragraph
                    ellipsis={{ rows: 3, expandable: true, symbol: "more" }}
                  >
                    {notification.description}
                  </Paragraph>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="emptyNotificationBox">No Notification(s) Yet!</div>
      );
    }
  };

  displayNotification = (name, description) => {
    notification.info({
      message: name,
      description,
      placement: "topLeft",
    });
    notificationSound.play();
  };

  render() {
    return (
      <div>
        <Row className="Navbar">
          <Col span={1}></Col>
          <Col span={4}>
            <div className="navItem">
              <img
                onClick={() => {
                  this.props.history.push("/");
                }}
                className="logo"
                src={logo}
                alt="ProMan"
              />
            </div>
          </Col>
          <Col span={2}></Col>
          <Col span={11}></Col>
          <Col span={6}>{this.displayUserRelatedNavItems()}</Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  updateOrNotNavbarState: state.updateOrNotNavbar,
  userData: state.userData,
  notifications: state.getNotifications,
  markAsReadResponse: state.markNotificationsAsRead,
});

const mapDispatchToProps = {
  getUserData,
  updateOrNotNavbar,
  getNotifications,
  markNotificationsAsRead,
};

Navbar = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default withRouter(Navbar);
