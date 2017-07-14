
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  Picker,
  View,
  Button
} from 'react-native';

export default class Dropdown extends Component {


  closeModal(){
    console.log(this.props.closeModal);
    this.props.closeModal();
    
    
  }

    updateStation(station){
    console.log('udpate station');
    this.props.updateStation(station);
    
    
  }
  render() {
    console.log('rendering');
    return (
      <View style={styles.container}>
        <View style={styles.selectView}>
          <Text style={styles.select} title='select' 
          onPress={
            ()=>{
            console.log('pressing button');
            this.closeModal();
            }
            }>
            Done</Text>
        </View>
        <Picker selectedValue={this.props.currentStation} itemStyle={styles.picker} style={styles.picker2} onValueChange={(value)=>this.updateStation(value)}>
            {/*selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>*/}
            {this.props.allStations.map((e,i)=>{return <Picker.Item key={i} label={e.name} value={e.abbr} />})}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    position:'absolute',
    bottom:0,
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
    width:350,
    height:30,
    fontSize:20,
    fontWeight:'bold',
    paddingTop:5,
    color:'#add8e6',
  },
  selectView:{
    width:375,
    height:40,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'#fff',
  },
  picker:{
    color:'#fff',
    borderColor:'#fff',
    borderBottomWidth:1,
  },
   picker2:{
    borderColor:'#fff',

    
 
  }

});

