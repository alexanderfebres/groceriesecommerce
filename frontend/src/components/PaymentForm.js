import React from "react";
import authAxios from "../axios";
import { paymentURL } from "../constants";
import { CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { Alert, Button, Spin } from "antd";

class PaymentForm extends React.Component {
  state = {
    loading: false,
    success: false,
    error: null,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      return;
    }

    // Get Token
    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);
    const token = result.token.id;

    // Proccess Payment
    authAxios
      .post(paymentURL, { token })
      .then((res) => {
        this.setState({ loading: false, success: true });
      })
      .catch((err) => {
        this.setState({ success: false, error: err.message });
      });
  };

  render() {
    const { success, error, loading } = this.state;
    const { stripe } = this.props;
    return (
      <div>
        {/* Success Fail section */}
        {loading && (
          <div>
            <Spin tip="Loading..." />
            <br />
          </div>
        )}
        {success && (
          <div>
            <Alert
              style={{ backgroundColor: "#73d13d" }}
              message="Congratulations!.. your order has been successfully payed "
            />
            <br />
          </div>
        )}
        {error && <Alert message={error.message} type="info" />}
        {/* Success Fail Section End */}

        {/* Stripe Form */}
        <form onSubmit={this.handleSubmit}>
          <fieldset style={style.formGroup}>
            <CardElement options={CARD_OPTIONS} />
          </fieldset>
          <Button htmlType="submit" disabled={!stripe}>
            Pay
          </Button>
        </form>
        {/* Stripe Form end */}
      </div>
    );
  }
}

const InjectedPaymentForm = () => {
  return (
    <ElementsConsumer>
      {({ elements, stripe }) => (
        <PaymentForm elements={elements} stripe={stripe} />
      )}
    </ElementsConsumer>
  );
};

// Stripe form Styling

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#ffffff" },
      "::placeholder": { color: "#ffffff" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const style = {
  formGroup: {
    margin: "0 15px 20px 0",
    padding: "0",
    borderStyle: "none",
    backgroundColor: "#7cb305",
    willChange: "opacity, transform",
    boxShadow:
      "0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #829fff",
    borderRadius: "4px",
  },
};

export default InjectedPaymentForm;
