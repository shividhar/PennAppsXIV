import React, { Component } from 'react';
import {Text, View, Image, StyleSheet, TouchableHighlight, Alert } from 'react-native';

import CreateEventButton from './createEventButton';
import ViewEventButton from './viewEventsButton';
import JoinEventButton from './joinEventButton';
import LogOutButton from './logOutButton';

export default class HomeScreen extends Component {
	render() {
	    return (
			<View style={{flex: 1}}>
				<TouchableHighlight style={[styles.homeEventButton, {backgroundColor: 'rgba(0,174,219, 0.6)'}]} onPress={this._navigate.bind(this, "create")}>
					<Image source={{uri: 'http://i.imgur.com/b6qlwh5.png'}}/>
				</TouchableHighlight>
				<TouchableHighlight style={[styles.homeEventButton, {backgroundColor: 'rgba(244,120,53, 0.6)'}]} onPress={this._navigate.bind(this, "join")}>
					<Image source={{uri: 'http://i.imgur.com/b6qlwh5.png'}}/>
				</TouchableHighlight> 
				<TouchableHighlight style={[styles.homeEventButton, {backgroundColor: 'rgba(142,193,39, 0.6)'}]} onPress={this._navigate.bind(this, "view")}>
					<Image source={{uri: 'http://i.imgur.com/b6qlwh5.png'}}/>
				</TouchableHighlight>
			</View>
	    );
  	}

  	_navigate = (property) => {
	    if(property == "create"){
	      this.props.navigator.push({
	        id: "createEvent",
	        transitionType: "PushFromLeft"
	      })
	    }else if(property == "join"){
	      this.props.navigator.push({ 
	        id: "joinEvent",
	        transitionType: "PushFromLeft"
	      })
	    }else if(property == "view"){
	      this.props.navigator.push({ 
	        id: "viewEvents",
	        transitionType: "PushFromLeft"
	      })
	    }
	  }
} 
 
const styles = StyleSheet.create({
  homeEventButton: {
    flex: 1, 
    width: undefined, 
    height: undefined, 
    justifyContent: 'center',
    alignItems: 'center'
  }
});