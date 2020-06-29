import React, { Component } from "react";
import { Form, Input, Select, Button, Row, Col } from "antd";
import { registerUser } from "../../Actions/RegisterAction";
import { connect } from "react-redux";
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "This field is required!",
  types: {
    email: "Not a validate email!",
    number: "Not a validate number!",
  },
};

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="92">+92</Option>
    </Select>
  </Form.Item>
);

class Register extends Component {
  onFinish = async (values) => {
    await this.props.registerUser(values);
    console.log(this.props.data);
  };

  render() {
    return (
      <Row className="mainDiv">
        <Col span={24} className="mainTitle">
          Register
        </Col>
        <Col lg={6} md={4} sm={2} xs={1}></Col>
        <Col lg={12} md={16} sm={20} xs={22}></Col>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={this.onFinish}
          validateMessages={validateMessages}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="email"
                label="E-mail"
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
                name="phone_number"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
            <Col lg={6} md={4} sm={2} xs={1}></Col>
          </Row>
        </Form>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.registerUser,
});

const mapDispatchToProps = { registerUser };

Register = connect(mapStateToProps, mapDispatchToProps)(Register);

export default Register;
