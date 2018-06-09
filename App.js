import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
