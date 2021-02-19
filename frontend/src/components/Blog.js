import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchPosts,
  fetchCategories,
  fetchTags,
  fetchRecentPosts,
} from "../store/actions/blog";
import Breadcrumb from "./Breadcrumb";
import { CalendarOutlined } from "@ant-design/icons";
import {
  Avatar,
  Alert,
  Spin,
  Button,
  Col,
  Card,
  Divider,
  Input,
  Row,
  Tag,
  List,
  Pagination,
  Typography,
} from "antd";

class Blog extends Component {
  state = {
    postsPerPage: 4,
    currentPage: 1,
  };
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchRecentPosts();
    this.props.fetchCategories();
    this.props.fetchTags();
  }

  fetchFilteredPosts = (filterCriteria) => {
    this.props.fetchPosts(filterCriteria);
  };

  onSearch = (value) => {
    this.props.fetchPosts(null, value);
  };

  truncateOverview = (overview) => {
    return overview.length > 100 ? overview.substring(0, 99) + "..." : overview;
  };

  paginate = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { postsPerPage, currentPage } = this.state;
    const { posts, categories, tags, loading, error, recentPosts } = this.props;

    // pagination
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

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
        {error && (
          <div>
            <Alert message={error.message} type="info" centered />
            <br />
          </div>
        )}
        {/* Loading Error section end */}

        {/* breadcrumb */}
        <Breadcrumb page="Blog" title="Blog" />
        {/* breadcrumb end */}

        <Divider style={{ borderStyle: "none" }} />

        <React.Fragment>
          <Row>
            {/* Sidebar  section */}
            <Col
              lg={{ span: 7, offset: 1 }}
              md={{ span: 6, offset: 1 }}
              sm={{ span: 12, offset: 3 }}
              xs={{ span: 12, offset: 1 }}
            >
              {/* Search bar */}
              <Row gutter={[25, 25]}>
                <Col span={24} push={1}>
                  <Input.Search
                    placeholder="Search..."
                    allowClear
                    onSearch={this.onSearch}
                  />
                </Col>
              </Row>
              {/* Search bar  end */}

              {/* Categories */}
              <Row>
                <Typography.Title level={5}>Categories</Typography.Title>
                <Col span={24} push={1}>
                  <List>
                    {categories.map((category) => {
                      return (
                        <List.Item
                          style={{ cursor: "pointer" }}
                          onClick={() => this.fetchFilteredPosts(category.name)}
                        >
                          <Typography.Text>{category.name}</Typography.Text>
                        </List.Item>
                      );
                    })}
                  </List>
                </Col>
              </Row>
              {/* Categories end */}

              <Divider />

              {/* Recent news */}
              <Row>
                <Typography.Title level={5}>Recent News</Typography.Title>
                {recentPosts.slice(0, 3).map((post) => {
                  return (
                    <Col span={24}>
                      <Card style={{ width: 300, marginTop: 16 }}>
                        <Link to={`/blog-details/${post.id}`}>
                          <Card.Meta
                            avatar={<Avatar src={post.thumbnail} />}
                            title={post.title}
                            description={post.category}
                          />
                        </Link>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
              {/* Recent News End */}

              <Divider />

              {/* tags */}
              <Row gutter={[0, 10]}>
                <Col span={24}>
                  <Typography.Title level={5}>Search By</Typography.Title>
                </Col>
                {tags.map((tag) => {
                  return (
                    <Col span={12}>
                      <Tag
                        onClick={() => this.fetchFilteredPosts(tag.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {tag.name}
                      </Tag>
                    </Col>
                  );
                })}
              </Row>
              {/* Tags end */}
            </Col>
            {/* Sidebar  section end*/}

            {/* Posts list section */}
            <Col span={15} offset={1}>
              <Row gutter={[30, 30]}>
                {currentPosts.map((post) => {
                  return (
                    <Col
                      lg={{ span: 11, offset: 1 }}
                      md={{ span: 20, offset: 4 }}
                      sm={{ span: 22, offset: 2 }}
                      xs={{ span: 22, offset: 0 }}
                    >
                      <Card
                        style={{ width: 330 }}
                        cover={<img alt={post.name} src={post.thumbnail} />}
                        actions={[
                          <Link to={`/blog-details/${post.id}`}>
                            <Button shape="round" size="large">
                              Read More
                            </Button>
                          </Link>,
                        ]}
                      >
                        <Typography.Text type="secondary">
                          <CalendarOutlined /> {post.timestamp.slice(0, 10)}
                        </Typography.Text>
                        <br />
                        <Card.Meta
                          title={post.title}
                          description={this.truncateOverview(post.overview)}
                        />
                      </Card>
                    </Col>
                  );
                })}
                {/* Paginator */}
                <Col span={24} push={1}>
                  <Pagination
                    responsive
                    pageSize={postsPerPage}
                    defaultCurrent={1}
                    total={posts.length}
                    onChange={this.paginate}
                  />
                </Col>
                {/* Paginator  end*/}
              </Row>
            </Col>
            {/* Posts list section end */}
          </Row>
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.blog.posts,
    recentPosts: state.blog.recentPosts,
    categories: state.blog.categories,
    tags: state.blog.tags,
    loading: state.blog.loading,
    error: state.blog.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: (filterCriteria, value) =>
      dispatch(fetchPosts(filterCriteria, value)),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchTags: () => dispatch(fetchTags()),
    fetchRecentPosts: () => dispatch(fetchRecentPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
