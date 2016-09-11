import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, StyleSheet } from 'react-native';

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
	    	<View style={{flex: 1}}>
      			<Image style={styles.backgroundImage} source={{uri: 'http://i.imgur.com/4EnsdPp.jpg'}}>
		      		<View style={[styles.viewButtons, {backgroundColor: 'rgb(217,83,79)'}]}>
		      		</View>
		      	</Image>
      			<Image style={styles.backgroundImage} source={{uri: 'http://i.imgur.com/hdf9Ak3.jpg'}}>
		      		<View style={[styles.viewButtons, {backgroundColor: 'rgb(249,249,249)'}]}>
		      		</View>
		      	</Image>
      			<Image style={styles.backgroundImage} source={{uri: 'http://i.imgur.com/zHlhYSU.jpg'}}>
		      		<View style={[styles.viewButtons, {backgroundColor: 'rgb(92,184,92)'}]}>
		      		</View>
		      	</Image>
		     </View>
	    	/*<View style={{alignItems: "center"}}>
	      		<Text>Hello world!</Text>
	      		<CreateEventButton />
	      		<ViewEventButton />
	      		<JoinEventButton />
	      		<LogOutButton />
	      	</View>*/
	    );
  	}
} 
 
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,1)'
  },
  viewButtons: {
    flex: 1,
    opacity: 0.8,
    width: undefined,
    height: undefined,
    justifyContent: 'center',
    alignItems: 'center'
  }
});