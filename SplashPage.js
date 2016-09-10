import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image
} from 'react-native';


export default class SplashPage extends Component {
  render() {
    return (
      <Image style={styles.backgroundImage} source={{uri: 'http://www.planetware.com/photos-large/CAY/caribbean-best-beaches-pink-sand-beach.jpg'}}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontFamily: 'sans-serif-condensed', fontSize: 30}}>Welcome</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight style={[styles.authButton, {backgroundColor: 'rgba(224,255,255, 0.8)'}]} onPress={this._navigate.bind(this, "in")}>
                <Text style={styles.authButtonText}>Sign in</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.authButton, {backgroundColor: 'rgba(127,225,212, 0.8)'}]} onPress={this._navigate.bind(this, "up")}>
                <Text style={styles.authButtonText}>Sign up</Text>
              </TouchableHighlight>
            </View>
        </View>
      </Image>
    )
  }
  _navigate = (property) => {
    if(property == "in"){
      this.props.navigator.push({
        id: "signin"
      })
    }else if(property == "up"){
      this.props.navigator.push({ 
        id: "signup"
      })
    }
  }
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  authButton: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center', 
    width: 50,
    height: 50

  },
  authButtonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});
