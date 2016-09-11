/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Navigator,
  StyleSheet,
  BackAndroid,
  Alert
} from 'react-native';

import SplashPage from './SplashPage';
import SignUp from './SignUp';
import SignIn from './SignIn';

import HomeScreen from './homeScreen';

import CreateEventScreen from './createEventScreen';
import ViewAllFriendsScreen from './viewAllFriendsScreen';
import ViewAllEventsScreen from './viewAllEventsScreen';


var _navigator;

Navigator.SceneConfigs.FloatFromLeft;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

class AwesomeProject extends Component {
  render() {
    return (
        <Navigator
          style={{ flex:1 }}
          initialRoute={{id: "splash"}}
          renderScene={this.navigatorRenderScene}
        />
    )
  }

    navigatorRenderScene(route, navigator){
      _navigator = navigator;
      switch(route.id) {
        case ("splash"):
          return(<SplashPage navigator={navigator}/>)
        case("signin"):
          return(<SignIn navigator={navigator} />)
        case("signup"):
          return(<SignUp navigator={navigator} />)
        case("homescreen"):
          return(<homeScreen navigator={navigator} />)
        case("createEvent"):
          return(<homeScreen navigator={navigator} />)
        case("viewEvents"):
          return(<homeScreen navigator={navigator} />)
        case("viewFriends"):
          return(<homeScreen navigator={navigator} />)
      }
    }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  wrapper: {
    flex: 1,
  }
})


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);