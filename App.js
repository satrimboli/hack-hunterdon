import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

function Waypoint(i, latit, longit, txt, img, vo, bg) {
    this.index = i;
    this.latitude = latit;
    this.longitutde = longit;
    this.text = txt;
    this.image = img;
    this.voiceOver = vo;
    this.backgroundAudio = bg;
}

function StoryPath(wps, titl, desc) {
    this.waypoints = wps;
    this.title = titl;
    this.description = desc;
}

export default class App extends React.Component {
    constructor(props) {
	super(props);
	var waypoint1 = new Waypoint("0", 32, 32, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Proboscis_monkey_%28Nasalis_larvatus%29_male_head.jpg/220px-Proboscis_monkey_%28Nasalis_larvatus%29_male_head.jpg', '', '');
	this.state = {
	    
	    image: waypoint1.image,
	    direction: waypoint1.direction,
	    audio: waypoint1.voiceOver,
	    background: waypoint1.backgroundAudio,
	    latitude: waypoint1.latitude,
	    longitude: waypoint1.longitude
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={this.state.image} />
        <Text>{this.state.direction}</Text>
      </View>
    );
  }
}

function

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
