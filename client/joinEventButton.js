import React, { Component } from 'react';
import { AppRegistry, Text, View, Stylesheet, TouchableHighlight } from 'react-native';

export default class JoinEventButton extends Component {
	constructor() {
		super();
		this._onPressButton = this._onPressButton.bind(this);
	}
	_onPressButton() {
		console.log("joinEvent");
		//Change navigator id to joinEvent

	}
	render() {
	    return (
	    	<TouchableHighlight onPress={this._onPressButton}>
        		<Text>Button</Text>
     		</TouchableHighlight>
	    );
  	}
} 
