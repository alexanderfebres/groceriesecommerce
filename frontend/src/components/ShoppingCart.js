import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../store/actions/order";
import {
  cartAddItem,
  cartDeleteItem,
  cartDeleteOrderItem,
  cartAddCoupon,
} from "../store/actions/cart";
import Breadcrumb from "./Breadcrumb";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Alert,
  Spin,
  Row,
  Col,
  Button,
  Typography,
  Divider,
  Image,
  Space,
  Form,
  Input,
} from "antd";

class ShoppingCart extends Component {
  state = {
    couponCode: null,
  };

  componentDidMount() {
    this.props.fetchOrder(null);
  }

  handleIncreaseProductQuantityt = (id) => {
    this.props.cartAddItem(id);
  };

  handleDecreaseProductQuantity = (id) => {
    this.props.cartDeleteItem(id);
  };

  handleDeleteProduct = (orderProductId) => {
    this.props.cartDeleteOrderItem(orderProductId);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    const { couponCode } = this.state;
    this.props.cartAddCoupon(couponCode, this.props.fetchOrder);
  };

  render() {
    const { couponCode } = this.state;
    const { coupon, items, orderTotal, loading, error } = this.props;

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
            <Alert message={error.message} type="info" />
            <br />
          </div>
        )}
        {/* Loading Error Section End */}

        {/* Breadcrumb */}
        <Breadcrumb page="Shopping cart" title="Your Cart" />
        {/* Breadcrumb End */}

        <Divider style={{ borderStyle: "none" }} />

        {/* Shopping Cart Section */}
        <React.Fragment>
          <div id="table">
            {/* Table Head */}
            <Row>
              <Col
                lg={{ span: 8, offset: 2 }}
                md={{ span: 8, offset: 2 }}
                sm={{ span: 10, offset: 2 }}
                xs={{ span: 10, offset: 2 }}
              >
                <Typography.Title level={4}>Products</Typography.Title>
              </Col>
              <Col lg={3} md={2} sm={10} xs={10}>
                <Typography.Title level={4}>Price</Typography.Title>
              </Col>
              <Col
                lg={5}
                md={5}
                sm={{ span: 12, push: 2 }}
                xs={{ span: 12, push: 2 }}
              >
                <Typography.Title level={4}>Quantity</Typography.Title>
              </Col>
              <Col lg={4} md={3} sm={10} xm={10}>
                <Typography.Title level={4}>Total</Typography.Title>
              </Col>
            </Row>
            {/* Table Head End */}

            <Divider />

            {/* Table Body (Order Summary)  */}
            {items.map((item) => {
              return (
                <Row>
                  <Col
                    lg={{ span: 8, offset: 2 }}
                    md={{ span: 8, offset: 2 }}
                    sm={{ span: 10, offset: 2 }}
                    xs={{ span: 10, offset: 2 }}
                  >
                    <div>
                      <Typography.Paragraph style={{ fontSize: "1.2rem" }}>
                        <Space>
                          <Image
                            src={item.product.image}
                            style={{ width: "4rem" }}
                          />
                          {item.product.name}
                        </Space>
                      </Typography.Paragraph>
                    </div>
                  </Col>
                  <Col
                    lg={{ span: 3 }}
                    md={{ span: 2 }}
                    sm={{ span: 7 }}
                    xs={10}
                    style={{ marginTop: "1.7rem" }}
                  >
                    {item.product.discount_price ? (
                      <Typography.Title strong level={5}>
                        ${item.product.discount_price}
                      </Typography.Title>
                    ) : (
                      <Typography.Title strong level={5}>
                        ${item.product.price}
                      </Typography.Title>
                    )}
                  </Col>
                  <Col
                    lg={{ span: 5 }}
                    md={{ span: 5 }}
                    sm={{ span: 12, push: 2 }}
                    xs={{ span: 12, push: 2 }}
                    style={{ marginTop: "1.7rem" }}
                  >
                    <Typography.Paragraph>
                      <Space style={{ backgroundColor: "#f0f0f0" }}>
                        <span
                          onClick={() =>
                            this.handleDecreaseProductQuantity(item.product.id)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <MinusOutlined />
                        </span>{" "}
                        {item.quantity}{" "}
                        <span
                          onClick={() =>
                            this.handleIncreaseProductQuantityt(item.product.id)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <PlusOutlined />
                        </span>
                      </Space>
                    </Typography.Paragraph>
                  </Col>
                  <Col
                    lg={{ span: 3 }}
                    md={{ span: 3 }}
                    sm={{ span: 7 }}
                    xs={{ span: 7 }}
                    style={{ marginTop: "1.7rem" }}
                  >
                    <div>
                      <Space size="middle">
                        {item.product.discount_price ? (
                          <Typography.Title strong level={5}>
                            $ {item.product.discount_price * item.quantity}
                          </Typography.Title>
                        ) : (
                          <Typography.Title strong level={5}>
                            $ {item.product.price * item.quantity}
                          </Typography.Title>
                        )}
                        <span
                          onClick={() => this.handleDeleteProduct(item.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <DeleteOutlined />
                        </span>
                      </Space>
                    </div>
                  </Col>
                </Row>
              );
            })}
            {/* Table Body (Order Summary) End */}

            <Divider />
          </div>
        </React.Fragment>
        {/* Shopping Cart Section End */}

        {/* Continue Shopping */}
        <div>
          <Row>
            <Col span={12} push={2}>
              <Button
                href="/shop"
                size="large"
                style={{
                  backgroundColor: "#f0f0f0",
                  color: "#595959",
                  borderColor: "#fafafa",
                }}
              >
                CONTINUE SHOPPING
              </Button>
            </Col>
          </Row>
        </div>
        {/* Continue Shopping End */}

        <Divider style={{ borderStyle: "none" }} />

        <div>
          <Row gutter={[25, 25]}>
            {/* Coupon Section  */}
            <Col lg={11} md={8} sm={24} xs={22} push={2}>
              <Typography.Title level={3}>Discount Codes</Typography.Title>
              {coupon && (
                <Typography.Title
                  level={5}
                >{`"${coupon.code}" coupon applied,  saving ${coupon.amount}$`}</Typography.Title>
              )}
              <Form
                name="coupon-form"
                layout="inline"
                onFinish={this.handleSubmit}
              >
                <Col lg={12} md={24} sm={24}>
                  <Form.Item
                    name="coupon"
                    rules={[{ required: true }]}
                    style={{ boderColor: "#fafafa" }}
                  >
                    <Input
                      onChange={this.handleChange}
                      name="couponCode"
                      value={couponCode}
                      placeholder="Enter your coupon code"
                      size="large"
                      style={{ boderColor: "#fafafa" }}
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} md={24} sm={24}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    style={{
                      backgroundColor: "#595959",
                      color: "white",
                      borderColor: "#fafafa",
                    }}
                  >
                    APPLY COUPON
                  </Button>
                </Col>
              </Form>
            </Col>
            {/* Coupon Section End */}

            {/* Order Summary */}
            <Col
              lg={{ span: 10 }}
              md={{ span: 14, push: 1 }}
              sm={{ span: 24 }}
              xs={{ span: 24, push: 1 }}
            >
              <div style={{ backgroundColor: "#f6ffed" }}>
                <Typography.Title level={3} style={{ textAlign: "center" }}>
                  Your order
                </Typography.Title>

                <Row justify="left" align="middle">
                  <Col span={12} push={3}>
                    <Typography.Title level={4}>Subtotal</Typography.Title>
                  </Col>

                  <Col span={12} push={3}>
                    {items.map((item) => {
                      return (
                        <Typography.Title level={5}>
                          {item.product.discount_price
                            ? `$ ${item.product.discount_price * item.quantity}`
                            : `$ ${item.product.price * item.quantity}`}
                        </Typography.Title>
                      );
                    })}
                    {coupon && (
                      <Typography.Title
                        level={5}
                      >{`-$ ${coupon.amount}`}</Typography.Title>
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
                  <Col span={12} push={3}>
                    <Button
                      href="/checkout"
                      style={{
                        backgroundColor: "#b7eb8f",
                        height: "3rem",
                        weight: "12rem",
                        marginTop: "1rem",
                        marginBottom: "2rem",
                      }}
                    >
                      <Typography.Title level={4} style={{ color: "white" }}>
                        Proceed To Checkout
                      </Typography.Title>
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
            {/* Order Summary End */}
          </Row>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    order: state.order.order || [],
    items: state.order.order.items || [],
    coupon: state.order.order.coupon,
    orderTotal: state.order.orderTotal,
    loading: state.cart.loading,
    error: state.cart.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrder: () => dispatch(fetchOrder()),
    cartAddItem: (id) => dispatch(cartAddItem(id)),
    cartDeleteItem: (id) => dispatch(cartDeleteItem(id)),
    cartDeleteOrderItem: (id) => dispatch(cartDeleteOrderItem(id)),
    cartAddCoupon: (couponCode) => dispatch(cartAddCoupon(couponCode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
