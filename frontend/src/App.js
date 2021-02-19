import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { authCheckState } from "./store/actions/auth";
import { connect } from "react-redux";
import Layout from "./components/Layout";

function App(props) {
  useEffect(() => {
    props.checkState();
  }, []);
  return (
    <Router>
      <Layout />
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkState: () => dispatch(authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
