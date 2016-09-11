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

    _submitForm = () => { //WE NEED TO CHANGE THIS SOON TO BECOME SUBMIT EVENT INSTEAD OF SUBMIT ACCOUNT INFO
    	var username = this.state.username;
    	var password = this.state.password;
    	var confirmPassword = this.state.confirmPassword;

		if(username != "" && password != "" && confirmPassword != ""){
			if(password == confirmPassword){
			    fetch("http://10.103.231.97:3000/signup", {
			      method: "POST",
			      headers: {
			        'Accept': 'application/json',
			        'Content-Type': 'application/json',
			      },
			      body: JSON.stringify({
			        username: username,
			        password: password,
			      })
			    })
			  .then((response) => response.json())
			  .then((responseJson) => {
			    if(responseJson.res){
			      //CHANGE THIS TO MAIN PAGE
			      this.props.navigator.replace({"id": "signin"});
			      //CHANGE THIS TO MAIN PAGE
			    }else{
			      Alert.alert("Sorry, username taken.")
			    }
			  })
			  .done()    // do some stuff here…
			}
			else{
			 	Alert.alert("Please make sure both password fields are equal.")
			}
			else{
				Alert.alert("Please fill in all fields.")
			}
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