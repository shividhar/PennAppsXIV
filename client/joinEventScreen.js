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
			eventCode = ''
		}
	}

	returnHome(){
		//Change id to go back to homeScreen
	}

    _submitForm = () => { //WE NEED TO CHANGE THIS SOON TO BECOME SUBMIT CODE INSTEAD OF SUBMIT ACCOUNT INFO
    	var eventCode = this.state.eventCode;
		if(eventCode != ""){

		    fetch("http://10.103.231.97:3000/join/" + eventCode.toString(), {
		      method: "POST",
		      headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json',
		      },
		      body: JSON.stringify({
		        eventCode: eventCode
		      })
		    })
			.then((response) => response.json())
			.then((responseJson) => {
			if(responseJson.message.indexOf("Successfully joined event") >= 0){
			  this.props.navigator.replace({"id": "signin"});
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
		}
		else
		{
			Alert.alert("Please enter a code")
		}
	};

	render() {
		<View style={{alignItems: "center"}}>
          <View style={styles.inputFieldHolder}>
             <TextInput
              placeholder="Event Code"
              style={styles.inputFields, alignItems:"center"}
              onChangeText={(eventCode) => this.setState({eventCode})}
              value={this.state.eventCode}
             />
          </View>
          
          <View style={styles.submitButtonHolder}>
            <TouchableHighlight style={styles.submitButton} onPress={this._submitForm}> 
              <Text style={{fontSize: 15, color: 'white'}}>Join Event</Text>
            </TouchableHighlight> 
          </View>

          <View style={styles.submitButtonHolder}>
            <TouchableHighlight style={styles.submitButton} onPress={this.returnHome}>
              <Text style={{fontSize: 15, color: 'white'}}>Back</Text>
            </TouchableHighlight>
          </View>

        </View>
	}
}