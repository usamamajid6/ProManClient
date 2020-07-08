import React, { Component } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import { registerUser } from "../../Actions/RegisterAction";
import Navbar from "../Navbar/Navbar";
import { connect } from "react-redux";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import "./Register.css";

const validateMessages = {
  required: "This field is required!",
  types: {
    email: "Not a validate email!",
    number: "Not a validate number!",
  },
};

class Register extends Component {
  onFinish = async (values) => {
    try {
      await this.props.registerUser(values);
      if (this.props.data.data.message === "Email Already Exists!") {
        message.info(this.props.data.data.message);
        return;
      }
      message.success(this.props.data.data.message);
      this.props.history.push("/login");
    } catch (e) {
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
                      <Form.Item>
                        <Button
                          className="registerButton"
                          type="primary"
                          htmlType="submit"
                        >
                          Register
                        </Button>
                      </Form.Item>
                    </Col>
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
  data: state.registerUser,
});

const mapDispatchToProps = { registerUser };

Register = connect(mapStateToProps, mapDispatchToProps)(Register);

export default Register;
