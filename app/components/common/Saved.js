import React, { Component } from "react";
import API from "../../utils/API";

class Saved extends Component {
	
	editUrl(id){
		//API.editUrl(id).then(this.props.getUrls);
	}

	shareUrl(id){
		//API.shareUrl(id).then(this.props.getUrls);
	}

	// deleteUrl deletes a url in the db and then
	// reloads all urls in our app
	deleteUrl(id) {
		//API.deleteUrl(id).then(this.props.getUrls);
	}

	render() {

		//var thStyle = { verticalAlign: "middle" };

	    return (

	    	<div>

	    		{/*<!-- saved results -->
				<section className="py-5">
				    <div className="container">
				    	<div className="row">
				    		<div className="col-lg-12">
				    			<div className="card">

				        			<table className="table">
				            			<thead className="thead text-white">
					                		<tr className="tableHead">
					                    		<th style={thStyle}>Title</th>
				                                <th style={thStyle}>Category</th>
				                                <th style={thStyle}>URL</th>
				                                <th style={thStyle}>Screenshot</th>
				                                <th style={thStyle}>Note</th>
				                                <th style={thStyle}></th>
					                  		</tr>
				                		</thead>
				                		<tbody>*/}
				                  			{/*<tr id="tableRowHolder" style={thStyle}>
				                  				{this.props.url.category}
				                  			</tr>*/}
				                  			<tr>
				                    			<td scope="row">{this.props.url.title}</td>
				                    			<td>{this.props.url.category}</td>
				                    			<td><a href="#" className="aTable">{this.props.url.url}</a></td>
				                    			<td>{this.props.url.screenshot}</td>
				                    			<td>{this.props.url.note}</td>
				                    			<td>
				                      				<a href="#"><i 
				                      					className="fa fa-pencil-square-o fa-lg" 
				                      					onClick={() => this.editUrl(this.props.url._id)}
				                      					aria-hidden="true">
				                      					</i></a>
				                      				<a href="#"><i 
				                      					className="fa fa-share-square-o fa-lg" 
				                      					onClick={() => this.shareUrl(this.props.url._id)}
				                      					aria-hidden="true">
				                      					</i></a>
				                      				<a href="#"><i 
				                      					className="fa fa-trash-o fa-lg" 
				                      					onClick={() => this.deleteUrl(this.props.url._id)}
				                      					aria-hidden="true">
				                      					</i></a>
				                    			</td>
				                  			</tr>
				                	{/*	</tbody>
				              		</table>

				            	</div>
				          	</div>
				        </div>
				    </div>
				</section>*/}

	        </div>

	    );

	}
}

export default Saved;
