import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../store/actions/order";
import { checkout } from "../store/actions/checkout";
import Breadcrumb from "./Breadcrumb";
import {
  Alert,
  Spin,
  Divider,
  Form,
  Input,
  Button,
  Row,
  Col,
  Checkbox,
  Typography,
} from "antd";

class Checkout extends Component {
  state = {
    billingDetails: {
      firstName: "",
      lastName: "",
      country: "",
      state: "",
      townCity: "",
      streetAddress: "",
      ZIP: "",
      phone: "",
      email: "",
      deliveryNotes: "",
      differentAddress: false,
    },
  };

  componentDidMount() {
    this.props.fetchOrder();
  }

  handleChange = (e) => {
    const { billingDetails } = this.state;
    const updatedBillingDetails = {
      ...billingDetails,
      [e.target.name]: e.target.value,
    };
    this.setState({ billingDetails: updatedBillingDetails });
  };

  handleChecked = (e) => {
    const { billingDetails } = this.state;
    const updatedBillingDetails = {
      ...billingDetails,
      [e.target.name]: e.target.checked,
    };
    this.setState({ billingDetails: updatedBillingDetails });
  };

  handleSubmit = (e) => {
    const { billingDetails } = this.state;
    this.props.checkout(billingDetails);
    this.props.history.push("/payment");
    window.location.reload(true);
  };

