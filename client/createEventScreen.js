import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableHighlight, TextInput, Alert } from 'react-native';

export default class CreateEventScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nameOfEvent: '',
			location: '',
			date: '',
			description: ''
		}

	}
	returnHome(){
		//Change id to go back to homeScreen
	}

	render() {
		return (
		  	<View style={styles.background}>
		        <View style={styles.parentFieldHolder}>
		          	<View style={styles.inputFieldHolder}>
				    	<TextInput //name of event
				    		ref="nameOfEvent"
				    		placeholder="Name"
				      		value={this.state.nameOfEvent}
				      		onChangeText={nameOfEvent => this.setState({nameOfEvent})}
				      		onSubmitEditing={(event) => {this.refs.location.focus();}}
				    	/>
				    </View>
				    <View style={styles.inputFieldHolder}>
					    <TextInput //location
					      	ref="location"
					      	placeholder="Location"
					      	value={this.state.location}
					      	onChangeText={location => this.setState({location})}
					      	//secureTextEntry={true}
					      	onSubmitEditing={(event) => {this.refs.date.focus();}}
					    />
					</View>
					<View style={styles.inputFieldHolder}>
					    <TextInput //date
					      	ref="date"
					      	placeholder="Date"
					      	value={this.state.date}
					      	onChangeText={date => this.setState({date})}
					      	//secureTextEntry={true}
					      	onSubmitEditing={(event) => {this.refs.description.focus();}}
					    />
					</View>
					<View style={styles.inputFieldHolder}>
					    <TextInput //short description
					      	ref="description"
					      	placeholder="Description"
					      	value={this.state.description}
					      	onChangeText={description => this.setState({description})}
					      	//secureTextEntry={true}
					      	
					    />
					</View>

					<View style={styles.submitButtonHolder}>
					    <TouchableHighlight style={styles.submitButton} onPress={this._submitCreateEventForm}>
					     	<Text style={{textAlign: "center", fontSize: 20, fontFamily: 'calibri'}}>Hit up friends</Text>
					    </TouchableHighlight>
					</View>
				</View>
		  </View>
		)
	}

	_submitCreateEventForm = () => { 
		var username = global.username;
    	var nameOfEvent = this.state.nameOfEvent;
    	var location = this.state.location;
    	var date = this.state.date;
    	var description = this.state.description;

		if(nameOfEvent != "" && date != "" && location != ""){
		    fetch("http://10.103.231.97:3000/events/create", {
		      method: "POST",
		      headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json',
		      },
		      body: JSON.stringify({
		      	username: username,
		        name: nameOfEvent,
		        location: location,
		        time: date,
		        description: description
		      })
		    })
		  .then((response) => response.json())
		  .then((responseJson) => {
		  	Alert.alert(responseJson.message)
		    Alert.alert("Event Successfully Created")
		    //go to the event page
		  })
		  .done()    
		}
		else{
			Alert.alert("Please fill in all fields.")
		}
		
	};
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: undefined,
		height: undefined,
		backgroundColor:'#ae0001',
		justifyContent: 'center'
	},
	parentFieldHolder: {
		flex: 1,
		width: undefined,
		height: undefined,
		margin: 10,
		backgroundColor: "white",
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#ae0001",
		alignItems: "center",
		justifyContent: "center"
	},
	inputFieldHolder: {
		justifyContent: "center",
		alignSelf: 'stretch',
	},
	submitButtonHolder: {
		alignSelf: 'stretch',
		borderWidth: 1,
		borderColor: '#d3a625'
	},
	submitButton: {
		height: 40,
		justifyContent: "center",
		backgroundColor: "#eeba30"
	},
})