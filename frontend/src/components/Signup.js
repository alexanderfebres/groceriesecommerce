import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Alert, Divider, Form, Input, Button, Spin } from "antd";
import { authSignup } from "../store/actions/auth";
import { WindowsFilled } from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class SignupForm extends React.Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    const { username, email, password1, password2 } = this.state;
    this.props.signup(username, email, password1, password2);
    this.setState({ username: "", email: "", password1: "", password2: "" });
  };
  render() {
    const { username, email, password1, password2 } = this.state;
    const { token, loading, error } = this.props;

    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        {/* Loading Error Section */}
        {loading && (
          <div>
            <Spin tip="Loading...">
              <Alert style={{ backgroundColor: "#73d13d" }} />
            </Spin>
            <br />
          </div>
        )}
        {error && (
          <div>
            <Alert message={error} type="info" />
            <br />
          </div>
        )}
        {/* Loading Error Section end */}

        <Divider style={{ borderStyle: "none" }} />

        {/* Signup form end */}
        <div style={{ marginTop: "50px" }}>
          <Form
            {...layout}
            onFinish={this.handleSubmit}
            name="basic"
            initialValues={{ remember: true }}
          >
            <Form.Item label="Username">
              <Input
                required
                name="username"
                onChange={this.handleChange}
                value={username}
              />
            </Form.Item>

            <Form.Item label="Email">
              <Input
                required
                type="email"
                name="email"
                onChange={this.handleChange}
                value={email}
              />
            </Form.Item>

            <Form.Item label="Password">
              <Input.Password
                required
                name="password1"
                onChange={this.handleChange}
                value={password1}
              />
            </Form.Item>

            <Form.Item label="Password">
              <Input.Password
                required
                name="password2"
                onChange={this.handleChange}
                value={password2}
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button htmlType="submit">Sign up</Button>
            </Form.Item>
          </Form>
        </div>
        {/* Sigup form end */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    error: state.auth.error,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (username, email, password1, password2) =>
      dispatch(authSignup(username, email, password1, password2)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
