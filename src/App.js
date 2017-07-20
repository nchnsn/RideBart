
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
  Dimensions,
} from 'react-native';
import Dropdown from './Dropdown';
import Select from './Select';
import Header from './Header';
import Body from './Body';


const width = Dimensions.get('window').width; //full width
export default class App extends Component {
  constructor(props){
    super(props);
      this.state = {
       title:'rideBart',
       loading:false,
       status:'starting app..',
       allStations:null,
       currentStation:'none',
       stationName:'',
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
    this.setState({loading: true, status:'Loading...'});
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
            this.setState({
                loading:false,
                status:'Ready!',                allStations:data.root.stations.station,             
            });
            }).catch(()=>this.setState({status:'Connection Issue - Check Network or Try Again'}));
  }
  // componentWillUpdate(){
  //   this.setState({currentTrain:null});
  // }



  homeScreen(){
    this.setState({showBack:false});
    this.setState({showSelect:true, showBody:false });
  }
  
  selectScreen(){
    this.setState({showBack:true, showSelect:false, showBody:true});
  }

  selectStation(station){
    this.setState({currentStation:station});
    const url = 'https://api.bart.gov/api/etd.aspx?cmd=etd&orig=' + station + '&key=MW9S-E7SL-26DU-VV8V&json=y';
      fetch(url)
        .then(response => response.json())
        .then( (json) => json.root)
        .then(allTrains => {
            let updatedArrivals = false;
            this.setState({trainTimes:allTrains.station[0].etd.map((e, key)=> {
              if(e.estimate[0].minutes === 'Leaving' || e.estimate[0].minutes === '1'){
                this.setState({currentTrain:[e.destination.toUpperCase(), e.estimate[0].length ]});
                updatedArrivals = true;
              } else {
                updatedArrivals ? null : this.setState({currentTrain:null});
              }
              return ([<Text key={key} style={{color:'#FF0033', fontWeight:'bold', fontSize:20}}>{e.destination}</Text>, <Text key={'times'} style={{color:'#FF0033'}}>{e.estimate[0] ? e.estimate[0].minutes : ' '} min, {e.estimate[1] ? e.estimate[1].minutes : ' '} min, {e.estimate[2] ? e.estimate[2].minutes : ' '} min</Text>]);
            }
            ), stationName:allTrains.station[0].name
            });
        })        
      .catch(()=>console.log('errrrror station'));
      
    setTimeout(()=>{
      console.log('call back on timer');
      this.selectStation(this.state.currentStation);
    }, 10000);
  }

  trainArriving(times){
    // this may no longer be used...
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
          <Header title={this.state.stationName} back={()=>this.homeScreen()} showBack={this.state.showBack}/>
        </View>
        <Text>{this.state.test}</Text>
        {this.state.showSelect ? <Select loading={this.state.loading} hide={this.state.showSelect} showModal={()=>this.setState({modal:true})} /> : null}
        {this.state.showBody ? <Body value={this.state.currentStation} times={this.state.trainTimes} train={this.state.currentTrain} stationName={this.state.stationName} back={this.state.showBack} test='this is a test'/> : null}
        {this.state.modal ? <Dropdown currentStation = {this.state.currentStation} goHome={()=>this.selectScreen()} hideSelect={()=>this.setState({showSelect:false})} allStations={this.state.allStations} closeModal={()=>this.setState({modal:false})} updateStation={(station)=>this.selectStation(station)}/> : null}
        <View style={styles.status}>{this.state.loading ? <Text>{this.state.status}</Text> : <Text>{this.state.status}</Text>}</View>
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
  },
  status:{
    backgroundColor:'#222',
    width:width,
  },
});

