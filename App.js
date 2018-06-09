import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

function Waypoint(i, latit, longit, txt, vo, bg) {
    this.index = i;
    this.latitude = latit;
    this.longitutde = longit;
    this.text = txt;
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
    this.state = {
      image: 'testing',
      direction: 'test',
      audio: '',
      coordinates: ''
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
