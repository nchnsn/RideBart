
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        { this.props.showBack ? <TouchableHighlight style={styles.backButton} onPress={this.props.back}>
          <Image source={require('./../img/back.png')} />
         </TouchableHighlight> : <TouchableHighlight style={styles.backButton} onPress={this.props.back}>
          <Image source={require('./../img/menu.png')} />
         </TouchableHighlight>}
        <Text style={styles.welcome}>
          <Text>{this.props.title}</Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    // borderColor:'green',
    // borderWidth:3,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'#fff',
    fontWeight:'bold',
  },
  welcomeBart:{
    color:'#add8e6',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  backButton:{
    position:'absolute',
    top:40,
    left:15,
  }
});

