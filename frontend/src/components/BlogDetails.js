import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPosts, fetchSinglePost } from "../store/actions/blog";
import Breadcrumb from "./Breadcrumb";
import {
  Avatar,
  Alert,
  Spin,
  Button,
  Col,
  Card,
  Divider,
  Image,
  Row,
  Typography,
} from "antd";

const Blog = (props) => {
  const id = props.match.params.postID;
  useEffect(() => {
    props.fetchSinglePost(id);
  }, []);

  const { relatedPosts, post, tags, loading, error } = props;
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
          <Alert message={error.message} type="info" />
          <br />
        </div>
      )}
      {/* Loading Error section end */}

      {/* Breadcrumb */}
      <Breadcrumb page="Blog" title="blog" />
      {/* Breadcrumb end*/}

      <Divider style={{ borderStyle: "none" }} />

      {/* blog details section */}
      <React.Fragment>
        <Row>
          <Col span={24} offset={3}>
            <Row>
              <Col span={20}>
                <div style={{ marginRight: "4rem" }}>
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    style={{
                      width: "100%",
                      maxWidth: "1048px",
                      height: "auto",
                      maxHeight: "335px",
                    }}
                  />
                  <br />
                  <Typography.Paragraph>{post.overview}</Typography.Paragraph>
                  <Typography.Title level={2}>{post.title}</Typography.Title>
                  <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
                </div>
              </Col>
              <Divider />
              <Col
                lg={{ span: 12, offset: 0 }}
                md={{ span: 12, offset: 0 }}
                sm={{ span: 20, offset: 0 }}
                xs={{ span: 20, offset: 0 }}
              >
                <Card style={{ width: 300, border: "none" }}>
                  <Card.Meta
                    avatar={<Avatar src={post.thumbnail} />}
                    title={post.user}
                  />
                </Card>
              </Col>
              <Col
                lg={{ span: 12, offset: 0 }}
                md={{ span: 12, offset: 0 }}
                sm={{ span: 20, offset: 1 }}
                xs={{ span: 20, offset: 1 }}
              >
                <Row>
                  <Col span={22}>
                    <Typography.Title level={5}>
                      Category:{" "}
                      <span style={{ fontSize: "15px", color: "#bfbfbf" }}>
                        {post.category}
                      </span>
                    </Typography.Title>
                  </Col>
                </Row>
                <Row>
                  <Col span={22}>
                    <Typography.Title level={5}>
                      Tags:
                      <span style={{ fontSize: "15px", color: "#bfbfbf" }}>
                        {tags.map((tag) => {
                          return `${tag.name}, `;
                        })}
                      </span>
                    </Typography.Title>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </React.Fragment>
      {/* Blog details section end*/}
      <Divider style={{ borderStyle: "none" }} />
      {/* Related posts section */}
      <React.Fragment>
        <Row align="center" gutter={[15, 30]}>
          <Divider style={{ borderStyle: "none" }}>
            <Typography.Title style={{ textAlign: "center" }}>
              Posts you may like
            </Typography.Title>
          </Divider>
          {relatedPosts.slice(0, 3).map((relatedPost) => {
            return (
              relatedPost.id !== post.id && (
                <Col
                  lg={{ span: 7, offset: 1 }}
                  md={{ span: 10, offset: 1 }}
                  sm={{ span: 22, offset: 2 }}
                >
                  <Card
                    style={{ width: 330 }}
                    cover={
                      <img
                        alt={relatedPost.title}
                        src={relatedPost.thumbnail}
                      />
                    }
                    actions={[
                      <Button
                        shape="round"
                        size="large"
                        href={`/blog-details/${relatedPost.id}`}
                      >
                        Read More
                      </Button>,
                    ]}
                  >
                    <Card.Meta
                      title={relatedPost.title}
                      description={`Category: ${relatedPost.category}`}
                    />
                  </Card>
                </Col>
              )
            );
          })}
        </Row>
      </React.Fragment>
      {/* Related posts section end */}
      <Divider style={{ borderStyle: "none" }} />
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    relatedPosts: state.blog.posts,
    post: state.blog.post,
    tags: state.blog.tags,
    loading: state.blog.loading,
    error: state.blog.error,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: (filterCriteria) => dispatch(fetchPosts(filterCriteria)),
    fetchSinglePost: (id) => dispatch(fetchSinglePost(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Blog);
