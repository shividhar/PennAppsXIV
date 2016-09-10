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
      <Image style={styles.backgroundImage} source={{uri: 'http://esq.h-cdn.co/assets/cm/15/06/54d3cdbba4f40_-_esq-01-bar-lgn.jpg'}}>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'E6E6E6', fontFamily: 'serif', fontSize: 75}}>hmu</Text>
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
        id: "signin",
        transitionType: "PushFromLeft"
      })
    }else if(property == "up"){
      this.props.navigator.push({ 
        id: "signup",
        transitionType: "PushFromLeft"
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
