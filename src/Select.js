
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,

} from 'react-native';

export default class Select extends Component {
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.selectWrapper}>
          <View style={styles.select}>
            <Text style={styles.selectText} title='Select Station' onPress={this.props.showModal}>Select Station</Text>
          </View>
        </View>        
        <View style={styles.loading}>
          {this.props.loading ? <Text style={{color:'#fff'}}>Loading...</Text> : <Text style={{color:'#fff'}}>Loaded!</Text>}
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  select: {
    width:200,
    padding:10,
    borderWidth:2,
    borderColor:'#fff',
    borderRadius:25,
    backgroundColor:'#222',
  },
  selectText:{
    color:'#fff',
    textAlign:'center',
  },
  loading:{
    flex:1,
  },
  selectWrapper:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
});

