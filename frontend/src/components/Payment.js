import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrder } from "../store/actions/order";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Breadcrumb from "./Breadcrumb";
import InjectedPaymentForm from "./PaymentForm";
import { Avatar, Col, Divider, List, Typography, Alert, Spin } from "antd";

// const stripePromise = loadStripe(
//   "pk_test_51HCp0mChr0ND5qAmuk91dZ31rMk7wnsmPc49wuBu9WF5ddxUaiIj6ezbyjJbv7s0zVryxTsPGrno6qWPPPle9ts6001354Ayte"
// );

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_ID);

const Payment = (props) => {
  useEffect(() => {
    props.fetchOrder();
  }, []);

  const { items, order, orderTotal, loading, error } = props;

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
      {/* Loading Error Section end */}

      {/* breadcrumb */}
      <Breadcrumb page="Payment" title="Payment" />
      {/* breadcrumb  end*/}

      <Divider style={{ borderStyle: "none" }} />

      {/* Order Summary Section */}
      <Col span={20} offset={2}>
        <List itemLayout="horizontal">
          {items.map((item) => {
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`http://127.0.0.1:8000/${item.product.image}`}
                    />
                  }
                  title={item.product.name}
                  description={
                    item.product.discount_price
                      ? `$ ${item.product.discount_price} x ${item.quantity}`
                      : `$ ${item.product.price} x ${item.quantity}`
                  }
                />
              </List.Item>
            );
          })}
          <List.Item>
            <List.Item.Meta
              title={
                <Typography.Title level={2}>
                  Total: $ {orderTotal}
                </Typography.Title>
              }
            />
          </List.Item>
        </List>
      </Col>
      {/* Order Summary End */}
      <Divider />
      {/* Payment Form */}
      <Col span={20} offset={2}>
        {order.address && order.customer ? (
          <Elements stripe={stripePromise}>
            <InjectedPaymentForm />
          </Elements>
        ) : (
          <Link to="/checkout">
            Go through the <strong>checkout</strong> process first in order to
            process the payment
          </Link>
        )}
      </Col>
      {/* Payment Form End */}
      <Divider style={{ borderStyle: "none" }} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    order: state.order.order || [],
    items: state.order.order.items || [],
    orderTotal: state.order.orderTotal,
    loading: state.order.loading,
    error: state.order.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrder: () => dispatch(fetchOrder()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
