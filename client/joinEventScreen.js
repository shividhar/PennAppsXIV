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
	}
}