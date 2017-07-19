
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  Picker,
  View,
  Button,
  Dimensions,
  Animated,
  Easing
} from 'react-native';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height;
export default class Dropdown extends Component {
  constructor(props){
    super(props);
    this.closeAnimation = new Animated.Value(height);
    this.openAnimation = new Animated.Value(200);
  }

  componentWillMount(){
    Animated.timing(this.closeAnimation,{
      toValue:0,
      duration:300,
      easing:Easing.ease.in,
    }).start();
  }


  closeModal(){
    this.closeAnimation.setValue(0);
    Animated.timing(this.closeAnimation,{
      toValue:height,
      duration:300,
      easing:Easing.ease.out,
    }).start(this.props.closeModal);
    // console.log(this.props.closeModal);

    
    
    
  }

    updateStation(station){
    console.log('udpate station');
    this.props.goHome();
    this.props.updateStation(station);
    
    
  }
  render() {
    console.log('rendering');
    return (
      <Animated.View style={{ transform: [{translateY: this.closeAnimation}], position:'absolute',  bottom:0, left:0, width:width, backgroundColor:'#333', opacity:.8 }}>
        <View style={styles.selectView}>
          <Text style={styles.select} title='select' 
          onPress={()=>this.closeModal()}>
            Done</Text>
        </View>
        <Picker selectedValue={this.props.currentStation} itemStyle={styles.picker} onValueChange={(value)=>this.updateStation(value)}>
            {/*selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>*/}
            {this.props.allStations ? this.props.allStations.map((e,i)=>{return <Picker.Item key={i} label={e.name} value={e.abbr} />}) : <Picker.Item key={1} label='Try again dude' value='Try again' /> }
        </Picker>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    bottom:0,
    left:0,
    width:width,
    backgroundColor:'#333',
    opacity:.8,
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
  select:{
    textAlign:'right',
    height:30,
    fontSize:20,
    fontWeight:'bold',
    padding:5,
    color:'#add8e6',
  },
  selectView:{
    // width:375,
    // height:40,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'#fff',
    
  },
  picker:{
    color:'#fff',
    borderColor:'#fff',
    borderBottomWidth:1,
    fontWeight:'bold',
  },
   picker2:{
    borderColor:'#fff',

    
 
  }

});

