import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../store/actions/order";
import { fetchSingleProduct } from "../store/actions/product";
import { cartAddItem, cartDeleteItem } from "../store/actions/cart";
import Breadcrumb from "./Breadcrumb";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import {
  Alert,
  Spin,
  Button,
  Col,
  Card,
  Divider,
  Image,
  Row,
  Space,
  Tabs,
  Typography,
} from "antd";

const ProductDetail = (props) => {
  const id = props.match.params.productID;
  useEffect(() => {
    props.fetchSingleProduct(id);
    props.fetchOrder(id);
  }, []);

  const handleAddToCart = (id) => {
    props.cartAddItem(id);
  };

  const handleRemoveSingleItemFromCart = (id) => {
    props.cartDeleteItem(id);
  };

  const {
    product,
    relatedProducts,
    productQuantity,
    orderLoading,
    orderError,
    productLoading,
    productError,
  } = props;

  return (
    <div>
      {/* Loading Error section */}
      {orderLoading ||
        (productLoading && (
          <div>
            <Spin tip="Loading...">
              <Alert style={{ backgroundColor: "#73d13d" }} />
            </Spin>
            <br />
          </div>
        ))}
      {orderError ||
        (productError && (
          <div>
            <Alert
              message={orderError.message || productError.message}
              type="info"
            />
            <br />
          </div>
        ))}
      {/* Loading Error section End */}

      {/* breadcrumb */}
      <Breadcrumb page={product.name} title="Product" />
      {/* Breadcrumb End */}

      <Divider style={{ borderStyle: "none" }} />

      {/* Product info */}
      <React.Fragment>
        <Row gutter={[5, 25]}>
          <Col lg={10} md={10} sm={10} offset={2}>
            <Image src={product.image} />
          </Col>
          <Col
            lg={{ span: 12, offset: 0 }}
            md={{ span: 10 }}
            sm={{ span: 10 }}
            xs={{ span: 24, offset: 2 }}
          >
            <Row>
              <Col>
                <Typography.Title level={3}>{product.name}</Typography.Title>

                {product.discount_price ? (
                  <Typography.Title level={2} type="danger">
                    ${product.discount_price}
                  </Typography.Title>
                ) : (
                  <Typography.Title level={2} type="danger">
                    ${product.price}
                  </Typography.Title>
                )}
                <Typography.Paragraph>
                  {product.description}
                </Typography.Paragraph>

                <Divider style={{ borderStyle: "none" }} />

                <Row>
                  <Col span={11}>
                    <Typography.Paragraph>
                      <Space
                        size="middle"
                        style={{
                          backgroundColor: "#f0f0f0",
                          padding: "9px 9px 9px 9px",
                        }}
                      >
                        <span
                          onClick={() =>
                            handleRemoveSingleItemFromCart(product.id)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <MinusOutlined />
                        </span>{" "}
                        {productQuantity}{" "}
                        <span
                          onClick={() => handleAddToCart(product.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <PlusOutlined />
                        </span>
                      </Space>
                    </Typography.Paragraph>
                  </Col>
                  <Col offset={2} span={10}>
                    <Button
                      onClick={() => handleAddToCart(product.id)}
                      size="large"
                      style={{
                        backgroundColor: "#f0f0f0",
                        color: "#595959",
                        borderColor: "#fafafa",
                      }}
                    >
                      ADD TO CART
                    </Button>
                  </Col>
                </Row>
                <Divider style={{ borderStyle: "none" }} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Typography.Title level={5}>Availability </Typography.Title>
              </Col>
              <Col span={12}>
                <Typography.Text>In Stock </Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>Shipping </Typography.Title>
              </Col>
              <Col span={12}>
                <div>
                  <Typography.Text>
                    Shipping.
                    <span style={{ color: "red" }}> Free pickup today</span>
                  </Typography.Text>
                </div>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>Weight </Typography.Title>
              </Col>
              <Col span={12}>
                <Typography.Text>{product.weight}</Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider />
      </React.Fragment>
      {/* Product Info End */}

      {/* Tab Section */}
      <React.Fragment>
        <Row justify="center">
          <Tabs defaultActiveKey="1" size="large" centered>
            <Tabs.TabPane tab="Description" key="1">
              <Typography.Paragraph>{product.description}</Typography.Paragraph>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Information" key="2">
              <Typography.Paragraph>
                {product.name} : {product.description}
              </Typography.Paragraph>
            </Tabs.TabPane>
          </Tabs>
        </Row>
      </React.Fragment>
      {/* Tab Section End */}

      <Divider />

      {/* Related Products Section*/}
      <React.Fragment>
        <Typography.Title level={2} style={{ textAlign: "center" }}>
          Related Products
        </Typography.Title>
        <Row justify="center">
          {relatedProducts.slice(0, 4).map((rp) => {
            return (
              rp.id !== product.id && (
                <Col
                  lg={{ span: 6, push: 1 }}
                  md={{ span: 12, push: 0 }}
                  sm={{ span: 24, push: 0 }}
                  xs={{ span: 24, push: 2 }}
                >
                  <Card
                    style={{ width: 260 }}
                    cover={<img alt={rp.name} src={rp.image} />}
                    actions={[
                      <Button
                        href={`/shop-details/${rp.id}`}
                        shape="round"
                        size="large"
                      >
                        Check
                      </Button>,
                    ]}
                  >
                    <Card.Meta
                      title={rp.name}
                      description={`Category: ${rp.category}`}
                    />
                  </Card>
                </Col>
              )
            );
          })}
        </Row>
      </React.Fragment>
      {/* Related Products Section End */}

      <Divider style={{ borderStyle: "none" }} />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    items: state.order.order.items || [],
    product: state.product.product,
    relatedProducts: state.product.products,
    productQuantity: state.product.productQuantity,
    orderLoading: state.order.loading,
    orderError: state.order.error,
    productLoading: state.product.loading,
    productError: state.product.errror,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrder: (id) => dispatch(fetchOrder(id)),
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    cartAddItem: (id) => dispatch(cartAddItem(id)),
    cartDeleteItem: (id) => dispatch(cartDeleteItem(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
