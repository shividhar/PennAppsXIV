import React, { Component } from 'react';
import { AppRegistry, Text, View, Stylesheet, TouchableHighlight } from 'react-native';

export default class ViewAllEventsScreen extends Component {
	returnHome() {
		//Write code to return id to homeScreen
	}
	render() {
		return (
			//Add list
			<View style={styles.submitButtonHolder}>
            	<TouchableHighlight style={styles.submitButton} onPress={this._submitForm}>
            		<Text style={{fontSize: 15, color: 'white'}}>Join Event</Text>
            	</TouchableHighlight>
            </View>
		)
	};
}