import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Shop from "./components/Shop";
import Checkout from "./components/Checkout";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import ShoppingCart from "./components/ShoppingCart";
import ProductDetail from "./components/ProductDetail";
import BlogDetails from "./components/BlogDetails";
import Payment from "./components/Payment";
import SearchResult from "./components/SearchResults";

import Login from "./components/Login";
import Signup from "./components/Signup";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/shop" component={Shop} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/shopping-cart" component={ShoppingCart} />
    <Route path="/contact" component={Contact} />
    <Route path="/blog" component={Blog} />
    <Route path="/blog-details/:postID" component={BlogDetails} />
    <Route path="/shop-details/:productID" component={ProductDetail} />
    <Route path="/search-results/:filterCriteria" component={SearchResult} />
    <Route path="/payment" component={Payment} />
  </Switch>
);

export default Routes;
