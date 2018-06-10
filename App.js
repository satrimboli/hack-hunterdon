import React, { Component } from 'react';
import { StyleSheet, Platform, Text, View, Image } from 'react-native';
import {Constants, Location, Permissions } from 'expo';

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
	var waypoint1 = new Waypoint("0", 32, 32, 'test', 'testing', '', '');
	this.state = {

	    image: waypoint1.image,
	    direction: waypoint1.direction,
	    audio: waypoint1.voiceOver,
	    background: waypoint1.backgroundAudio,
	    latitude: waypoint1.latitude,
	    longitude: waypoint1.longitude,
      coordinates: '',
      location: null,
      errorMessage: null,
    }
  }
  componentWillMount() {
  if (Platform.OS === 'android' && !Constants.isDevice) {
    this.setState({
      errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
    });
  } else {
    this._getLocationAsync();
  }
}

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    };
  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    return (
      <View style={styles.container}>
        <Image source={this.state.image} />
        <Text>{this.state.direction}</Text>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
    paragraph: {
      margin: 24,
      fontSize: 18,
      textAlign: 'center',
    },
});
