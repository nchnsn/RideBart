
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,

} from 'react-native';

export default class Select extends Component {
  constructor(props){
    super(props);
    this.animation1 = new Animated.Value(-300);
  }
  componentWillMount(){
    Animated.timing (
      this.animation1,
      {
        toValue: 0,                
        duration: 200, 
      }
    ).start();
  }

  render(){
    return(
      <View style={styles.container}>
        <Animated.View style={{marginLeft:this.animation1}}>
        <View style={styles.selectWrapper}>
          <Animated.View style={styles.select}>
            <Text style={styles.selectText} title='Select Station' onPress={this.props.showModal}>Select Station</Text>
          </Animated.View>
        </View>        
        <View style={styles.loading}>
          {this.props.loading ? <Text style={{color:'#fff'}}>Loading...</Text> : <Text style={{color:'#fff'}}>Loaded!</Text>}
        </View>
        </Animated.View>
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

