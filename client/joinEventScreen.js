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