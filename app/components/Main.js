import React from "react";
import Navbar from "./common/Navbar";


const Main = props => (
  <div>
    <Navbar />
    {props.children}

  </div>
);

export default Main;