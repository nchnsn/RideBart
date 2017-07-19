
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
    this.animatedValue2 = new Animated.Value(200);
    this.animatedValue3 = new Animated.Value(0);
    this.state = {
      currentTrain:'hey',
    }
  }



  _keyExtractor = (item, index) => this.props.times[item][index];

  componentDidMount () {
    this.animate();
    Animated.timing(                  // Animate over time
      this.animatedValue2,            // The animated value to drive
      {
        toValue: 0,                   // Animate to opacity: 1 (opaque)
        duration: 200,              // Make it take a while
      }
    ).start();
    Animated.timing(this.animatedValue3, 
      {
        toValue:1,
        duration:1000,
      }
    ).start();
  }

  // componentDidUpdate() {
  //   Animated.timing(this.animatedValue3,            
  //     {
  //       toValue: 0,                   
  //       duration: 300,             
  //     }
  //   ).start();
         
  // }

  animate () {
    this.animatedValue.setValue(1)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 0,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(() => this.animate());
  }

  // animate2 () {
  //   this.animatedValue2.setValue(0);
  //   Animated.timing(
  //     this.animatedValue2,
  //     {
  //       toValue: 1,
  //       duration: 500,
  //       // easing: Easing.linear
  //     }
  //   ).start();
  // }


  checkTrainArriving(element){
    if(element[1] === 'Leaving min' || element[1] === '1 min'){
      this.setState({currentTrain:element[0]});
    }
  }


  render() {
  let  animate2 = this.animatedValue2;
  let  animate3 = this.animatedValue3;
  // const marginLeft = this.animatedValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [-100, 0]
  //   });
  // const marginLeftReverse = this.animatedValue2.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [100, 0]
  // });
  // const opacity = this.animatedValue.interpolate({
  //   inputRange: [0, 0.5, 1],
  //   outputRange: [0, 1, 0]
  // });
  const movingMargin = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 300, 0]
  });
  const textSize = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [18, 32, 18]
  });
  const rotateX = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '180deg', '0deg']
  });
  // const transition = this.props.back ? animate2 : animate3;
    return (

      <Animated.View style={styles.container}>
        <Animated.View style={{ marginLeft:animate2 }}>
        <Animated.View style={{ opacity:this.animatedValue, paddingBottom:20 }}>
        <Text style={styles.arrivingTrain} >{this.props.train ? this.props.train[0] : ' '} </Text>
        <Text style={styles.arrivingTrainCar}>{this.props.train ? this.props.train[1] + ' CAR TRAIN' : ' '}</Text>
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
        </Animated.View>
      </Animated.View>
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
    textAlign:'center',

  },
    arrivingTrainCar:{
    color:'#FF0033', 
    fontSize:20,
    fontWeight:'bold', 
    textAlign:'center',

  }
});

