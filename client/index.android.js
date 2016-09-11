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
  Alert,
  Animated,
  Text,
  TouchableHighlight
} from 'react-native';

import SplashPage from './SplashPage';
import SignUp from './SignUp';
import SignIn from './SignIn';
// import NavBar from './NavBar';

import HomeScreen from './homeScreen';

import CreateEventScreen from './createEventScreen';
import JoinEventScreen from './joinEventScreen';
import ViewAllEventsScreen from './viewAllEventsScreen';


var _navigator;

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
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} 
          renderScene={this.navigatorRenderScene}
          // navigationBar={
          //   <NavigationBar
          //     routeMapper={NavBar}
          //     style={styles.container}
          //   />
          // }
        />
    )
  }
    navigatorRenderScene(route, navigator){
      _navigator = navigator;
      switch(route.id) {
        case ("splash"):
          // return(<SplashPage navigator={navigator}/>)
          return(<HomeScreen navigator={navigator} />)
        case("signin"):
          return(<SignIn navigator={navigator} />)
        case("signup"):
          return(<SignUp navigator={navigator} />)
        case("homescreen"):
          return(<HomeScreen navigator={navigator} />)
        case("createEvent"):
          return(<CreateEventScreen navigator={navigator} />)
        case("joinEvent"):
          return(<JoinEventScreen navigator={navigator} />)
        case("viewEvents"):
          return(<ViewAllEventsScreen navigator={navigator} />)

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