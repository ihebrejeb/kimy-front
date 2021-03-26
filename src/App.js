import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import AppBase from "./features/AppBase/AppBase";

import NoRoute from "./Pages/NoRoute";

import SignUp from "./Pages/SignUp";
import LiveChat from "./features/AppBase/chat/LiveChat";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/app">
          <AppBase />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/chat">
          <LiveChat />
        </Route>

        <Route exact path="/404">
          <NoRoute />
        </Route>
        <Redirect to="/404"></Redirect>
      </Switch>
    </Router>
  );
}

export default App;
