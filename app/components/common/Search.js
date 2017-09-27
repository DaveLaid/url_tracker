import React, { Component } from "react";
import API from "../../utils/API";

class Search extends Component {

	render() {

	    return (

	    	<div className="row">
	    		{/* Search Bar */}
				<section id="searchBarContainer" className="text-white py-4">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<div className="input-group">
									<span className="input-group-btn">
										<button className="btn searchButton" type="button"><i className="fa fa-search fa-lg" aria-hidden="true"></i></button>
									</span>
									<input id="searchBar" type="text" className="form-control" placeholder="Search for..." autoComplete="on" />
					       </div>
				        </div>
				      </div>
				    </div>
			  </section>
	    </div>
	    );

	}
}

export default Search;
