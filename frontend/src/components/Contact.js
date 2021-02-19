import React, { Component } from "react";
import { connect } from "react-redux";
import { leaveMessage } from "../store/actions/contact";
import Breadcrumb from "./Breadcrumb";
import {
  Alert,
  Col,
  Divider,
  Row,
  Spin,
  Typography,
  Form,
  Input,
  Button,
} from "antd";
import {
  ClockCircleOutlined,
  MailOutlined,
  PushpinOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

class Contact extends Component {
  state = {
    loading: false,
    error: null,
    formData: {
      name: "",
      email: "",
      message: "",
    },
  };

  handleChange = (e) => {
    const { formData } = this.state;
    const data = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    this.setState({ formData: data });
  };

  handleSubmit = (e) => {
    const { email, message, name } = this.state.formData;
    this.props.leaveMessage(email, message, name);
  };

  render() {
    const { email, message, name } = this.state;
    const { loading, error, success } = this.props;
    return (
      <div>
        {/* breadcrumb */}
        <Breadcrumb page="Contact" title="Contact" />
        {/* breadcumb end */}

        <Divider style={{ borderStyle: "none" }} />

        {/* Contact Info */}
        <React.Fragment>
          <Row justify="center" gutter={[5, 35]}>
            <Col
              lg={{ span: 4, offset: 2 }}
              md={{ span: 10, offset: 2 }}
              sm={{ span: 10, offset: 2 }}
              xs={{ span: 20, offset: 4 }}
            >
              <div>
                <PhoneOutlined
                  style={{
                    fontSize: "3rem",
                    color: "green",
                  }}
                />
                <Typography.Title>Phone</Typography.Title>
                <Typography.Text>+ 65 88.888.888</Typography.Text>
              </div>
            </Col>

            <Col
              lg={{ span: 4, offset: 2 }}
              md={{ span: 10, offset: 0 }}
              sm={{ span: 10, offset: 0 }}
              xs={{ span: 20, offset: 4 }}
            >
              <div>
                <PushpinOutlined
                  style={{
                    fontSize: "3rem",
                    color: "green",
                  }}
                />
                <Typography.Title>Address</Typography.Title>
                <Typography.Text>
                  Arequipa, Paucarpata, Jesus Maria
                </Typography.Text>
              </div>
            </Col>

            <Col
              lg={{ span: 4, offset: 2 }}
              md={{ span: 10, offset: 2 }}
              sm={{ span: 10, offset: 2 }}
              xs={{ span: 20, offset: 4 }}
            >
              <div>
                <ClockCircleOutlined
                  style={{
                    fontSize: "3rem",
                    color: "green",
                  }}
                />
                <Typography.Title>Open time</Typography.Title>
                <Typography.Text>10:00 am to 23:00 pm</Typography.Text>
              </div>
            </Col>

            <Col
              lg={{ span: 4, offset: 2 }}
              md={{ span: 10, offset: 0 }}
              sm={{ span: 10, offset: 0 }}
              xs={{ span: 20, offset: 4 }}
            >
              <div>
                <MailOutlined
                  style={{
                    fontSize: "3rem",
                    color: "green",
                  }}
                />
                <Typography.Title>Email</Typography.Title>
                <Typography.Text>alexanderfebresth@gmail.com</Typography.Text>
              </div>
            </Col>
          </Row>
        </React.Fragment>
        {/* Contact Info  end*/}

        <Divider style={{ borderStyle: "none" }} />

        {/* Leave Message */}
        <React.Fragment>
          <Typography.Title style={{ textAlign: "center" }}>
            Leave a message
          </Typography.Title>

          {/* Loading, Error, Success Section */}
          {loading && (
            <div>
              <Spin tip="Loading..." style={{ marginLeft: "7rem" }} />
              <br />
            </div>
          )}
          {success && (
            <div>
              <Alert
                style={{ backgroundColor: "#73d13d", textAlign: "center" }}
                message="Congratulations!.. your message has been successfully sent "
              />
              <br />
            </div>
          )}
          {error && <Alert message={error.message} type="info" />}
          {/* Loading, Error, Succes Section End */}

          <Row>
            <Col span={24} offset={2}>
              <Form
                onFinish={this.handleSubmit}
                name="leave-message-form"
                wrapperCol={{ span: 20 }}
              >
                <Form.Item style={{ marginBottom: 0 }}>
                  <Form.Item
                    rules={[{ required: true }]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                    }}
                  >
                    <Input
                      placeholder="Your Name"
                      size="large"
                      name="name"
                      value={name}
                      onChange={this.handleChange}
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true }]}
                    style={{
                      display: "inline-block",
                      width: "calc(50% - 8px)",
                      margin: "0 8px",
                    }}
                  >
                    <Input
                      placeholder="Your Email"
                      size="large"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input.TextArea
                      showCount
                      placeholder="Your Message "
                      size="large"
                      name="message"
                      value={message}
                      onChange={this.handleChange}
                    />
                  </Form.Item>
                </Form.Item>
                <Button htmlType="submit" size="large">
                  Send Message
                </Button>
              </Form>
            </Col>
          </Row>
        </React.Fragment>
        {/* Leave Message end */}

        <Divider style={{ borderStyle: "none" }} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    success: state.contact.success,
    loading: state.contact.loading,
    error: state.contact.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    leaveMessage: (email, message, name) =>
      dispatch(leaveMessage(email, message, name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
