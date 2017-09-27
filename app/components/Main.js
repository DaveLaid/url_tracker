import React from "react";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";


class Main extends React.Component {
  constructor(props) {
      super(props);

      console.log(props.location.hash);
  }

  render() {
    if (this.props.location.hash === "#/signup") {
        var style = {  background: "#333"};
    }

    return (
      <div style={style}>
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Main;
