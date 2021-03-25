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
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import Lobby from "./features/AppBase/onlinseSession/Lobby";

import NoRoute from "./Pages/NoRoute";

import SignUp from "./Pages/SignUp";
import LiveChat from "./features/AppBase/chat/LiveChat";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#0056D2",
    },
  },
});
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/app">
          <ThemeProvider theme={theme}>
            <AppBase />
          </ThemeProvider>
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
