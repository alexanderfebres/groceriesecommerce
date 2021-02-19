import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrder } from "../store/actions/order";
import Breadcrumb from "./Breadcrumb";
import { shopCarouselSettings } from "./carouselSettings";
import {
  fetchProducts,
  fetchProductCategories,
  setToFeatured,
  getProductQuantity,
} from "../store/actions/product.js";
import {
  cartAddItem,
  cartDeleteItem,
  cartDeleteOrderItem,
} from "../store/actions/cart";

import {
  Alert,
  Spin,
  Button,
  Badge,
  Divider,
  Carousel,
  Card,
  InputNumber,
  Radio,
  Col,
  Row,
  Typography,
  Pagination,
  Slider,
  List,
} from "antd";

import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";

class Shop extends React.Component {
  state = {
    min: 1,
    max: 1000,
    currentPage: 1,
    productsPerPage: 9,
  };

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchOrder();
    this.props.fetchProducts();
  }

  handleClick = (e) => {
    let filterCriteria = e.target.id;
    this.props.fetchProducts(filterCriteria);
  };

  handleSetToFeatured = (productID) => {
    if (this.props.isAuthenticated) {
      this.props.setToFeatured(productID);
    } else {
      alert("Not Authenticated");
    }
  };

  handleOnAfterChange = () => {
    let { min, max } = this.state;
    this.props.fetchProducts(null, min, max);
  };

  handleAddToCart = (id) => {
    if (!this.props.isAuthenticated) {
      alert("Login first to start purchasing");
    }
    this.props.cartAddItem(id);
  };

  handleDeleteProduct = (orderProductId) => {
    this.props.cartDeleteOrderItem(orderProductId);
  };

  handleDeleteOrderItemFromShop = (items, productID) => {
    const count = getProductQuantity(productID, items);
    if (count > 0) {
      items.map((item) => {
        if (item.product.id === productID) {
          this.handleDeleteProduct(item.id);
        }
      });
    } else {
      alert("This item is not in your cart");
    }
  };

  handlePriceChange = (value) => {
    if (value[0] < value[1]) {
      this.setState({ min: value[0], max: value[1] });
    }
  };
  onChangeMin = (value) => {
    if (this.state.max > value) {
      this.setState({ min: value });
    }
  };
  onChangeMax = (value) => {
    if (this.state.min < value) {
      this.setState({ max: value });
    }
  };

  paginate = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { min, max, currentPage, productsPerPage, not } = this.state;
    const {
      order,
      products,
      offProducts,
      categories,
      loading,
      error,
    } = this.props;

    // pagination
    const lastProductIndex = currentPage * productsPerPage;
    const firstProductIndex = lastProductIndex - productsPerPage;
    const currentProducts = products.slice(firstProductIndex, lastProductIndex);

    return (
      <div>
        {/* Loading  Error Section */}
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
        <Breadcrumb page="Shop" title="Shop" />
        {/* Breadcrumb End */}

        <Divider style={{ borderStyle: "none" }} />

        {/* Departments, Carouse Section  */}
        <React.Fragment>
          <Row style={{ flexDirection: "row-reverse" }}>
            {/*  Sales OFF  */}
            <Col lg={18} md={18} sm={{ span: 23, offset: 1 }} align="center">
              <Typography.Title level={2}>Sales Off</Typography.Title>
              <Carousel {...shopCarouselSettings} autoplay>
                {offProducts.map((offProduct) => {
                  return (
                    <div>
                      <Card
                        style={{ width: 225, height: 325 }}
                        cover={
                          <img
                            alt={offProduct.description}
                            src={offProduct.image}
                          />
                        }
                      >
                        <Link to={`/shop-details/${offProduct.id}`}>
                          <Card.Meta
                            title={offProduct.name}
                            description={[
                              <strong style={{ fontSize: "15px" }}>
                                ${offProduct.discount_price}
                              </strong>,
                              " ",
                              <strike style={{ color: "pink" }}>
                                ${offProduct.price}
                              </strike>,
                            ]}
                          />
                        </Link>
                      </Card>
                    </div>
                  );
                })}
              </Carousel>
            </Col>
            {/* Sales OFF  End */}

            {/* Deparments list */}
            <Col
              lg={{ span: 4, offset: 1 }}
              md={4}
              sm={{ span: 23, offset: 1 }}
              xs={{ span: 23, offset: 1 }}
            >
              <div style={{}}>
                <Typography.Title level={3}>Departments</Typography.Title>
                <List>
                  {categories.map((category) => {
                    return (
                      <List.Item style={{ borderStyle: "none" }}>
                        <Typography.Text
                          onClick={this.handleClick}
                          name="category"
                          id={category.name}
                          style={{ cursor: "pointer" }}
                        >
                          {category.name}
                        </Typography.Text>
                      </List.Item>
                    );
                  })}
                </List>
              </div>
            </Col>
            {/* Department List End */}
          </Row>
        </React.Fragment>
        {/* Departments, Carouse Section End  */}

        <Divider />

        {/* Size, Price, Products Section */}
        <React.Fragment>
          <Row>
            <Col lg={6} md={4} sm={22} push={1}>
              {/* Size Filter  */}
              <div>
                <Typography.Title level={4}>Popular Size</Typography.Title>
                <Radio.Group size="large">
                  <Row gutter={[0, 10]}>
                    <Col span={12}>
                      <Radio.Button onClick={this.handleClick} id="LG">
                        Large
                      </Radio.Button>
                    </Col>
                    <Col span={12}>
                      <Radio.Button onClick={this.handleClick} id="MD">
                        Medium
                      </Radio.Button>
                    </Col>
                    <Col span={12}>
                      <Radio.Button onClick={this.handleClick} id="SM">
                        Small
                      </Radio.Button>
                    </Col>
                    <Col span={12}>
                      <Radio.Button onClick={this.handleClick} id="TY">
                        Tiny
                      </Radio.Button>
                    </Col>
                  </Row>
                </Radio.Group>
              </div>
              {/* Size Filter End  */}

              <Divider style={{ borderStyle: "none" }} />

              {/* Price Filter */}
              <div>
                <Row>
                  <Col span={20}>
                    <Typography.Title level={4}>Price</Typography.Title>

                    <Slider
                      min={1}
                      max={1000}
                      onChange={this.handlePriceChange}
                      onAfterChange={this.handleOnAfterChange}
                      range={true}
                      defaultValue={[min, max]}
                      value={[min, max]}
                    />

                    <div>
                      <InputNumber
                        min={1}
                        max={1000}
                        value={min}
                        step={5}
                        onChange={this.onChangeMin}
                        onPressEnter={this.handleOnAfterChange}
                        onStep={this.handleOnAfterChange}
                      />
                      <span className="range-span"> to </span>
                      <InputNumber
                        min={1}
                        max={1000}
                        value={max}
                        step={5}
                        onChange={this.onChangeMax}
                        onStep={this.handleOnAfterChange}
                        onPressEnter={this.handleOnAfterChange}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              {/* Price Filter End */}
            </Col>

            {/* Product List Section */}
            <Col span={16} push={1}>
              <Row justify="center" align="middle" gutter={[50, 5]}>
                <Col lg={12} md={8} sm={24}>
                  <div>
                    <Button
                      type="link"
                      onClick={() => this.props.fetchProducts()}
                    >
                      Show All Products
                    </Button>
                  </div>
                </Col>
                <Col lg={12} md={8} sm={24}>
                  <div>
                    <Typography.Text>
                      <strong> {products.length} </strong>Products found.
                    </Typography.Text>
                  </div>
                </Col>

                <Divider style={{ borderStyle: "none" }} />

                {currentProducts.map((product) => {
                  return (
                    <Col lg={8} md={10} sm={12} xs={18} key={product.id}>
                      <Card
                        style={{ width: 215, marginBottom: "2rem" }}
                        cover={
                          <img
                            alt={product.name}
                            src={product.image}
                          />
                        }
                        actions={
                          product.featured
                            ? [
                                <HeartTwoTone
                                  twoToneColor="#eb2f96"
                                  spin={loading}
                                  onClick={() =>
                                    this.handleSetToFeatured(product.id)
                                  }
                                />,

                                <div
                                  style={{
                                    color: "green",
                                  }}
                                  onClick={() =>
                                    this.handleAddToCart(product.id)
                                  }
                                >
                                  <ShoppingCartOutlined />
                                  <Badge
                                    count={getProductQuantity(
                                      product.id,
                                      order.items
                                    )}
                                    style={{
                                      backgroundColor: "#52c41a",
                                    }}
                                  ></Badge>
                                </div>,
                                <DeleteTwoTone
                                  twoToneColor="#f5222d"
                                  onClick={() =>
                                    this.handleDeleteOrderItemFromShop(
                                      order.items,
                                      product.id
                                    )
                                  }
                                />,
                              ]
                            : [
                                <HeartOutlined
                                  twoToneColor="#eb2f96"
                                  spin={loading}
                                  onClick={() =>
                                    this.handleSetToFeatured(product.id)
                                  }
                                />,
                                <div
                                  style={{
                                    color: "green",
                                  }}
                                  onClick={() =>
                                    this.handleAddToCart(product.id)
                                  }
                                >
                                  <ShoppingCartOutlined />
                                  <Badge
                                    count={getProductQuantity(
                                      product.id,
                                      order.items
                                    )}
                                    style={{
                                      backgroundColor: "#52c41a",
                                    }}
                                  ></Badge>
                                </div>,
                                <DeleteTwoTone
                                  twoToneColor="#f5222d"
                                  onClick={() =>
                                    this.handleDeleteOrderItemFromShop(
                                      order.items,
                                      product.id
                                    )
                                  }
                                />,
                              ]
                        }
                      >
                        <Link to={`/shop-details/${product.id}`}>
                          <Card.Meta
                            title={product.name}
                            description={
                              product.discount_price
                                ? [
                                    <strong style={{ fontSize: "15px" }}>
                                      ${product.discount_price}
                                    </strong>,
                                    " ",
                                    <strike style={{ color: "pink" }}>
                                      ${product.price}
                                    </strike>,
                                  ]
                                : [
                                    <strong style={{ fontSize: "15px" }}>
                                      ${product.price}
                                    </strong>,
                                  ]
                            }
                          />
                          <Card.Meta description={product.category} />
                        </Link>
                      </Card>
                    </Col>
                  );
                })}

                <Divider style={{ borderStyle: "none" }} />

                {/* Paginator */}
                <Pagination
                  responsive
                  pageSize={productsPerPage}
                  defaultCurrent={1}
                  total={products.length}
                  onChange={this.paginate}
                />
                {/* Paginator End */}
              </Row>
            </Col>
            {/* Product List Section End */}
          </Row>
        </React.Fragment>
        {/* Size, Price, Products Section End  */}

        <Divider style={{ borderStyle: "none" }} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    order: state.order.order || [0],
    products: state.product.products || [0],
    offProducts: state.product.offProducts || [0],
    categories: state.product.categories,
    loading: state.product.loading,
    error: state.product.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (filterCriteria, min, max) =>
      dispatch(fetchProducts(filterCriteria, min, max)),
    fetchOrder: (id) => dispatch(fetchOrder(id)),
    fetchCategories: () => dispatch(fetchProductCategories()),
    cartAddItem: (id, callback) => dispatch(cartAddItem(id, callback)),
    cartDeleteItem: (id, callback) => dispatch(cartDeleteItem(id, callback)),
    cartDeleteOrderItem: (id, callback) =>
      dispatch(cartDeleteOrderItem(id, callback)),
    setToFeatured: (id) => dispatch(setToFeatured(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Shop);
