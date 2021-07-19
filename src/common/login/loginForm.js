import React, { useState } from "react";
import Alert from "@material-ui/lab";
import Header from "../header/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

const loginForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitLoginForm() {
    setIsSubmitted(true);
  }
  turn(
    <>
      <div>
        {!isSubmitted ? (
          <Header submitLoginForm={submitLoginForm} />
        ) : (
          <Header>
            <Alert severity="success">Login Successful!</Alert>
            <Route exact path="/"></Route>
          </Header>
        )}
      </div>
    </>
  );
};

export default loginForm;
