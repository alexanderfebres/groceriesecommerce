import React, { Component } from "react";
import "../css/Header.styles.css";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrder } from "../store/actions/order";
import {
  fetchProducts,
  fetchProductCategories,
} from "../store/actions/product.js";
import { DownOutlined, HeartTwoTone } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Badge,
  Layout,
  Menu,
  Typography,
  Row,
  Col,
  Space,
  Dropdown,
  Form,
  Input,
} from "antd";

const { Header } = Layout;
const { Text, Title } = Typography;

class SearchBar extends Component {
  state = {
    filterCriteria: "",
  };
  componentDidMount() {
    this.props.fetchOrder();
    this.props.fetchProducts();
    this.props.fetchCategories();
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = ({ key }) => {
    const department = key;
    this.props.history.push(`/search-results/${department}`);
  };

  onFinish = (e) => {
    const { filterCriteria } = this.state;
    this.props.history.push(`/search-results/${filterCriteria}`);
    this.setState({ filterCriteria: "" });
  };

  render() {
    const { filterCriteria } = this.state;
    const {
      isAuthenticated,
      items,
      orderTotal,
      categories,
      featuredCount,
    } = this.props;

    const departments = (
      <Menu onClick={this.onClick}>
        {categories.map((cat) => {
          return (
            <Menu.Item key={cat.id}>
              <Link>{cat.name}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    );
    return (
      <Header style={{ backgroundColor: "white", marginBottom: "70px" }}>
        <Row justify="center" align="middle">
          {/* Deparments Dropdown */}
          <Col
            lg={{ span: 6, push: 1 }}
            md={{ span: 16, push: 1 }}
            xs={{ span: 24, push: 0 }}
          >
            <div style={{ marginTop: "8px" }}>
              <Dropdown overlay={departments} trigger={["click"]}>
                <Button
                  style={{
                    background: "#95de64",
                    width: "300px",
                    height: "50px",
                  }}
                >
                  <Title level={4} strong style={{ color: "#ffffff" }}>
                    All departments
                    <DownOutlined style={{ color: "white" }} />
                  </Title>
                </Button>
              </Dropdown>
            </div>
          </Col>
          {/* Departments Dropdown end */}

          {/* Search Filter */}
          <Col
            lg={{ span: 12, push: 1 }}
            md={{ span: 16, push: 1 }}
            sm={{ span: 24, push: 0 }}
          >
            <Form name="search-form" onFinish={this.onFinish}>
              <div className="search-bar">
                <Input
                  name="filterCriteria"
                  onChange={this.handleChange}
                  value={filterCriteria}
                  placeholder="What do you need ?"
                  style={{ width: "20rem", height: "3.2rem" }}
                ></Input>
                <Button
                  htmlType="submit"
                  style={{
                    backgroundColor: "#95de64",
                    height: "50px",
                    marginTop: "15px",
                  }}
                >
                  <Text style={{ color: "white" }} strong>
                    SEARCH
                  </Text>
                </Button>
              </div>
            </Form>
          </Col>
          {/* Search Filter End */}

          {/* Featured, Products, total price info */}
          <Col
            lg={{ span: 6, push: 1 }}
            md={{ span: 22, pull: 4 }}
            sm={{ span: 24, push: 4 }}
          >
            <Space size="large">
              <div>
                <HeartTwoTone twoToneColor="#eb2f96" size="large" />
                <Badge count={isAuthenticated ? `${featuredCount}` : 0} />
              </div>
              <div>
                <Link to="/shopping-cart">
                  <FontAwesomeIcon
                    icon={faShoppingBag}
                    color="green"
                    size="lg"
                  />
                  <Badge
                    count={isAuthenticated ? `${items.length}` : 0}
                    style={{ backgroundColor: "green" }}
                  />
                </Link>
              </div>

              <div>
                items:
                <span>
                  {isAuthenticated ? <strong>${orderTotal}</strong> : 0}
                </span>
              </div>
            </Space>
          </Col>
          {/* Featured, Products, total price info  end*/}
        </Row>
      </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    items: state.order.order.items || [],
    orderTotal: state.order.orderTotal,
    featuredCount: state.product.featuredCount,
    categories: state.product.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrder: () => dispatch(fetchOrder()),
    fetchProducts: () => dispatch(fetchProducts()),
    fetchCategories: () => dispatch(fetchProductCategories()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBar)
);
