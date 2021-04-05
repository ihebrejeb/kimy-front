import React, { Suspense } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const LandingPage = React.lazy(() => import("./Pages/LandingPage"));
const Login = React.lazy(() => import("./Pages/Login"));
const AppBase = React.lazy(() => import("./features/AppBase/AppBase"));
const NoRoute = React.lazy(() => import("./Pages/NoRoute"));
const SignUp = React.lazy(() => import("./Pages/SignUp"));

function App() {
  /* useEffect(() => {
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
  }, [dispatch]); */
  return (
    <Suspense fallback={<p>...Loading page please wait</p>}>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/app">
            <AppBase />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/404">
            <NoRoute />
          </Route>
          <Redirect to="/404"></Redirect>
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
