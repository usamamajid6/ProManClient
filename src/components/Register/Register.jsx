import React, { Component } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import {
  registerUser,
  registerUserGoogleFB,
} from "../../Actions/RegisterAction";
import Navbar from "../Navbar/Navbar";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import "./Register.css";
import GoogleKey from "../../GoogleKey";
import FBAppID from "../../FBAppID";
const validateMessages = {
  required: "This field is required!",
  types: {
    email: "Not a validate email!",
    number: "Not a validate number!",
  },
};

class Register extends Component {
  state = { loader: false };
  // responseGoogle = async (googleResponse) => {
  //   console.log("====================================");
  //   console.log(googleResponse);
  //   console.log("====================================");
  //   try {
  //     this.setState({ loader: true });
  //     await this.props.registerUserGoogleFB({
  //       email: googleResponse.profileObj.email,
  //       name: googleResponse.profileObj.name,
  //     });

  //     this.setState({ loader: false });
  //     let response = this.props.response;
  //     this.setState({ loader: false });
  //     if (response.data.message === "Email Already Taken!") {
  //       message.info(response.data.message);
  //       return;
  //     }
  //     message.success(response.data.message);
  //     this.props.history.push("/login");
  //   } catch (error) {
  //     this.setState({ loader: false });
  //     message.error("Some Problem Occur!");
  //   }
  // };

  componentClicked = (a, b, c) => {};

  // responseFB = async (fbResponse) => {
  //   try {
  //     this.setState({ loader: true });
  //     await this.props.registerUserGoogleFB({
  //       name: fbResponse.name,
  //       email: fbResponse.email,
  //     });
  //     let response = this.props.response;
  //     this.setState({ loader: false });
  //     if (response.data.message === "Email Already Taken!") {
  //       message.info(response.data.message);
  //       return;
  //     }
  //     message.success(response.data.message);
  //     this.props.history.push("/login");
  //   } catch (error) {
  //     this.setState({ loader: false });
  //     message.error("Some Problem Occur!");
  //   }
  // };

  onFinish = async (values) => {
    try {
      this.setState({ loader: true });
      await this.props.registerUser(values);
      let response = this.props.response;
      this.setState({ loader: false });
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      if (response.data.message === "Email Already Exists!") {
        message.info(response.data.message);
        return;
      }
      message.success(response.data.message);
      this.props.history.push("/login");
    } catch (error) {
      this.setState({ loader: false });
      message.error("Some Problem Occur!");
    }
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="Register">
          <Row className="mainDiv">
            <Col lg={7} md={4} sm={2} xs={1}></Col>
            <Col lg={10} md={16} sm={20} xs={22}>
              <div className="formContainer">
                <div className="mainTitle">Register</div>
                <Form
                  name="registerForm"
                  onFinish={this.onFinish}
                  validateMessages={validateMessages}
                >
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <UserOutlined className="site-form-item-icon" />
                          }
                          placeholder="Name"
                        />
                      </Form.Item>
                    </Col>

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
                        name="phone_number"
                        rules={[
                          {
                            required: true,
                            message: "Please input your phone number!",
                          },
                        ]}
                      >
                        <Input 
                          prefix={
                            <PhoneOutlined className="site-form-item-icon" />
                          }
                          placeholder="Phone Number"
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
                        hasFeedback
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
                      <Form.Item
                        name="confirm"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your password!",
                          },
                          ({ getFieldValue }) => ({
                            validator(rule, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }

                              return Promise.reject(
                                "The two passwords that you entered do not match!"
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password
                          prefix={
                            <LockOutlined className="site-form-item-icon" />
                          }
                          placeholder="Confirm Password"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Button
                        className="registerButton"
                        type="primary"
                        htmlType="submit"
                      >
                        Register
                      </Button>
                    </Col>

                    {/* <Col span={24}>
                      <GoogleLogin
                        clientId={GoogleKey}
                        buttonText="Register via Google"
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
                        onClick={this.componentClicked}
                        cssClass="fbButton"
                        textButton="Register Via FB"
                        callback={this.responseFB}
                      />
                    </Col> */}
                  </Row>
                </Form>
              </div>
            </Col>
            <Col lg={7} md={4} sm={2} xs={1}></Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  response: state.registerUser,
});

const mapDispatchToProps = { registerUser, registerUserGoogleFB };

Register = connect(mapStateToProps, mapDispatchToProps)(Register);

export default Register;
