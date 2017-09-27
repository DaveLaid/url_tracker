import React, { Component } from "react";
import API from "../../utils/API";

class Saved extends Component {

	render() {

		var thStyle = { verticalAlign: "middle" };

	    return (

	    	<div className="row">

	    		{/*<!-- saved results -->*/}
				<section className="py-5">
				    <div className="container">
				    	<div className="row">
				    		<div className="col">
				    			<div className="card">

				        			<table className="table">
				            			<thead className="thead text-white">
					                		<tr className="tableHead">
					                    		<th style={thStyle}>#</th>
					                    		<th style={thStyle}>Title</th>
					                    		<th style={thStyle}>Category</th>
					                    		<th style={thStyle}>URL</th>
					                    		<th style={thStyle}></th>
					                  		</tr>
				                		</thead>
				                		<tbody>
				                  			<tr id="tableRowHolder" style={thStyle}>

				                  			</tr>
				                  			<tr>
				                    			<td scope="row">1</td>
				                    			<td>javascript</td>
				                    			<td>Web Development</td>
				                    			<td><a href="#" className="aTable">www.code.com</a></td>
				                    			<td>
				                      				<a href="#"><i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></a>
				                      				<a href="#"><i className="fa fa-share-square-o fa-lg" aria-hidden="true"></i></a>
				                      				<a href="#"><i className="fa fa-trash-o fa-lg" aria-hidden="true"></i></a>
				                    			</td>
				                  			</tr>
				                		</tbody>
				              		</table>

				            	</div>
				          	</div>
				        </div>
				    </div>
				</section>

	        </div>

	    );

	}
}

export default Saved;
