import React, { Component } from "react";
import { Link } from "react-router";

{/*const Navbar = () => (*/}
class Navbar extends Component {

	constructor(props) {
		super(props)
		this.state = {
			signedin: false
		}
		this.navButtons = this.navButtons.bind(this);
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
				        <a href="#" className="nav-link navBtnText" data-toggle="modal" data-target="#addPostModal"><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;Add</a>
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



				  {/*<!-- Grey section -->*/}
				  <section className="py-3 mb-4 bg-light">
				    <div className="container">
				      <div className="row"></div>
				    </div>
				  </section>

				  {/*<!-- sign in -->*/}
				  <section id="signIn">
				    <div className="container">
				      <div className="row">
				        <div className="col-md-5 mx-auto">
				          <div className="card">
				            <div className="card-header">
				              <h4>Sign up</h4>
				            </div>
				            <div className="card-body">
				              <form action="index.html">
				              	<div className="form-group">
				                  <label for="name">Full Name</label>
				                  <input type="text" className="form-control" />
				                </div>
				                <div className="form-group">
				                  <label for="email">Email</label>
				                  <input type="text" className="form-control" />
				                </div>
				                <div className="form-group">
				                  <label for="password">Password</label>
				                  <input type="password" className="form-control" />
				                </div>
				                <input type="submit" className="btn btn-primary btn-block" value="Sign in" />
				              </form>
				            </div>
				          </div>
				        </div>
				      </div>
				    </div>
				</section>

				<hr/>
				    <ul className="account">
				     <li id ="user"> Don't have an account?</li>

				     <a href="#" id ="creatAcc"><li>Create account</li></a>
				     <li id="copyRight">Copyright 2017 Bookmark Buddy. All rights reserved.</li>
				   </ul>


			</div>
			);

		}


	}

	render(){

	    return (
	    	<div>
			{this.navButtons()}
			</div>
		);

	}
}

export default Navbar;
