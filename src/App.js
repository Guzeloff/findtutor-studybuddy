import React from "react";

import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Register from "./components/Register";
import CoursesNav from "./components/CoursesNav";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from "./components/Profile";
import ProfileRegister from "./components/ProfileRegister";
import Tutori from "./components/Tutori";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
import Questions from "./components/Questions";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/questions" component={Questions} />
          <Route path="/tutori" component={Tutori} />
          <Route path="/profileregister" component={ProfileRegister} />
          <Route path="/profile/:username/" component={Profile} />
          <Route exact={true} path="/" component={Home} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
