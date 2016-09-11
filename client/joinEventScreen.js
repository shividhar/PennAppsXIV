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
			<View style={styles.background}>
		        <View style={styles.parentFieldHolder}>
		          <View style={styles.inputFieldHolder}>
		             <TextInput
		              placeholder="Event Code"
		              onChangeText={(eventCode) => this.setState({eventCode})}
		              value={this.state.eventCode}
		             />
		          </View>
		          
		          <View style={styles.submitButtonHolder}>
		            <TouchableHighlight style={styles.submitButton} onPress={this._submitJoinForm}> 
		              <Text style={styles.joinText}>Join Event</Text>
		            </TouchableHighlight> 
		          </View>
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
				  this.props.navigator.replacePreviousAndPop({
				  	"id": "eventPage",
				  	"sceneConfig": Navigator.SceneConfigs.HorizontalSwipeJump
				  });
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
	background: {
		flex: 1,
		width: undefined,
		height: undefined,
		backgroundColor:'rgba(162,0,255, 1)',
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
		borderColor: "#DDA0DD",
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
		borderColor: '#FFA500'
	},
	submitButton: {
		height: 40,
		justifyContent: "center",
		backgroundColor: "#f47835"
	},
	joinText: {
		fontSize: 20,
		textAlign: "center"
	}
})