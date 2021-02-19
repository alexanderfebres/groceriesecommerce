import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import Routes from "../Routes";

export default function Layout() {
  return (
    <div>
      <Header />
      <SearchBar />
      <Routes />
      <Footer />
    </div>
  );
}
