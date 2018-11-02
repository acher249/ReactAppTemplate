import React from "react";

const Jumbotron = ({ children }) => (
  <div
    style={{ height: 120, clear: "both", paddingTop: 20, textAlign: "center", marginRight: 0, marginLeft: 0, marginTop: 15, paddingRight: 10 }}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;
