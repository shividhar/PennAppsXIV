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
      <Image style={styles.backgroundImage} source={{uri: 'http://www.planetware.com/photos-large/CAY/caribbean-best-beaches-pink-sand-beach.jpg'}}>
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
            onSubmitEditing={(event) => {this.refs.confirmPassword.focus();}}
          />

          <TextInput
            ref="confirmPassword"
            value={this.state.confirmPassword}
            onChangeText={confirmPassword => this.setState({confirmPassword})}
            secureTextEntry={true}
            onSubmitEditing={this._submitForm}
          />

          <TouchableHighlight onPress={this._submitForm}>
            <Text>Submit</Text>
          </TouchableHighlight>
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
              this.props.navigator.pop();
              Alert.alert("Signin Successful")
              this.props.navigator.push({
                id: "signin"
              })
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
  }
});