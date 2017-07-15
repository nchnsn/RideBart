
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  FlatList,
  List,
  View,
  Animated,
  Easing

} from 'react-native';

export default class Body extends Component {
  constructor(props){
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.state = {
      currentTrain:'hey',
    }
  }



  _keyExtractor = (item, index) => this.props.times[item][index];

  componentDidMount () {
    this.animate()
  }
  animate () {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }
  checkTrainArriving(element){
    if(element[1] === 'Leaving min' || element[1] === '1 min'){
      this.setState({currentTrain:element[0]});
    }
  }


  render() {
  const marginLeft = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300]
  })
  const opacity = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0]
  })
  const movingMargin = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 300, 0]
  })
  const textSize = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [18, 32, 18]
  })
  const rotateX = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '180deg', '0deg']
  })
    return (

      <View style={styles.container}>
        {/*<Text style={styles.stationName}>{this.props.stationName ? this.props.stationName.toUpperCase() : ''}</Text>*/}
        <Animated.View style={{opacity}}>
        <Text style={styles.arrivingTrain}>{this.props.train ? this.props.train : ' '} </Text>
        </Animated.View>
        <FlatList 
          data={this.props.times ? this.props.times : null} 
          renderItem={({item}) => {
            return (<View>
              <Text style={{color:'#FF0033', fontWeight:'bold', fontSize:20}}>{item[0]}</Text>
              <Text style={{color:'#FF0033'}}>{item[1]}, {item[2]}, {item[3]}</Text>
            </View>)
          }
          }
        />
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
    flex: 5,
    // flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    // borderColor:'blue',
    // borderWidth:3,
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
    fontSize:20
  },
  arrivingTrain:{
    color:'#FF0033', 
    fontSize:40,
    fontWeight:'bold', 

  }
});

