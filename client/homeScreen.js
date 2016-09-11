import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

import CreateEventButton from './createEventButton';
import ViewEventButton from './viewEventsButton';
import JoinEventButton from './joinEventButton';

export default class HomeScreen extends Component {
	render() {
	    return (
	    	<View style={{alignItems: "center"}}>
	      		<Text>Hello world!</Text>
	      		<CreateEventButton />
	      		<ViewEventButton />
	      		<JoinEventButton />
	      	</View>
	    );
  	}
} 
 