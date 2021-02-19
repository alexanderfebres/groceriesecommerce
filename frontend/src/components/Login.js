import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { authLogin } from "../store/actions/auth";
import { Alert, Divider, Form, Input, Button, Spin, Checkbox } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class LoginForm extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    const { email, password } = this.state;
    this.props.login(email, password);
    this.setState({ email: "", password: "" });
  };

  render() {
    const { email, password } = this.state;
    const { token, loading, error } = this.props;

    if (token) {
      if (!window.location.hash) {
        window.location = window.location + "#";
        window.location.reload();
      }
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

        {/* Login Form */}
        <div style={{ marginTop: "50px" }}>
          <Form
            {...layout}
            onFinish={this.handleSubmit}
            initialValues={{ remember: true }}
          >
            <Form.Item label="Email">
              <Input
                required
                type="email"
                name="email"
                onChange={this.handleChange}
                value={email}
              />
            </Form.Item>

            <Form.Item
              required
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                name="password"
                onChange={this.handleChange}
                value={password}
              />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button htmlType="submit">Sign In</Button>
            </Form.Item>
          </Form>
        </div>
        {/* Login Form end */}
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
    login: (email, password) => dispatch(authLogin(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
