import * as React from 'react';
import { Button, View, Text } from 'react-native';
import styles from './styles';

export default function SpreadOperator({ navigation }) {

  const spreadOperatorExample = `
  function sum(x, y, z) {
    return x + y + z;
  }
  
  const numbers = [1, 2, 3];
  
  console.log(sum(...numbers));
  // expected output: 6
  
  console.log(sum.apply(null, numbers));
  // expected output: 6
  `

  return (
    <View >
      <View style={styles.pages.navi}>
        <Button color="#2F4F4F" title="Rest Parameters" onPress={() => navigation.push('Rest Parameters')} />
        <Button color="#2F4F4F" title="useState" onPress={() => navigation.push('useState')} />
        <Button color="#2F4F4F" title="Cofnij" onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.pages.columns}>
        <View style={styles.pages.column}>
          <Text style={styles.pages.text}>  Spread syntax pozwala na rozwinięcie iterowalnego wyrażenia, takiego jak
          wyrażenie tablicowe lub ciąg znaków, tam gdzie oczekiwanych jest zero lub więcej
          argumentów (dla wywołań funkcji) lub elementów (dla literałów tablicowych).
          Pozwala również na rozwinięcie wyrażeń obiektowych w miejscach, gdzie oczekiwanych
          jest zero lub więcej par klucz-wartość (dla literałów obiektowych).</Text>
        </View>
        <View style={styles.pages.column}>
          <Text style={styles.pages.code}>{spreadOperatorExample}</Text>
          <Text style={styles.pages.text}>Powyżej przedstawiono przykład składni rozwinięcia.</Text>
        </View>
      </View>
    </View>
  );
}