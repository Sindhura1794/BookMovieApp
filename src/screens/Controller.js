import React from "react";
import { Route } from "react-router-dom";

import Header from "../common/header/Header";
import BookShow from "./bookshow/BookShow";
import Details from "./details/Details";
import Home from "./home/Home";

function Controller() {
  return (
    <div>
      <Header />

      <Route exact path="/">
        <Home />
      </Route>
      <Route
        path="/details"
        render={(props) => <Details {...props}></Details>}
      ></Route>
      <Route
        path="/bookshow"
        render={(props) => <BookShow {...props}></BookShow>}
      ></Route>
    </div>
  );
}

export default Controller;