  render() {
    const { billingDetails } = this.state;
    const {
      coupon,
      items,
      orderTotal,
      loading,
      error,
      checkoutError,
    } = this.props;
    return (
      <div>
        {/* Loading Error section */}
        {loading && (
          <div>
            <Spin tip="Loading...">
              <Alert style={{ backgroundColor: "#73d13d" }} />
            </Spin>
            <br />
          </div>
        )}
        {error ||
          (checkoutError && (
            <div>
              <Alert
                message={error.message || checkoutError.message}
                type="info"
              />
              <br />
            </div>
          ))}
        {/* Loading Error section end */}

        {/* breadcrumb */}
        <Breadcrumb page="Checkout" title="Checkout" />
        {/* breadcrumb  end*/}

        <Divider style={{ borderStyle: "none" }} />

        {/* Billing info Form */}
        <React.Fragment>
          <Divider orientation="left">
            <Typography.Title level={3}>Billing Details</Typography.Title>
          </Divider>
          <Form
            name="checkout-form"
            wrapperCol={{ span: 18 }}
            onFinish={this.handleSubmit}
          >
            <Row>
              {/* Billing Details  */}
              <Col
                lg={{ span: 14, push: 2 }}
                md={{ span: 14, push: 2 }}
                sm={{ span: 16, push: 3 }}
                xs={{ span: 22, push: 1 }}
              >
                <Row>
                  <Col span={11}>
                    <Form.Item>
                      <Typography.Paragraph>First Name</Typography.Paragraph>
                      <Input
                        required
                        size="large"
                        name="firstName"
                        value={billingDetails.firstName}
                        onChange={this.handleChange}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12} pull={2}>
                    <Form.Item name="lastName">
                      <Typography.Paragraph>Last Name</Typography.Paragraph>
                      <Input
                        required
                        size="large"
                        name="lastName"
                        value={billingDetails.lastName}
                        onChange={this.handleChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Typography.Paragraph>Country</Typography.Paragraph>
                  <Input
                    required
                    size="large"
                    name="country"
                    value={billingDetails.country}
                    onChange={this.handleChange}
                  />
                </Form.Item>

                <Form.Item>
                  <Typography.Paragraph>State</Typography.Paragraph>
                  <Input
                    required
                    size="large"
                    name="state"
                    value={billingDetails.state}
                    onChange={this.handleChange}
                  />
                </Form.Item>

                <Form.Item>
                  <Typography.Paragraph>Town/City</Typography.Paragraph>
                  <Input
                    required
                    size="large"
                    name="townCity"
                    value={billingDetails.townCity}
                    onChange={this.handleChange}
                  />
                </Form.Item>

                <Form.Item>
                  <Typography.Paragraph>Street address</Typography.Paragraph>
                  <Input
                    required
                    size="large"
                    name="streetAddress"
                    value={billingDetails.streetAddress}
                    onChange={this.handleChange}
                  />
                </Form.Item>

                <Form.Item>
                  <Typography.Paragraph>ZIP code</Typography.Paragraph>
                  <Input
                    required
                    size="large"
                    name="ZIP"
                    value={billingDetails.ZIP}
                    onChange={this.handleChange}
                  />
                </Form.Item>

                <Row>
                  <Col span={11}>
                    <Form.Item>
                      <Typography.Paragraph>Phone</Typography.Paragraph>
                      <Input
                        required
                        size="large"
                        name="phone"
                        value={billingDetails.phone}
                        onChange={this.handleChange}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12} pull={2}>
                    <Form.Item>
                      <Typography.Paragraph>Email</Typography.Paragraph>
                      <Input
                        required
                        size="large"
                        name="email"
                        value={billingDetails.email}
                        onChange={this.handleChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name="checkbox-group">
                  <Checkbox
                    name="differentAddress"
                    value={billingDetails.differentAddress}
                    onChange={this.handleChecked}
                  >
                    Ship to a different address ?
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Typography.Paragraph>Order Notes </Typography.Paragraph>
                  <Input
                    placeholder="Espcial notes for delivery"
                    size="large"
                    name="deliveryNotes"
                    value={billingDetails.deliveryNotes}
                    onChange={this.handleChange}
                  />
                </Form.Item>
              </Col>
              {/* Billing Details end */}

              {/* Order Summary section */}
              <Col
                lg={{ span: 8, push: 0 }}
                md={{ span: 8, push: 0 }}
                sm={{ span: 16, push: 3 }}
                xs={{ span: 22, push: 1 }}
              >
                <div style={{ backgroundColor: "#f6ffed" }}>
                  <Typography.Title level={3} style={{ textAlign: "center" }}>
                    Your order
                  </Typography.Title>

                  <Divider />
                  <Row>
                    <Col span={12} push={3}>
                      <Typography.Title level={4}>Products</Typography.Title>
                    </Col>
                    <Col span={12} push={4}>
                      <Typography.Title level={4}>Total</Typography.Title>
                    </Col>
                    {items.map((item) => {
                      return (
                        <React.Fragment>
                          <Col span={12} push={3}>
                            <Typography.Paragraph>
                              {item.product.name} X {item.quantity}
                            </Typography.Paragraph>
                          </Col>
                          <Col span={12} push={4}>
                            <Typography.Paragraph strong>
                              {item.product.discount_price
                                ? `$ ${item.product.discount_price}`
                                : `$ ${item.product.price}`}
                            </Typography.Paragraph>
                          </Col>
                        </React.Fragment>
                      );
                    })}
                    {coupon && (
                      <React.Fragment>
                        <Col span={12} push={3}>
                          <Typography.Paragraph>
                            {coupon.code}
                          </Typography.Paragraph>
                        </Col>
                        <Col span={12} push={4}>
                          <Typography.Paragraph strong>
                            -${coupon.amount}
                          </Typography.Paragraph>
                        </Col>
                      </React.Fragment>
                    )}
                    <Divider />
                    <Col span={12} push={3}>
                      <Typography.Title level={5}>Subtotal</Typography.Title>
                    </Col>
                    <Col span={12} push={3}>
                      {items.map((item) => {
                        return (
                          <Typography.Title level={5}>
                            {item.product.discount_price
                              ? `$ ${
                                  item.product.discount_price * item.quantity
                                }`
                              : `$ ${item.product.price * item.quantity}`}
                          </Typography.Title>
                        );
                      })}
                      {coupon && (
                        <Typography.Title level={5}>
                          -${coupon.amount}
                        </Typography.Title>
                      )}
                    </Col>
                    <Divider />
                    <Col span={12} push={3}>
                      <Typography.Title level={4}>Total</Typography.Title>
                    </Col>
                    <Col span={12} push={3}>
                      <Typography.Title level={4} type="danger" strong>
                        ${orderTotal}
                      </Typography.Title>
                    </Col>
                    <Col lg={{ push: 3 }} sm={{ push: 2 }} xs={{ push: 2 }}>
                      <Button
                        size="large"
                        htmlType="submit"
                        style={{
                          backgroundColor: "#b7eb8f",
                          marginTop: "1rem",
                          marginBottom: "2rem",
                        }}
                      >
                        <Typography.Title
                          level={3}
                          strong
                          style={{
                            color: "white",
                          }}
                        >
                          Place Order
                        </Typography.Title>
                      </Button>
                    </Col>
                    {/* Order summary section end */}
                  </Row>
                </div>
              </Col>
            </Row>
          </Form>
        </React.Fragment>
        {/* End of billing form */}

        <Divider style={{ broderStyle: "none" }} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.order.order.items || [],
    orderTotal: state.order.orderTotal,
    coupon: state.order.order.coupon,
    loading: state.order.loading,
    error: state.order.error,
    checkoutError: state.checkout.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrder: () => dispatch(fetchOrder()),
    checkout: (billingDetails) => dispatch(checkout(billingDetails)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
