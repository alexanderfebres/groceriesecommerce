import React from "react";
import "../css/Breadcrumb.styles.css";
import { Col, Row } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import breadCrumb from "../img/breadcrumb_image_1.webp";

export default function Breadcrumb({ page, title }) {
  return (
    <div>
      {/* Breadcrumb component */}
      <Row>
        <Col align="middle" span={24}>
          <div className="breadcrumb-container">
            <img className="image" src={breadCrumb} alt={title} />
            <h1 className="breadcrumb-title">Welcome to {title}</h1>
            <div>
              <Link to="/" className="home-link">
                Home
              </Link>
              <CaretRightOutlined style={{ color: "white" }} />
              <h4 className="page">{page}</h4>
            </div>
          </div>
        </Col>
      </Row>
      {/* Breadcrumb component end */}
    </div>
  );
}
