import * as React from 'react';
import { Button, View, Text } from 'react-native';
import styles from './styles';

export default function UseState({ navigation }) {

  const useStateExample = `
import React, { useState } from 'react';

function Example() {
  // Zadeklaruj nową zmienną stanu, którą nazwiemy „count”  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Kliknięto {count} razy</p>
      <button onClick={() => setCount(count + 1)}>
        Kliknij mnie
      </button>
    </div>
  );
}
  `

  return (
    <View >
      <View style={styles.pages.navi}>
        <Button color="#2F4F4F" title="Rest Parameters" onPress={() => navigation.push('Rest Parameters')} />
        <Button color="#2F4F4F" title="Spread Operatort" onPress={() => navigation.push('Spread Operator')} />
        <Button color="#2F4F4F" title="Cofnij" onPress={() => navigation.goBack()} />
      </View>
      <View>
        <Text style={styles.pages.text}>Hooki są nowym dodatkiem w Reakcie 16.8.
        Pozwalają one na wykorzystanie stanu i innych funkcjonalności Reacta, bez użycia klas.</Text>
        <Text style={styles.pages.text}>Hooki można przedstawić przy pomocy poniższego przykładu: </Text>
        <Text style={styles.pages.code}>{useStateExample}</Text>
      </View>
    </View>
  );
}