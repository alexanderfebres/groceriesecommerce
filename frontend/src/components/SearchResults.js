import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProductSearchResults } from "../store/actions/product";
import { fetchPostSearchResults } from "../store/actions/blog";
import { Avatar, Col, Row, Divider, Alert, Spin, Typography, List } from "antd";
import Breadcrumb from "./Breadcrumb";

class SearchResults extends Component {
  state = {
    filterCriteria: "",
  };

  componentDidMount() {
    let searchParam = this.props.match.params.filterCriteria;
    this.setState({ filterCriteria: searchParam });
    this.props.fetchProductSearchResults(searchParam);
    this.props.fetchPostSearchResults(searchParam);
  }

  componentDidUpdate() {
    const { filterCriteria } = this.state;
    let searchParam = this.props.match.params.filterCriteria;
    if (filterCriteria !== searchParam) {
      this.props.fetchProductSearchResults(searchParam);
      this.props.fetchPostSearchResults(searchParam);
      this.setState({ filterCriteria: searchParam });
    }
  }

  render() {
    const { loading, error, posts, products } = this.props;
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
        <Breadcrumb page="Search Results" title="Results" />
        {/* Breadcrumb End */}

        <Divider style={{ borderStyle: "none" }} />

        {/* results section */}
        <Row justify="start">
          <Col lg={{ span: 10, offset: 2 }}>
            <Typography.Title level={5}>Products</Typography.Title>
          </Col>
          <Col lg={{ span: 10 }}>
            <Typography.Title level={5}>Posts </Typography.Title>
          </Col>

          {/* Found Products Section */}
          <Col lg={{ span: 10, offset: 2 }}>
            <List>
              {products.length === 0 && <h3>No product matches your search</h3>}
              {products.map((product) => {
                return (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`http://127.0.0.1:8000/${product.image}`}
                        />
                      }
                      title={
                        <Link to={`/shop-details/${product.id}`}>
                          {product.name}
                        </Link>
                      }
                      description={product.description}
                    />
                  </List.Item>
                );
              })}
            </List>
          </Col>
          {/* Found Products Section End */}

          {/* Found Posts Section */}
          <Col lg={{ span: 10 }}>
            <List>
              {posts.length === 0 && <h3>No post matches your search</h3>}
              {posts.map((post) => {
                return (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`http://127.0.0.1:8000/${post.thumbnail}`}
                        />
                      }
                      title={<Link to="https://ant.design">{post.title}</Link>}
                      description={post.overview}
                    />
                  </List.Item>
                );
              })}
            </List>
          </Col>
          {/* Found Posts Section End */}
        </Row>
        {/* Results Section End */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.blog.searchResults || [],
    products: state.product.searchResults || [],
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductSearchResults: (searchParam) =>
      dispatch(fetchProductSearchResults(searchParam)),
    fetchPostSearchResults: (searchParam) =>
      dispatch(fetchPostSearchResults(searchParam)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
