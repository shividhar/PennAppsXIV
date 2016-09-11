import React, { Component } from 'react';
import { AppRegistry, Text, View, Stylesheet, TouchableHighlight } from 'react-native';

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

    _submitForm = () => { 
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
		      	username: "shivansh",
		        nameOfEvent: nameOfEvent,
		        location: location,
		        date: date,
		        description: description
		      })
		    })
		  .then((response) => response.json())
		  .then((responseJson) => {
		    Alert.alert(responseJson.message)
		    //go to the event page
		  })
		  .done()    
		}
		else{
			Alert.alert("Please fill in all fields.")
		}
		
	};

	render() {
		return (
		  	<View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>

		    	<TextInput //name of event
		    		ref="nameOfEvent"
		      		value={this.state.nameOfEvent}
		      		onChangeText={nameOfEvent => this.setState({nameOfEvent})}
		      		onSubmitEditing={(event) => {this.refs.location.focus();}}
		    	/>

			    <TextInput //location
			      	ref="location"
			      	value={this.state.location}
			      	onChangeText={location => this.setState({location})}
			      	//secureTextEntry={true}
			      	onSubmitEditing={(event) => {this.refs.date.focus();}}
			    />
			    <TextInput //date
			      	ref="date"
			      	value={this.state.date}
			      	onChangeText={date => this.setState({date})}
			      	//secureTextEntry={true}
			      	onSubmitEditing={(event) => {this.refs.description.focus();}}
			    />
			    <TextInput //short description
			      	ref="description"
			      	value={this.state.description}
			      	onChangeText={description => this.setState({description})}
			      	//secureTextEntry={true}
			      	
			    />

			    <TouchableHighlight onPress={this._submitForm}>
			     	<Text>Hit up friends</Text>
			    </TouchableHighlight>
			    <TouchableHighlight onPress={this.returnHome}>
			     	<Text>Back</Text>
			    </TouchableHighlight>
		  </View>
		)
	}
}