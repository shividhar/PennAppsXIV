import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  TextInput,
  Image
} from 'react-native';

export default class JoinEventScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventCode:''
		}
	}

	render() {
		return(
			<View style={{alignItems: "center"}}>
	          <View style={styles.inputFieldHolder}>
	             <TextInput
	              placeholder="Event Code"
	              style={[styles.inputFields, {alignItems:"center"}]}
	              onChangeText={(eventCode) => this.setState({eventCode})}
	              value={this.state.eventCode}
	             />
	          </View>
	          
	          <View style={styles.submitButtonHolder}>
	            <TouchableHighlight style={styles.submitButton} onPress={this._submitJoinForm}> 
	              <Text style={{fontSize: 15, color: 'black'}}>Join Event</Text>
	            </TouchableHighlight> 
	          </View>
	        </View>
        )
	}

    _submitJoinForm = () => { //WE NEED TO CHANGE THIS SOON TO BECOME SUBMIT CODE INSTEAD OF SUBMIT ACCOUNT INFO
    	var eventCode = this.state.eventCode;
    	var username = global.username;

		if(eventCode != ""){
			var apiUrl = "http://10.103.231.97:3000/events/join/" + eventCode.toString();

		    fetch(apiUrl, {
		      method: "POST",
		      headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json',
		      },
		      body: JSON.stringify({
		        username: username
		      })
		    })
			.then((response) => response.json())
			.then((responseJson) => {
				if(responseJson.message.indexOf("Successfully joined event") >= 0){
				  this.props.navigator.replace({"id": "eventPage"});
				  //go to event page
				}
				else if(responseJson.message.indexOf("User already joined event") >= 0){
				  Alert.alert("You have already joined the event.");
				}
				else if(responseJson.message.indexOf("Did not find any event with specified id") >= 0){
				  Alert.alert("Please enter a valid event code.");
				}
			})
			.done()    // do some stuff here…
		}else
		{
			Alert.alert("Please enter a code")
		}
	};
}

const styles = StyleSheet.create({

})