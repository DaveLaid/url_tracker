import React from "react";
import Navbar from "./common/Navbar";
import Search from "../components/Search";
import Add from "../components/Add";
import Saved from "../components/Saved";


const Main = props => (
  <div>
    <Navbar />
    {/* what's this, where is it coming from {props.children} */}

    <div className="container">

        <div className="jumbotron">
          <h2><strong>URL Tracker</strong></h2>
          <p>Fake subtitle</p>
        </div>


        <div className="row">SEARCH area
          <Search setSearch={this.setSearch} setUrl={this.setUrl} />
        </div>

        <div className="row">ADD area
          <Add setSearch={this.setAdd} setUrl={this.setAdd} />
        </div>

        <div className="row">SAVED area
          <Saved savedUrls={this.state.savedUrls} />
        </div>

    </div>

  </div>
);

export default Main;