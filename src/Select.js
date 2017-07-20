
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableHighlight
  

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
          <TouchableHighlight>
          <View style={styles.selectWrapper}>
            <Animated.View style={styles.select}>
              <Text style={styles.selectText} title='Select Station' onPress={this.props.showModal}>Select Station</Text>
            </Animated.View>
          </View>        
          </TouchableHighlight>
        </Animated.View>
        {/*<View style={styles.loading}>
            {this.props.loading ? <Text style={styles.loadingText}>Loading...</Text> : <Text style={styles.loadingText}>Loaded!</Text>}
        </View>*/}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 6,
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
    position:'absolute',
    bottom:0,
    backgroundColor:'yellow',
    padding:5,
    left:0,
    marginLeft:0,
    
  },
  loadingText:{
    textAlign:'center',
    color:'#fff',
    
  },
  selectWrapper:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
});

