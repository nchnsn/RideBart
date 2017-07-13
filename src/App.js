
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PickerIOS,
  Button,
  Animated,
  Dimensions
} from 'react-native';
import Dropdown from './Dropdown';
import Menu from './Menu';
import Header from './Header';
import Body from './Body';

export default class App extends Component {
  constructor(props){
    super(props);
      this.state = {
       title:'rideBart',
       loading:false,
       allStations:null,
       currentStation:'none',
       trainTimes:null,
       modal:false,
      
      }
  }

  componentDidMount(){
    console.log('component did mount');
    const url = 'https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y';
    // // console.log(fetch(url).then((response)=>reponse.json));
    this.setState({loading: true});
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
            this.setState({
                loading:false,
                allStations:data.root.stations.station,             
            });
            console.log(this.state);
            })
  }

  selectStation(station){
    this.setState({currentStation:station});
    const url = 'https://api.bart.gov/api/etd.aspx?cmd=etd&orig=' + station + '&key=MW9S-E7SL-26DU-VV8V&json=y';
      fetch(url)
        .then(response => response.json())
        .then( (json) => json.root)
        .then(allTrains => {
            this.setState({trainTimes:allTrains.station[0].etd.map((e,i)=> [e.destination, e.estimate[0] ? e.estimate[0].minutes + ' min' : 'nothing', e.estimate[1] ? e.estimate[1].minutes + ' min' : 'nothing', e.estimate[2] ? e.estimate[2].minutes + ' min' : 'nothing']), stationName:allTrains.station[0].name});
      });
  }

  getTrains(station){
    // this.setState({currentStation:station});
    const url = 'https://api.bart.gov/api/etd.aspx?cmd=etd&orig=' + station + '&key=MW9S-E7SL-26DU-VV8V&json=y';
      fetch(url)
        .then(response => response.json())
        .then( (json) => json.root)
        .then(allTrains => {
            this.setState({trainTimes:allTrains.station[0].etd.map((e,i)=> [e.destination, e.estimate[0] ? e.estimate[0].minutes + ' min' : 'nothing', e.estimate[1] ? e.estimate[1].minutes + ' min' : 'nothing', e.estimate[2] ? e.estimate[2].minutes + ' min' : 'nothing']), stationName:allTrains.station[0].name});
      });
  }

  render() {
    console.log(this.state.allStations);
    return (
      <View style={styles.container}>
        <Header title={this.state.title}/>
        {this.state.loading ? <Text style={{color:'#fff'}}>Loading...</Text> : <Text style={{color:'#fff'}}>Loaded!</Text>}
        <View style={styles.select}>
          <Text style={styles.text} title='Select Station' onPress={()=>this.setState({modal:true})}>Select Station</Text>
        </View>
        <Body value={this.state.currentStation} times={this.state.trainTimes} test='this is a test'/>
        {this.state.modal ? <Dropdown allStations={this.state.allStations} closeModal={()=>this.setState({modal:false})} updateStation={(station)=>this.selectStation(station)}/> : <Text>false</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    
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
    width:200,
    padding:10,
    borderWidth:2,
    borderColor:'#fff',
    borderRadius:25,
    backgroundColor:'#222',
  },
  text:{
    color:'#fff',
    textAlign:'center',
    
  }
});

