import React, { Component } from "react";
import { Link } from "react-router";
import Add from "./Add";

{/*const Navbar = () => (*/}
class Navbar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			signedin: true,
			isOpen: false
		};
		this.navButtons = this.navButtons.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal() { 
		console.log("here in toggleModal", this.state.isOpen);
	    
	    this.setState({
	      isOpen: !this.state.isOpen
	    });
	}

	/* put component did update or something in here to set signein to true or false*/

	navButtons(){

		if (this.state.signedin)
		{
			return (

			<div>
		    	{/*<!-- Nav Bar -->*/}
				<nav className="navbar navbar-expand-md navbar-light fixed-top py-3">
				<div className="container">
				  <a href="" className="navbar-brand">
				    <img src="img/logo.svg" width="60" height="60" alt="" /><h3 className="d-inline align-middle logoText">Bookmark Buddy</h3>
				  </a>

				  {/*<!-- hamburger menu -->*/}
				  <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav"><span className="navbar-toggler-icon"></span></button>
				  <div className="collapse navbar-collapse" id="navbarNav">
				    <ul className="navbar-nav ml-auto">
				      {/*<!-- add -->*/}
				      <button className="btn btn-primary btn-sm navBtn"><li className="nav-item">
				        <span className="nav-link navBtnText" onClick={this.toggleModal}><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;Add</span>
				      </li></button>
				      {/*<!-- user -->*/}
				      <button className="btn btn-primary btn-sm navBtn"><li className="nav-item">
				        <a href="#" className="nav-link navBtnText">&nbsp;User</a>
				      </li></button>
				     {/* <!-- log out -->*/}
				      <button className="btn btn-primary btn-sm navBtnlogout"><li className="nav-item">
				        <a href="#" className="nav-link navBtnText"><i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Log out</a>
				      </li></button>
				    </ul>
				  </div>

				</div>
				</nav>
			</div>

			);

		}

		else {


			return (

				<div>
				{/*<!-- Nav Bar -->*/}
				<nav className="navbar navbar-expand-md navbar-light fixed-top py-3">
				    <div className="container">
				      <a href="index.html" className="navbar-brand">
				        <img src="img/logo.svg" width="60" height="60" alt="" /><h3 className="d-inline align-middle logoText"> Bookmark Buddy</h3>
				      </a>
				      {/*<!-- hamburger menu -->*/}
				      <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav"><span className="navbar-toggler-icon"></span></button>
				      <div className="collapse navbar-collapse" id="navbarNav">
				        <ul className="navbar-nav ml-auto">

				        {/*<!-- sign up -->*/}
				          <button className="btn btn-primary btn-sm navBtnSignup"><li className="nav-item">
				            <a href="#" className="nav-link navBtnText"><i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Sign in</a>
				          </li></button>

				        </ul>
				      </div>
				    </div>
				</nav>

			</div>
			);

		}


	}

	render(){

	    return (
	    	<div>

	    		<Add
					show={this.state.isOpen}
			        onClose={this.toggleModal} 
			    />

				{this.navButtons()}

				

			</div>
		);

	}
}

export default Navbar;
