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


export default class SignIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <Image style={styles.backgroundImage} source={{uri: 'http://i.imgur.com/NaOB5KV.jpg'}}>
        <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={styles.inputFieldHolder}>
             <TextInput
              placeholder="Username"
              style={styles.inputFields}
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
              onSubmitEditing={(event) => {this.refs.password.focus();}}
            />
          </View>
          <View style={styles.inputFieldHolder}>
             <TextInput
              ref="password"
              placeholder="Password"
              style={styles.inputFields}
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              onSubmitEditing={this._submitForm}
            />
          </View>
          <View style={styles.submitButtonHolder}>
            <TouchableHighlight style={styles.submitButton} onPress={this._submitForm}>
              <Text style={{fontSize: 15, color: 'white'}}>Login</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Image>
    )
  }

    _submitForm = () => {
      var username = this.state.username;
      var password = this.state.password;

      if(username != "" && password != ""){
          fetch("http://10.103.231.97:3000/signin", {
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
            this.props.navigator.replacePreviousAndPop({
              id: "homescreen"
            })
          }else{
            Alert.alert("Username or password incorrect")
          }
        })
        .done()    // do some stuff here…
      }else{
        Alert.alert("Please fill in all fields.")
      }
  };
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputFieldHolder: {
    height: 40, 
    width: 200, 
    backgroundColor: 'rgba(255,255,255,0.6)', 
    borderColor: 'rgba(255,255,255,0.6)',
    borderRadius: 3,
    margin: 5
  },
  inputFields: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    flex: 1, 
    width: undefined, 
    height: undefined, 
    margin: 1
  },
  submitButtonHolder: {
    height: 40, 
    width: 200, 
    backgroundColor: 'rgba(255, 126, 0, 0.6)',
    borderColor: 'rgba(255,255,255,0.6)',
    borderRadius: 3,
    margin: 5
  },
  submitButton: {
    backgroundColor: 'rgba(255, 126, 0, 0.6)',
    flex: 1, 
    width: undefined, 
    height: undefined, 
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});