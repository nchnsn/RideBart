
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          <Text>ride</Text><Text style={styles.welcomeBart}>bart</Text>
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
    fontSize: 40,
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
});

