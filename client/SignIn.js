import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  TextInput
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
      <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          value={this.state.username}
          onChangeText={username => this.setState({username})}
          onSubmitEditing={(event) => {this.refs.password.focus();}}
        />

        <TextInput
          ref="password"
          value={this.state.password}
          onChangeText={password => this.setState({password})}
          secureTextEntry={true}
          onSubmitEditing={this._submitForm}
        />

        <TouchableHighlight onPress={this._submitForm}>
          <Text>Login</Text>
        </TouchableHighlight>
      </View>
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
            Alert.alert("Signin Successful!");
            this.props.navigator.push({
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});