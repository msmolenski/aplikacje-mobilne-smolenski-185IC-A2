import * as React from 'react';
import { Button, TouchableOpacity, View, Text, Image } from 'react-native';
import styles from './styles';

export default function UseState({navigation}) {
  
  return (
    <View >
        <View >
        <Button title="Rest Parameters"  onPress={() => navigation.push('Rest Parameters')} />
        <Button title="Spread Operatort"  onPress={() => navigation.push('Spread Operator')} />
        <Button title="Wróć" onPress={() => navigation.goBack()} />
      </View>
      <View >
        <Text > Hook jest specjalną funkcją, która pozwala wykorzystanie stanu i innych funkcjonalności Reacta bez użycia klas. Umożliwia to "zahaczenie" w wewnętrzne mechanizmy Reacta. UseState pozwala korzystać ze stanu w komponencie funkcyjnym.</Text>    
      </View>
    </View>
  );
}