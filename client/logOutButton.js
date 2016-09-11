import React, { Component } from 'react';
import { AppRegistry, Text, View, Stylesheet, TouchableHighlight } from 'react-native';

export default class LogOutButton extends Component {
	constructor() {
		super();
	}

	returnHome() {
		console.log("Start New Event");
		//Change navigator id to createEvents
	}

	render() {
	    return (
			<TouchableHighlight onPress={this.returnHome}>
				<Text>Log Out</Text>
			</TouchableHighlight>
	    );
  	}
} 


