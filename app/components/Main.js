import React from "react";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";


class Main extends React.Component {
  constructor(props) {
  
      super(props);

        this.state = {
      loggedin: null
    }

      console.log(props.location.hash);
  }

  componentDidMount() {
    if (document.cookie) {
      this.setState({loggedin: "loggedin"})
    }
    
  }

  render() {

    console.log(document.cookie)
    if (this.props.location.hash === "#/signup") {
        var style = {  background: "#333"};
    }

    return (
      <div style={style}>
        <Navbar loggedin={this.loggedin} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Main;
