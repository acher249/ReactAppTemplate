import React from "react";
import { Link } from 'react-router-dom'

const Nav = props => {

  return(
    <nav className="navbar navbar-expand-lg navbar-light " style={{ marginBottom: 0, backgroundColor: "#fafafa" }}>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    {/* Make this just an icon */}
    <img src="/TurningStar.gif" alt="gif" height="100" width="100"/>

    <div className="collapse navbar-collapse" id="navbarTogglerDemo03" style={{ float: "left"}}>
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/" style={{ marginRight: 10}}>About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/ProjectManager" style={{ marginRight: 10}}>Manage Projects</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link diasbled" to="/books" style={{ marginRight: 10}}>Project Information</Link>
        </li>
      </ul>
    </div>

    {/* if user is signed in turn this on */}
    <a id="usernameText" className=" nav-link disabled" style={{ float: "right", color: "#808080", marginRight: 20 }}> {props.userName} </a>

    {/* if logged in make Login say Logout */}
    {/* NEED TO ADD THIS LOGIC BACK IN */}
    <Link id="loginButton" className="nav-link" to="/Login" style={{ float: "right", color: "#808080" }}>{props.loginText}</Link>
  </nav>
  );
};

export default Nav;
