import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

import CreateEventButton from './createEventButton';
import ViewEventButton from './viewEventsButton';
import JoinEventButton from './joinEventButton';
import LogOutButton from './logOutButton';

export default class HomeScreen extends Component {
	_navigate = (property) => {
	    if(property == "in"){
	    	this.props.navigator.push({
	        id: "createEvent",
	        transitionType: "PushFromLeft"
	      })
	    }
	    else if(property == "up"){
	      this.props.navigator.push({ 
	        id: "signup",
	        transitionType: "PushFromRight"
	      })
	    }
	}
	render() {
	    return (
	    	<View style={{alignItems: "center"}}>
	      		<Text>Hello world!</Text>
	      		<CreateEventButton />
	      		<ViewEventButton />
	      		<JoinEventButton />
	      		<LogOutButton />
	      	</View>
	    );
  	}
} 
 