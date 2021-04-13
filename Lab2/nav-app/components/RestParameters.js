import * as React from 'react';
import {Button, TouchableOpacity, View, Text } from 'react-native';
import styles from './styles';

export default function RestParameters({navigation}) {
  
  return (
      
    <View >
        <View >
        <Button title="Spread Operatort"  onPress={() => navigation.push('Spread Operator')} />
        <Button title="useState"  onPress={() => navigation.push('useState')} />
        <Button title="Wróć" onPress={() => navigation.goBack()} />
      </View>
      <View >
        <Text > Rest parameters pozwalają na reprezentowanie nieskończonej liczby argumentów jako tablicy.</Text>    
      </View>
    </View>
  );
}