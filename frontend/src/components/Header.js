import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import "../css/Header.styles.css";
import { Link } from "react-router-dom";

const CustomHeader = (props) => {
  useEffect(() => {
    const burger = async () => {
      const menu = document.querySelector("#mobile-menu");
      const menuLinks = document.querySelector(".nav-menu");

      menu.addEventListener("click", function () {
        menu.classList.toggle("is-active");
        menuLinks.classList.toggle("active");
      });
    };

    burger();
  }, []);

  const { token } = props;
  return (
    // Navbar
    <div className="nav-container">
      <div className="navbar">
        <Link to="/">
          <h4 className="navbar-logo">My Groceries</h4>
        </Link>

        {/* Hamburger */}
        <div className="menu-toggle" id="mobile-menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        {/* Hamburger end */}

        {/* Nav Menu */}
        <ul className="nav-menu">
          <li>
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="nav-links">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/blog" className="nav-links">
              Blog
            </Link>
          </li>

          <li>
            <Link to="/contact" className="nav-links">
              Contact
            </Link>
          </li>
          <li>
            {token !== null ? (
              <div>
                <Link className="nav-links-auth" onClick={() => props.logout()}>
                  Logout
                </Link>
              </div>
            ) : (
              <Link to="/login" className="nav-links-auth">
                login
              </Link>
            )}
          </li>
          <li>
            {!token && (
              <Link to="/signup" className="nav-links-auth">
                Signup
              </Link>
            )}
          </li>
        </ul>
        {/* Nav Menu End*/}
      </div>
    </div>
    // Navbar
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
