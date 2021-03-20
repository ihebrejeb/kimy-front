import React from "react";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Courses from "./Pages/Courses";
import Whiteboard from "./Pages/Whiteboard";

import AppBase from "./features/AppBase/AppBase";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import NoRoute from "./Pages/NoRoute";
import Container from "./Pages/Container";
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
        <Route exact path="/courses">
          <Courses />
        </Route>
        <Route exact path="/activities">
          <SignUp />
        </Route>
        <Route exact path="/whiteboard">
          <Whiteboard />
        </Route>
        <Route exact path="/Container">
          <Container />
        </Route>
        <Route exact path="/">
          <LandingPage />
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
