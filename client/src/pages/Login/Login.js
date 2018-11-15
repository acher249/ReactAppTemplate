import React from "react";
import firebase from "./../../Firebase.js";


const Login = (props) => {

  // shorthand for props.updateAppState which is the function to set the state back up to app.js
  const { updateAppState } = props;

  var toggleSignIn = () => {
    if (firebase.auth().currentUser) {
        
      firebase.auth().signOut();

      // This is causing an error

      updateAppState({
        // user: {},
        userEmail: "",
        userName: "",
        userID: "",
        loginText: "Login"
      })

      // [END signout]
    } else {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }

      // Sign in with email and pass.
      // [START authwithemail]
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(data => {

        // (Adam) This is where we are pushing the data back into the app.js State
        var user = firebase.auth().currentUser;
        var userEmail = user.email;
        var split = userEmail.split("@");
        var userName = split[0];
        var userID = user.uid;
        var loginText = "Logout"

        updateAppState({
          user,
          userEmail,
          userName,
          userID,
          loginText
        })
      })
      
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]

        //add thro error in all catches
        // throw error;
      });
      // [END authwithemail]
    }
    document.getElementById('quickstart-sign-in').disabled = true;
  }

    /**
     * Handles the sign up button press.
     */

  var handleSignUp = () => {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
      // throw error;
    });
    // [END createwithemail]
  }


  var fsendEmailVerification = () => {
      // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      // Email Verification sent!
      // [START_EXCLUDE]
      alert('Email Verification Sent!');
      // [END_EXCLUDE]
    });
    // [END sendemailverification]
  }

  var sendPasswordReset = () => {
    var email = document.getElementById('email').value;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // Password Reset Email Sent!
      // [START_EXCLUDE]
      alert('Password Reset Email Sent!');
      // [END_EXCLUDE]
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode === 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
      // throw error;
    });
    // [END sendpasswordemail];
  }
    
      //iffie immediate invoke function call**
  var initApp = (() => {

    //TO DO:
    // clear inpiut fields blank*******

    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
      // [START_EXCLUDE silent]
      // document.getElementById('quickstart-verify-email').disabled = true;
      // [END_EXCLUDE]
      if (user) {

        // [START_EXCLUDE]
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
        document.getElementById('quickstart-sign-in').textContent = 'Sign out';
        document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');

        // (Adam) Clear the input field
        document.getElementById('email').textContent = "";
        document.getElementById('password').textContent = "";

        // if (!emailVerified) {
        //   document.getElementById('quickstart-verify-email').disabled = false;
        // }
        // [END_EXCLUDE]
      } else {
        // User is signed out.
        // [START_EXCLUDE]
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
        document.getElementById('quickstart-sign-in').textContent = 'Sign in';
        document.getElementById('quickstart-account-details').textContent = 'null';

        // (Adam) Clear the input field
        document.getElementById('email').textContent = "";
        document.getElementById('password').textContent = "";
        // [END_EXCLUDE]
      }
      // [START_EXCLUDE silent]
      document.getElementById('quickstart-sign-in').disabled = false;
      // [END_EXCLUDE]
    });
    // [END authstatelistener]
  })();

    // dont need this because we have iffie function
    // window.onload = function() {
    //   initApp();
    // };

  return (
    <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <br></br>
        <h4 style={{textAlign: "center"}}>Login</h4>
        <br></br>
      <main className="mdl-layout__content mdl-color--grey-100">
        <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
    
          {/* <!-- Container for the demo --> */}
          <div className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
            <div className="mdl-card__title mdl-color--light-blue-600 mdl-color-text--white">
              {/* <h2 className="mdl-card__title-text" style={{ fontSize: 20, clear: "both", marginTop: 20, textAlign: "center"}}>Login</h2> */}
            </div>
            <div className="mdl-card__supporting-text mdl-color-text--grey-600" style={{ fontSize: 20, clear: "both", marginTop: 20, textAlign: "center"}}>
              <p>Enter an email and password below and either sign in to an existing account or sign up</p>
    
              <input className="mdl-textfield__input"  type="text" id="email" name="email" placeholder="Email"></input>
              &nbsp;&nbsp;&nbsp;
              <input className="mdl-textfield__input" type="password" id="password" name="password" placeholder="Password"></input>
              <br/><br/>
              <button className="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-in" name="signin" onClick={toggleSignIn}>Sign In</button>
              &nbsp;&nbsp;&nbsp;
              <button className="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-up" name="signup" onClick={handleSignUp}>Sign Up</button>
              &nbsp;&nbsp;&nbsp;
              {/* <button className="mdl-button mdl-js-button mdl-button--raised" disabled id="quickstart-verify-email" name="verify-email" onClick={this.sendEmailVerification}>Send Email Verification</button>
              &nbsp;&nbsp;&nbsp; */}
              <button className="mdl-button mdl-js-button mdl-button--raised" id="quickstart-password-reset" name="verify-email" onClick={sendPasswordReset}>Send Password Reset Email</button>
    
              {/* <!-- Container where we'll display the user details --> */}
              <div className="quickstart-user-details-container">
                sign-in status: <span id="quickstart-sign-in-status">Unknown</span>
                <div>current user:</div>
                <br></br>
                <pre style={{ fontSize: 10,textAlign: "left"}}><code id="quickstart-account-details">null</code></pre>
              </div>
            </div>
          </div>
    
        </div>
      </main>
    </div>
  );
}


//start from here
export default Login;
