import React, { Component } from "react";
import { connect } from "react-redux";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import "./Login.css";
import { Form, Input, Button, Checkbox, Row, Col, message } from "antd";
import { loginUser, loginUserGoogleFB } from "../../Actions/LoginAction";
import { saveUserData } from "../../Actions/userDataAction";
import Navbar from "../Navbar/Navbar";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import GoogleKey from "../../GoogleKey";
import FBAppID from "../../FBAppID";
import LoadingOverlay from "react-loading-overlay";

const validateMessages = {
  required: "This field is required!",
  types: {
    email: "Not a validate email!",
  },
};

const responseFacebook = (response) => {
  console.log(response);
};

class Login extends Component {
  state = {
    loader: false,
  };
  onFinish = async (values) => {
    try {
      this.setState({ loader: true });
      await this.props.loginUser(values);
      let response = this.props.response;
      this.setState({ loader: false });
      message.success(response.message);
      if (response.message !== "Email OR Password are incorrect!") {
        await this.props.saveUserData(response.data);
        localStorage.setItem("userId", response.data.result._id);
        this.props.history.push("/userDashboard");
      }
    } catch (e) {
      this.setState({ loader: false });
      message.error("Some Problem Occur!");
    }
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  responseGoogle = async (googleResponse) => {
    try {
      this.setState({ loader: true });
      await this.props.loginUserGoogleFB({
        email: googleResponse.profileObj.email,
        name: googleResponse.profileObj.name,
      });
      let response = this.props.response;
      this.setState({ loader: false });
      message.success(response.message);
      this.props.saveUserData(response.data);
      localStorage.setItem("userId", response.data.result._id);
      this.props.history.push("/userDashboard");
    } catch (error) {
      this.setState({ loader: false });
      message.error("Some Problem Occur!");
    }
  };

  responseFB = async (fbResponse) => {
    try {
      this.setState({ loader: true });
      await this.props.loginUserGoogleFB({
        email: fbResponse.email,
        name: fbResponse.name,
      });
      let response = this.props.response;
      this.setState({ loader: false });
      message.success(response.message);
      this.props.saveUserData(response.data);
      localStorage.setItem("userId", response.data.result._id);
      this.props.history.push("/userDashboard");
    } catch (error) {
      this.setState({ loader: false });
      message.error("Some Problem Occur!");
    }
  };

  render() {
    return (
      <div>
        <Navbar />
        <LoadingOverlay
          styles={{
            overlay: (base) => ({
              ...base,
              minHeight: "100vh",
            }),
          }}
          active={this.state.loader}
          spinner
          text="Processing....!"
        >
          {" "}
          <div className="Login">
            <Row className="mainDiv">
              <Col lg={8} md={6} sm={2} xs={1}></Col>
              <Col lg={8} md={12} sm={20} xs={22}>
                <div className="formContainer">
                  <div className="mainTitle">Login</div>

                  <Form
                    name="loginForm"
                    onFinish={this.onFinish}
                    validateMessages={validateMessages}
                  >
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          name="email"
                          rules={[
                            {
                              type: "email",
                              message: "The input is not valid E-mail!",
                            },
                            {
                              required: true,
                              message: "Please input your E-mail!",
                            },
                          ]}
                        >
                          <Input
                            prefix={
                              <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="E-Mail"
                          />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Please input your password!",
                            },
                          ]}
                        >
                          <Input.Password
                            prefix={
                              <LockOutlined className="site-form-item-icon" />
                            }
                            placeholder="Password"
                          />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item name="remember" valuePropName="checked">
                          <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Button
                          className="loginButton"
                          type="primary"
                          htmlType="submit"
                        >
                          LOGIN
                        </Button>
                      </Col>

                      <Col span={24}>
                        <GoogleLogin
                          clientId={GoogleKey}
                          buttonText="Login via Google"
                          className="googleButton"
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                          cookiePolicy={"single_host_origin"}
                        />
                      </Col>
                      <Col span={24}>
                        <FacebookLogin
                          appId={FBAppID}
                          autoLoad={false}
                          fields="name,email,picture"
                          cssClass="fbButton"
                          callback={this.responseFB}
                        />
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
              <Col lg={8} md={6} sm={2} xs={1}></Col>
            </Row>
          </div>
        </LoadingOverlay>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  response: state.loginUser,
});

const mapDispatchToProps = { loginUser, saveUserData, loginUserGoogleFB };
Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;
