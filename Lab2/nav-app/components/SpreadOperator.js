import * as React from 'react';
import {Button, TouchableOpacity, View, Text } from 'react-native';
import styles from './styles';

export default function SpreadOperator({navigation}) {
  
  return (
    <View >
        <View >
        <Button title="Rest Parameters"  onPress={() => navigation.push('Rest Parameters')} />
        <Button title="useState"  onPress={() => navigation.push('useState')} />
        <Button title="Wróć" onPress={() => navigation.goBack()} />
      </View>
      <View >
        <Text >  Spread Operator (ang. spread syntax) pozwala na rozwinięcie iterowalnego wyrażenia (jak wyrażenie tablicowe lub ciąg znaków) - w takich miejscach, gdzie oczekiwanych jest zero lub więcej argumentów (dla wywołań funkcji) lub elementów (dla iterałów tablicowych).</Text>    
      </View>
    </View>
  );
}