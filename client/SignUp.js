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


export default class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      confirmPassword: ''
    }
  }

  render() {
    return (
      <Image style={styles.backgroundImage} source={{uri: 'http://i.imgur.com/NaOB5KV.jpg'}}>
        <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
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
              onSubmitEditing={(event) => {this.refs.confirmPassword.focus();}}
            />
          </View>
          <View style={styles.inputFieldHolder}>
             <TextInput
              ref="confirmPassword"
              placeholder="Confim Password"
              style={styles.inputFields}
              secureTextEntry={true}
              onChangeText={(confirmPassword) => this.setState({confirmPassword})}
              value={this.state.confirmPassword}
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
        }else{
          Alert.alert("Please make sure both password fields are equal.")
        }
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
    backgroundColor: 'rgba(113, 208, 0, 0.6)',
    borderColor: 'rgba(255,255,255,0.6)',
    borderRadius: 3,
    margin: 5
  },
  submitButton: {
    backgroundColor: 'rgba(113, 208, 0, 0.6)',
    flex: 1, 
    width: undefined, 
    height: undefined, 
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});