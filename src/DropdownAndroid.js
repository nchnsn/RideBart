
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
  Easing,
  Platform
} from 'react-native';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height;
export default class DropdownAndroid extends Component {
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
      <Animated.View style={styles.android}>
        <View>
        <Picker selectedValue='' style={styles.pickerStyle} itemStyle={{color:'#fff'}} onValueChange={(value)=>(value !== '' ? this.updateStation(value) : null)}>
            {/*selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>*/}
            <Picker.Item key='test' label='Select Station' value=''  itemStyle={styles.picker} style={styles.picker}/>
            {this.props.allStations ? this.props.allStations.map((e,i)=>{return <Picker.Item key={i} label={e.name} value={e.abbr} />}) : <Picker.Item key={1} label='Try again dude' value='Try again' /> }
        </Picker>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    bottom:0,
    // left:0,
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
    height:60,
    fontSize:20,
    fontWeight:'bold',
    padding:5,
    color:'#add8e6',
  },
  selectView:{
    width:175,
    height:40,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'#fff',
    
  },
  picker:{
    color:'#fff',
    borderColor:'#fff',
    borderBottomWidth:1,
    fontWeight:'bold',
    height:100,
  },
   picker2:{
    borderColor:'#fff',
  },
  android:{
    flex:6,
  },
  pickerStyle:{
    borderWidth:1,
    borderColor:'#fff',
    height:220,
    color:'#fff',
    width:250,
    marginLeft:35,
    
  }

});

