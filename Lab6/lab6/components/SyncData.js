import React, { Component } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './styles';


export default function (props) {
  const navigation = useNavigation();
  return <SyncData {...props} navigation={navigation} />;
}

export class SyncData extends Component {
  state = {
    sliderValue: '',
    onlineValue: '0',
  };

  componentDidMount() {
    setInterval(() => {
      this.fetchState();
      if (this.state.isConnected) {
        this.setState({ onlineValue: this.state.sliderValue })
      }
    }, 1000);
  }

  fetchState = async () => {
    const state = await NetInfo.fetch();
    var tempState = JSON.stringify(state)
    this.setState(JSON.parse(tempState))
  };

  checkSliderValue = async (value) => {
    var key = "sliderValue"
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
      console.error(error)
    }
    try {
      const tempValue = await AsyncStorage.getItem(key);
      if (tempValue !== null) {
        this.setState({ sliderValue: tempValue })
      } else {
        this.setState({ sliderValue: 'n/a' })
      }
    } catch (error) {
      this.setState({ sliderValue: error })
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, marginTop: 50 }}>
        <View style={styles.pages.navi}>
          <Button color="#2F4F4F" title="Images" onPress={() => navigation.push('Images')} />
          <Button color="#2F4F4F" title="Slider Image" onPress={() => navigation.push('Slider Image')} />
          <Button color="#2F4F4F" title="Lazy Loading" onPress={() => navigation.push('Lazy Loading')} />
        </View>
        <View style={styles.pages.navi}>
          <Button color="#2F4F4F" title="Network" onPress={() => navigation.push('Network')} />
          <Button color="#2F4F4F" title="AsyncStore" onPress={() => navigation.push('AsyncStore')} />
          <Button color="#2F4F4F" title="SyncData" onPress={() => navigation.push('SyncData')} />
        </View>

        <Text style={styles.pages.text}>Stan połączenia</Text>
        {this.state.isConnected
          ? <Text style={styles.pages.code}>Połączono  </Text>
          : <Text style={styles.pages.code}>Brak połączenia  </Text>}

        <Text style={styles.pages.text}> Wartość suwaka aktualizowana podczas połączenia z internetem:
      {this.state.onlineValue} </Text>

        <Slider
          style={styles.pages.slider}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onSlidingComplete={this.checkSliderValue}
        />
      </View>

    );
  }
}