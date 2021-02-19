import React, { useEffect } from "react";
import {
  fetchProducts,
  fetchFeaturedProducts,
} from "../store/actions/product.js";
import { fetchPosts } from "../store/actions/blog.js";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { houseCarouseSettings } from "./carouselSettings";
import { HeartFilled, WindowsOutlined } from "@ant-design/icons";

import {
  Alert,
  Button,
  Card,
  Divider,
  Carousel,
  Col,
  Row,
  Image,
  Spin,
  Typography,
  Tabs,
} from "antd";

import homeBanner from "../img/hero.jpg";
import homeBanner2 from "../img/banner/banner-1.jpg";
import homeBanner3 from "../img/banner/banner-2.jpg";

const { TabPane } = Tabs;

const Home = (props) => {
  useEffect(() => {
    props.fetchProducts();
    props.fetchPosts();
    props.fetchFeaturedProducts("1");
  }, []);

  const changeTab = (activeKey) => {
    fetchFeaturedProductList(activeKey);
  };

  const fetchFeaturedProductList = (key) => {
    props.fetchFeaturedProducts(key);
  };

  const truncateOverview = (overview) => {
    return overview.length > 80 ? overview.substring(0, 80) + "..." : overview;
  };

  const { products, posts, loading, error, featuredProducts } = props;

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
      {/* Loading Error Section  end*/}

      <Divider style={{ borderStyle: "none" }} />

      {/* Hero section */}
      <React.Fragment>
        <Row justify="end">
          <Col lg={{ span: 16, pull: 1 }}>
            <div>
              <img
                src={homeBanner}
                style={{ width: "60%", marginLeft: "38%" }}
              />
              <div
                style={{
                  marginTop: "-10rem",
                  marginBottom: "12rem",
                  marginLeft: "3rem",
                }}
              >
                <Typography.Title level={5}>
                  Free Pick up and Delivery Avalibale
                </Typography.Title>
                <Button
                  href="/shop"
                  style={{ backgroundColor: "#b7eb8f", color: "white" }}
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
      {/* Hero section end */}

      {/* Carousel Product List Section  */}
      <Row>
        <Col span={22} offset={1} align="center">
          <Carousel arrows {...houseCarouseSettings} autoplay>
            {products.map((product) => {
              return (
                <div key={product.id}>
                  <Card
                    style={{ width: 185, marginTop: "15px" }}
                    cover={<img alt="" src={product.image} />}
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
                    </Link>
                  </Card>
                </div>
              );
            })}
          </Carousel>
        </Col>
      </Row>
      {/* Carousel Product List Section End */}

      <Divider
        style={{
          marginTop: "50px",
          marginBottom: "15px",
        }}
      >
        <Typography.Title>Featured Products</Typography.Title>
      </Divider>

      {/* Tab Featured Products Section */}
      <React.Fragment>
        <Tabs
          name="product-tab"
          defaultActiveKey="1"
          size="large"
          centered
          onTabClick={changeTab}
        >
          {/* ALL section */}
          <TabPane tab="All" key="1">
            <Row align="center">
              {featuredProducts.slice(0, 14).map((product) => {
                return (
                  <Col lg={6} md={12} sm={24} align="middle" key={product.id}>
                    <Card
                      style={{ width: 248, marginTop: "15px" }}
                      cover={<img alt={product.name} src={product.image} />}
                    >
                      <HeartFilled style={{ color: "red" }} />
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
                      </Link>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </TabPane>
          {/* ALL section End */}

          {/* Fresh meat Section */}
          <TabPane tab="Fresh Meat" key="2">
            <Row align="center">
              {featuredProducts.map((product) => {
                return (
                  <Col lg={6} md={12} sm={24} align="middle" key={product.id}>
                    <Card
                      style={{ width: 248, marginTop: "15px" }}
                      cover={<img alt={product.name} src={product.image} />}
                    >
                      <HeartFilled style={{ color: "red" }} />
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
                      </Link>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </TabPane>
          {/* Fresh meat Section End */}

          {/* Vegetables Section */}
          <TabPane tab="Vegetables" key="3">
            <Row align="center">
              {featuredProducts.map((product) => {
                return (
                  <Col lg={6} md={12} sm={24} align="middle" key={product.id}>
                    <Card
                      style={{ width: 248, marginTop: "15px" }}
                      cover={<img alt={product.name} src={product.image} />}
                    >
                      <HeartFilled style={{ color: "red" }} />
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
                      </Link>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </TabPane>
          {/* Vegetables Section End */}

          {/* Fast Food Section */}
          <TabPane tab="Fast Food" key="4">
            <Row align="center">
              {featuredProducts.map((product) => {
                return (
                  <Col lg={6} md={12} sm={24} align="middle" key={product.id}>
                    <Card
                      style={{ width: 215, marginTop: "15px" }}
                      cover={<img alt={product.name} src={product.image} />}
                    >
                      <HeartFilled style={{ color: "red" }} />
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
                      </Link>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </TabPane>
          {/* Fast Food Section End */}
        </Tabs>
      </React.Fragment>
      {/* Tab Featured Products Section End */}

      <Divider />

      {/* Banner Section */}
      <Row align="center" gutter={[5, 25]}>
        <Col
          lg={{ span: 11, offset: 1 }}
          md={{ span: 16, offset: 1 }}
          sm={{ span: 23, offset: 1 }}
          xs={{ span: 22, offset: 1 }}
        >
          <Image src={homeBanner2} />
        </Col>
        <Col
          lg={{ span: 11, offset: 1 }}
          md={{ span: 16, offset: 1 }}
          sm={{ span: 23, offset: 1 }}
          xs={{ span: 22, offset: 1 }}
        >
          <Image src={homeBanner3} />
        </Col>
      </Row>
      {/* Banner Section end */}

      <Divider>
        <Typography.Title>From The Blog</Typography.Title>
      </Divider>

      {/* Blog List Section */}
      <React.Fragment>
        <Row justify="center" gutter={[5, 25]}>
          {posts.slice(0, 3).map((post) => {
            return (
              <Col
                lg={{ span: 7, push: 1 }}
                md={{ span: 12, push: 1 }}
                sm={{ span: 20, push: 1 }}
                xs={{ span: 20, push: 0 }}
              >
                <Card
                  style={{ width: 320 }}
                  cover={<img alt={post.title} src={post.thumbnail} />}
                  actions={[
                    <Link to={`/blog-details/${post.id}`}>
                      <Button shape="round" size="large">
                        Read More
                      </Button>
                    </Link>,
                  ]}
                >
                  <Card.Meta
                    title={[<Typography.Text>{post.title}</Typography.Text>]}
                    description={truncateOverview(post.overview)}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </React.Fragment>
      {/* Blog List Section end */}

      <Divider style={{ borderStyle: "none" }} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.blog.posts,
    products: state.product.products || [0],
    featuredProducts: state.product.featuredProducts || [0],
    loading: state.product.loading,
    error: state.product.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchProducts: () => dispatch(fetchProducts()),
    fetchFeaturedProducts: (key) => dispatch(fetchFeaturedProducts(key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
