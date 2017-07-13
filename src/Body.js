
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  FlatList,
  List,
  View
} from 'react-native';

export default class Body extends Component {
  _keyExtractor = (item, index) =>this.props.times[item][index];
  render() {
    return (

      <View style={styles.container}>
        <Text style={styles.stationName}>{this.props.stationName ? this.props.stationName.toUpperCase() : ''}</Text>
        <FlatList 
          data={this.props.times ? this.props.times : null} 
          renderItem={({item}) => (
            <View>
              <Text style={{color:'#FF0033', fontWeight:'bold', fontSize:20}}>{item[0]}</Text>
              <Text style={{color:'#FF0033'}}>{item[1]}, {item[2]}, {item[3]}</Text>
            </View>
            )
          }/>
        {/*<View style={styles.times}>
        <Text style={styles.timesText}>
          {this.props.times ? this.props.times.map((e,i)=> <Text key={i}>{e[0]}</Text>) : 'nothing'}
          </Text>
        </View>*/}
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
    color:'#fff',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  timesText:{
    color:'#fff',
  },
  times:{
    width:200,
  },
  stationName:{
    color:'#FF0033', 
    fontWeight:'bold', 
    fontSize:20},
});

