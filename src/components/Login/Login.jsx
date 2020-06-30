import React, { Component } from "react";
import { connect } from "react-redux";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import "./Login.css";
import { Form, Input, Button, Checkbox, Row, Col, message } from "antd";
import { loginUser } from "../../Actions/LoginAction";
import { saveUserData } from "../../Actions/userDataAction";
import Navbar from "../Navbar/Navbar";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 15,
  },
};
const validateMessages = {
  required: "This field is required!",
  types: {
    email: "Not a validate email!",
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 10,
  },
};

const responseFacebook = (response) => {
  console.log(response);
};

const responseGoogle = (response) => {
  console.log(response);
};

class Login extends Component {
  onFinish = async (values) => {
    try {
      await this.props.loginUser(values);
      let response = this.props.response;
      message.success(response.message);
      this.props.saveUserData(response.data);
      localStorage.setItem("userId", response.data.result._id);
      this.props.history.push("/userDashboard");
    } catch (error) {
      message.error("Some Problem Occur!");
    }
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <div>
        <Navbar />
        <Row className="mainDiv">
          <Col span={24} className="mainTitle">
            Login
          </Col>
          <Col lg={6} md={4} sm={2} xs={1}></Col>
          <Col lg={12} md={16} sm={20} xs={22}>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={this.onFinish}
              validateMessages={validateMessages}
            >
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="email"
                    label="Email"
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
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    {...tailLayout}
                    name="remember"
                    valuePropName="checked"
                  >
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
                    clientId="180157925992-c9jacg15oi7rsspb5t9t64lg9um74nuq.apps.googleusercontent.com"
                    buttonText="Login With Google"
                    cssClass="googleButton"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </Col>
                <Col span={24}>
                  <FacebookLogin
                    appId="708444756657461"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    cssClass="fbButton"
                    callback={responseFacebook}
                  />
                </Col>
              </Row>
            </Form>
          </Col>
          <Col lg={6} md={4} sm={2} xs={1}></Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  response: state.loginUser,
});

const mapDispatchToProps = { loginUser, saveUserData };
Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;
