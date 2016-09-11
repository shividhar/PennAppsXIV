import React, { Component } from 'react';
import { AppRegistry, Text, View, Stylesheet, TouchableHighlight } from 'react-native';

export default class CreateEventButton extends Component {
	constructor() {
		super();
		this._onPressButton = this._onPressButton.bind(this);
	}
	_onPressButton() {
		console.log("Start New Event");
		//Change navigator id to createEvents

	}
	render() {
	    return (
	    	<TouchableHighlight onPress={this._onPressButton}>
        		<Text>Button</Text>
     		</TouchableHighlight>
	    );
  	}
} 
