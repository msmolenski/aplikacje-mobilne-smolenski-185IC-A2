import React, { Component } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';


export default function (props) {
  const navigation = useNavigation();
  return <AsyncStore {...props} navigation={navigation} />;
}

export class AsyncStore extends Component {
  state = {
    setKey: '',
    setValue: '',
    getKey: ''
  };

  storeData = async () => {
    var key = this.state.setKey
    var value = this.state.setValue
    if (this.state.setKey && this.state.setValue != '') {
      try {
        await AsyncStorage.setItem(key, value);
        this.setState(alert('Pomyślnie dodano element'));
      } catch (error) {
        alert('Wystąpił błąd')
        console.error(error)
      }
    }
  };

  retrieveData = async () => {
    var key = this.state.getKey
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        alert('Wartość dla klucza: ' + key + ' to: ' + value);
      } else {
        alert('Brak wartości dla podanego klucza');
      }
    } catch (error) {
      alert('Wystąpił błąd')
      console.error(error)
    }
  };

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

        <View>
          <View style={styles.pages.column}>
            <Text style={styles.pages.text}>Podaj klucz</Text>
            <View style={{ flexDirection: 'row' }}>
              <TextInput onEndEditing={event => { this.setState({ setKey: event.nativeEvent.text }) }}
               placeholder="Klucz" style={styles.pages.input} />
            </View>
            <Text style={styles.pages.text}>Podaj Wartość</Text>
            <View style={{ flexDirection: 'row' }}>
              <TextInput onEndEditing={event => { this.setState({ setValue: event.nativeEvent.text }) }} 
              placeholder="Wartość" style={styles.pages.input} />
            </View>
            <Button
              title='Dodaj wartość'
              onPress={this.storeData}
              color="#2F4F4F">
            </Button>
          </View>
        </View>
        <View style={styles.pages.column}>
          <Text style={styles.pages.text}>Podaj klucz wartości którą chcesz odczytać</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput onEndEditing={event => { this.setState({ getKey: event.nativeEvent.text }) }} 
            placeholder="Klucz" style={styles.pages.input} />
          </View>
          <Button
            title='Wyświetl wartość'
            onPress={this.retrieveData}
            color="#2F4F4F">
          </Button>
        </View>

      </View>

    );
  }
}