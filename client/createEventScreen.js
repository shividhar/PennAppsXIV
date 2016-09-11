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
		  </View>
		)
	}
}