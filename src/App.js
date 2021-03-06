import React from 'react';
import './App.css';
import LandingPage from './Template/LandingPage';
import {BrowserRouter as Router , Switch , Route } from "react-router-dom" ; 
import SignIn from './Components/SignIn';

function App() {
  return (

    <Router> 
    <Switch> 
           
    <Route path="/login">
           <SignIn /> 
           </Route>

           <Route path="/">
           <LandingPage /> 
           </Route>

          
         

           </Switch>
    </Router>
  );
}

export default App;
