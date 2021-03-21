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

const NoRoute = React.lazy(() => import("./Pages/NoRoute"));
const LiveChat = React.lazy(() => import("./features/AppBase/chat/LiveChat"));
const SignUp = React.lazy(() => import("./Pages/SignUp"));

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
        <Route exact path="/video/:roomName">
          <Lobby></Lobby>
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
