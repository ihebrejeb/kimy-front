import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LandingPage from './Pages/LandingPage' ;
import AppBase from  './features/AppBase/AppBase' ;
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { Suspense } from "react";
import Login from "./Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectuser } from "./features/AppBase/user/UserSlice";
import { useEffect } from "react";
import { auth } from "./Firebase";

const NoRoute = React.lazy(() => import("./Pages/NoRoute"));
const LiveChat = React.lazy(()=> import("./features/AppBase/chat/LiveChat" )) ;


const SignUp = React.lazy(()=> import ('./Pages/SignUp')) ;



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
  const user = useSelector(selectuser) ; 

  const dispatch = useDispatch() ; 
  useEffect(() => {
    const unsubscribe =  auth.onAuthStateChanged(userAuth => {
       if (userAuth) {
           console.log(userAuth)
        dispatch(login({
          uid : userAuth.uid, 
          email : userAuth.email
        }))
 
       }
       else {
        dispatch(logout())
       }
    })
    return unsubscribe; 
      
    
  },[dispatch] );
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
      
      <Route exact path="/chat">
        <LiveChat />
      </Route>
      
      <Route exact path="/404">
        <NoRoute />
      </Route>
      

    </Switch>

     ):  ( 
      <Switch>
      <Route exact path="/">
      <LandingPage />
    </Route>
     
      <Route path="/app">
        <ThemeProvider theme={theme}>
          <AppBase />
        </ThemeProvider>
      </Route>
      <Redirect to="/404"></Redirect>

      </Switch>
      
    

     )
     }
      
    </Router>
    </Suspense>
  );
}

export default App;
