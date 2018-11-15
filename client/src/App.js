// import React from "react";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProjectManager from "./pages/ProjectManager";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import UploadForm from "./components/UploadForm";

class App extends Component {

  state = {
    user: {},
    userEmail: "",
    userName: "",
    userID: "",
    loginText: "Login"
  };

  // newState will be an object that we are passing in.
  // additional state
  updateAppState = (newState) => {
    this.setState(newState);
  }

  render() {
    
    console.log("State:");
    console.log(this.state);

    // is this refreshing everything.
    return (
      
      <Router>
      <div>
        {/* THIS IS WHERE NAV IS CALLED */}
        <Nav userName={this.state.userName} loginText={this.state.loginText}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/books/:id" component={Detail} />
          {/* <Route exact path="/Login" component={Login} /> */}

          {/* this is passing down the function as a prop which gives the ability to update the state in App.js */}
          <Route path='/Login' render={() => <Login updateAppState={this.updateAppState} />} />

          <Route path='/UploadForm' render={() => <UploadForm userID={this.state.userID} />} />


          <Route path="/ProjectManager" component={ProjectManager} />

          {/* Need Route to Upload Form so that we can pass it the props, even if we never hit the route */}
          <Route component={NoMatch} />
        </Switch>
        <Footer></Footer>
      </div>
    </Router>

  )}

}


export default App;

// Questions for Jordan:

// How can I get the state to be global?
// I am getting the logged in user into the state in Login.js, but need that be be accessible from other scripts. Can I just have one parent stateful component?
// tried redux, tried to cheat with firebase, getting async/promise issues.

// How do I structure where my logic and functions go? Why are my functions getting called on load? I want them on click/submit etc.

// least priority:
// How to manage upload of obscure file types, blobs? .assetbundle
