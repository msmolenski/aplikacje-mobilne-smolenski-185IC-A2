import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default class LazyLoaded extends Component {
  constructor() {
    super();
    const length = 1000;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.state = { text: result }
  }
  render() {

    return (
      <View >
        <Text style={styles.pages.code}>{this.state.text}</Text>
      </View>
    );
  };
}