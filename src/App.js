
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PickerIOS,
  Picker,
  Button,
  Animated,
  Dimensions
} from 'react-native';
import Dropdown from './Dropdown';
import Select from './Select';
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
       stationName:'ridebart',
       trainTimes:null,
       currentTrain:null,
       modal:false,
       showBack:false,
       showSelect:true,
       showBody:false,
       test:null,
      
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
            })
  }

  homeScreen(){
    this.setState({showBack:false, showSelect:true, showBody:false});
  }
  
  selectScreen(){
    this.setState({showBack:true, showSelect:false, showBody:true, stationName:'ridebart'});
  }

  selectStation(station){
    this.setState({currentStation:station});
    const url = 'https://api.bart.gov/api/etd.aspx?cmd=etd&orig=' + station + '&key=MW9S-E7SL-26DU-VV8V&json=y';
      fetch(url)
        .then(response => response.json())
        .then( (json) => json.root)
        .then(allTrains => {
            this.setState({trainTimes:allTrains.station[0].etd.map((e,i)=> {
              if(e.estimate[0].minutes === 'Leaving' || e.estimate[0].minutes === '1'){
                this.setState({currentTrain:e.destination.toUpperCase()});
              } else {
                // this.setState({currentTrain:e.estimate[0].minutes});
              }
              return ([e.destination, e.estimate[0] ? e.estimate[0].minutes + ' min' : 'nothing', e.estimate[1] ? e.estimate[1].minutes + ' min' : 'nothing', e.estimate[2] ? e.estimate[2].minutes + ' min' : 'nothing']);
            }
            ), stationName:allTrains.station[0].name
        });
      });
      // this.setState({currentTrain:'nic'});
    setTimeout(()=>{
      console.log('call back on timer');
      this.selectStation(this.state.currentStation);
    }, 10000);
  }

  trainArriving(times){
      if(times[1] === 'Leaving min' || times[1] === '1 min'){
        this.setState({currentTrain:times[0]});
    }
  }
  backButton(){
    this.setState({showBack:false, showSelect:true, showBody:false, stationName:'ridebart' });
  }

  render() {
    console.log(this.state.allStations);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Header title={this.state.stationName} back={()=>this.backButton()} showBack={this.state.showBack}/>
        </View>
        <Text>{this.state.test}</Text>
        {this.state.showSelect ? <Select loading={this.state.loading} hide={this.state.showSelect} showModal={()=>this.setState({modal:true})} /> : null}
        {/*<View>
            {this.state.loading ? <Text style={{color:'#fff'}}>Loading...</Text> : <Text style={{color:'#fff'}}>Loaded!</Text>}
        </View>
        <View style={styles.select}>
          {this.state.showSelect ? <Text style={styles.text} title='Select Station' onPress={()=>this.setState({modal:true})}>Select Station</Text> : null}
        </View>*/}
        {/*<Menu style={{width: 250, height: 50, backgroundColor: 'powderblue'}}/>*/}
        {this.state.showBody ? <Body value={this.state.currentStation} times={this.state.trainTimes} train={this.state.currentTrain} stationName={this.state.stationName} test='this is a test'/> : null}
        {this.state.modal ? <Dropdown currentStation = {this.state.currentStation} goHome={()=>this.selectScreen()} hideSelect={()=>this.setState({showSelect:false})} allStations={this.state.allStations} closeModal={()=>this.setState({modal:false})} updateStation={(station)=>this.selectStation(station)}/> : null}
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
  },
  header:{
    flex:1,
    flexDirection:'row',
  },
  body:{
    flex:3,
    borderWidth:3,
    borderColor:'blue',
  }


});

