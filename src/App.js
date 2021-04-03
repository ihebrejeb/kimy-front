import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Courses from "./Pages/Courses";
import Whiteboard from "./Pages/Whiteboard";

import AppBase from "./features/AppBase/AppBase";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import Container from "./Pages/Container";

import LandingPage from "./Pages/LandingPage";
import { Suspense } from "react";
import Login from "./Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectuser } from "./features/AppBase/user/UserSlice";
import { useEffect } from "react";
import { auth } from "./Firebase";
import Footer from "./Pages/Footer";

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
  const user = useSelector(selectuser);

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log(userAuth);
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <Suspense fallback={<p>...Loading page please wait</p>}>
      <Router>
        {!user ? (
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/app">
              <AppBase />
            </Route>
            <Route exact path="/">
              <LandingPage />
            </Route>

            <Route exact path="/whiteboard">
              <Whiteboard />
            </Route>
            <Route exact path="/Container">
              <Container />
            </Route>

            <Route exact path="/404">
              <NoRoute />
            </Route>

            <Redirect to="/404"></Redirect>
          </Switch>
        )}
      </Router>
    </Suspense>
  );
}

export default App;
