import React, { Component } from 'react';
import { AppRegistry, Text, View, Stylesheet, TouchableHighlight } from 'react-native';

export default class ViewEventButton extends Component {
	constructor() {
		super();
		this._onPressButton = this._onPressButton.bind(this);
	}
	_onPressButton() {
		console.log("view event");
		//change navigator id to viewEvents
	}
	render() {
	    return (
	    	<TouchableHighlight onPress={this._onPressButton}>
        		<Text>Button</Text>
     		</TouchableHighlight>
	    );
  	}
} 
