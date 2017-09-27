import React, { Component } from "react";
import Search from "./common/Search";
import Add from "./common/Add";
import Saved from "./common/Saved"; 
import API from "../utils/API";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      something: []
    };
    // Binding getUrls to our component since we'll be passing this
    // method to child components
    {/*this.getUrls = this.getUrls.bind(this);*/}
  }
  // Getting all Urls when the component mounts
  componentDidMount() {
    {/*this.getUrls();*/}
  }
  getUrls() {
    {/*API.getUrls().then((res) => {
      this.setState({ Urls: res.data });
    });*/}
  }
  // A helper method for rendering one panel for each url
  renderUrls() {
    {/*return this.state.Urls.map(url => (
      <Panel
        url={url}
        key={url._id}
        getUrls={this.getUrls}
      />
    )); */}
  }
  render() {
    return (

      <div>
      
        <div className="row rowSearch">
          <Search/>
        </div>

        <div className="container">

          <div className="row rowSaved">
            <Saved/>
          </div>

        </div>

      </div>  
    );
  }
}

export default Home;