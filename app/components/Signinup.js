import React, { Component } from "react";
import { Link } from "react-router";
import API from "../utils/API";

class Signinup extends Component {

	constructor() {
	    super();
	    this.state = {
	      something: []
	    };
	}


    render() {

    	return (
    		<div>

    			{/*<!-- Grey section -->*/}
				  <section className="py-3 mb-4 bg-light">
				    <div className="container">
				      <div className="row"></div>
				    </div>
				  </section>


				{/*<!-- Main Section -->*/}
				  <div className="container">
				    <div className="row">

				      {/*<!-- 1 of 3 -introduction  -->*/}
				      <div className="col-5 introSection">
				          introduction

				      </div>
				      {/*<!-- 2 of 3 divider -->*/}
				      <div className="col-1 divider-wrapper">

				              <div className="divider"></div>

				      </div>
				       {/* <!-- 3 of 3 sign up-->*/}
				      <div className="col-6 signUpSection">
				          <section id="signUp">
				            <div className="container">
				              <div className="row">
				                <div className="col-md-12 mx-auto">
				                  <div className="card">
				                    <div className="card-header">
				                      <h4>Sign Up</h4>
				                    </div>
				                    <div className="card-body">
				                      <form action="#">
				                        <div className="form-group">
				                          <label for="fullName">Full Name</label>
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
				                        <input type="submit" className="btn btn-primary btn-block" value="Sign up" />
				                      </form>
				                    </div>
				                  </div>
				                </div>
				              </div>
				            </div>
				        </section>
				      </div>
				      </div>
				    </div>

    		</div>
    	);
  	}
}

export default Signinup;	