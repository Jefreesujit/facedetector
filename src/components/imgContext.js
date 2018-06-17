import React, { Component } from "react";
const { Provider: AppProvider, Consumer } = React.createContext();

class Provider extends Component {
	constructor () {
		super();

		this.state = {
			image: '',
			setImage: this.setImage
		};
	}

	setImage = (img) => {
		this.setState({
			image: img
		});
	}

	render() {
		 return <AppProvider value={this.state}>
			 {this.props.children}
		 </AppProvider>
	 }
 }

export {
	Provider,
	Consumer
};