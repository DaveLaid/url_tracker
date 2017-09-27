import React, { Component } from "react";
import API from "../../utils/API";

class Add extends Component {

	constructor() {
    	super();
    	// If we are assigning an object property to an existing variable with the same name,
    	// we can use this shorthand assignment syntax
    	// Notice the data property here and the data const defined above the component
   		this.state = {
   			show: true,
    		title: "",
    		category: "",
        url: "",
    		image: "",
    		note: ""
    	};
    	// We need to bind our "" method to our component with this syntax in the constructor since we'll be passing it to child components
    	this.handleTitleChange = this.handleTitleChange.bind(this);
      this.handleCategoryChange = this.handleCategoryChange.bind(this);
      this.handleUrlChange = this.handleUrlChange.bind(this);
      this.handleImageChange = this.handleImageChange.bind(this);
      this.handleNoteChange = this.handleNoteChange.bind(this);
      this.onAddSubmit = this.onAddSubmit.bind(this);
  	}

  	// This function will respond to the user input
  	handleTitleChange(event) {
    	this.setState({ title: event.target.value });
      console.log("in add - handleTitleChange ", event.target.value );
  	}
    handleCategoryChange(event) {
      this.setState({ category: event.target.value });
      console.log("in add - handleCategoryChange ", event.target.value );
    }
    handleUrlChange(event) {
      this.setState({ url: event.target.value });
      console.log("in add - handleUrlChange ", event.target.value );
    }
    handleImageChange(event) {
      this.setState({ image: event.target.value });
      console.log("in add - handleImageChange ", event.target.value );
    }
    handleNoteChange(event) {
      this.setState({ note: event.target.value });
      console.log("in add - handleNoteChange ", event.target.value );
    }

    onAddSubmit(event) {
      event.preventDefault();
      console.log("in add - onAddSubmit ", this.state.title );
      API.addUrl(this.state.title, this.state.category, this.state.url, this.state.image, this.state.note);
      //this.setState({ search: event.target.value });
    }



	render() {

    var thStyle = { verticalAlign: "middle" };

		// Render nothing if the "show" prop is false
		//if(!this.props.show) {
		if(!this.props.show) {	
			console.log("in Add - render: ", this.props.show);
	    	return null;
	    }
	    
	    return (

	    	<div>

          <section className="py-5">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="card">

                    <form onSubmit={this.onAddSubmit} className="input-group">
                      <table className="table">
                          <thead className="thead text-white">
                              <tr className="tableHead">
                                <th style={thStyle}>Title</th>
                                <th style={thStyle}>Category</th>
                                <th style={thStyle}>URL</th>
                                <th style={thStyle}>Image</th>
                                <th style={thStyle}>Note</th>
                                <th style={thStyle}></th>
                              </tr>
                            </thead>

                            <tbody>
                                
                                 
                                  <tr>
                                    <td scope="row">
                                      <input 
                                        id="addTitle" 
                                        type="text" 
                                        value={this.state.title}
                                        onChange={this.handleTitleChange}
                                        required
                                        className="form-control" 
                                        placeholder="title" 
                                        autoComplete="on" 
                                      />
                                    </td>
                                    <td>
                                      <input 
                                        id="addCategory" 
                                        type="text" 
                                        value={this.state.category}
                                        onChange={this.handleCategoryChange}
                                        required
                                        className="form-control" 
                                        placeholder="category" 
                                        autoComplete="on" 
                                      />
                                    </td>
                                    <td>
                                      <input 
                                        id="addUrl" 
                                        type="text" 
                                        value={this.state.url}
                                        onChange={this.handleUrlChange}
                                        required
                                        className="form-control" 
                                        placeholder="url" 
                                        autoComplete="on" 
                                      />
                                    </td>
                                    <td>
                                      <input 
                                        id="addImage" 
                                        type="text" 
                                        value={this.state.image}
                                        onChange={this.handleImageChange}
                                        required
                                        className="form-control" 
                                        placeholder="image" 
                                        autoComplete="on" 
                                      />
                                    </td>
                                    <td>
                                      <input 
                                        id="addNote" 
                                        type="text" 
                                        value={this.state.note}
                                        onChange={this.handleNoteChange}
                                        required
                                        className="form-control" 
                                        placeholder="note" 
                                        autoComplete="on" 
                                      />
                                    </td>
                                    <td>
                                        <button onSubmit={this.onAddSubmit} className="btn searchButton" type="submit"><i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></button>
                                    </td>
                                  </tr>  
                                  
                                
                              
                            </tbody>
                            
                          </table>
                        </form>    
                      </div>
                    </div>
                </div>
            </div>
        </section>

        		
      	</div>

	    );
	}
}


export default Add;