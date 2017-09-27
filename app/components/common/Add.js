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
    		url: "",
    		category: "",
    		image: "",
    		note: ""
    	};
    	// We need to bind our "" method to our component with this syntax in the constructor since we'll be passing it to child components
    	//this.feedSeymour = this.feedSeymour.bind(this);
  	}

  	// This function will respond to the user input
  	handleTitleChange(event) {
    	this.setState({ title: event.target.value });
  	}



	render() {

		// Render nothing if the "show" prop is false
		//if(!this.props.show) {
		if(!this.props.show) {	
			console.log("here in Add render: ", this.props.show);
	    	return null;
	    }
	    
	    return (

	    	<div>
        		HELLO from Add.js
      		</div>
	    );
	}
}


export default Add;