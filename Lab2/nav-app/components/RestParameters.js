import * as React from 'react';
import { Button, View, Text } from 'react-native';
import styles from './styles';

export default function RestParameters({ navigation }) {

  const restParametersExample1 = `
  function myFun(a,  b, ...manyMoreArgs) {
    console.log("a", a)
    console.log("b", b)
    console.log("manyMoreArgs", manyMoreArgs)
  }
  
  myFun("one", "two", "three", "four", "five", "six")
  
  // Console Output:
  // a, one
  // b, two
  // manyMoreArgs, ["three", "four", "five", "six"]

  `
  const restParametersExample2 = `
  foo(arg1, arg2, ...correct)
  `

  return (

    <View >
      <View style={styles.pages.navi}>
        <Button color="#2F4F4F" title="Spread Operatort" onPress={() => navigation.push('Spread Operator')} />
        <Button color="#2F4F4F" title="useState" onPress={() => navigation.push('useState')} />
        <Button color="#2F4F4F" title="Cofnij" onPress={() => navigation.goBack()} />
      </View>

      <View style={styles.pages.columns}>
        <View style={styles.pages.column}>
          <Text style={styles.pages.text}>Rest parameters pozwalają na reprezentowanie nieskończonej
          liczby argumentów jako tablicy. Ostatni parametr definicji funkcji można poprzedzić znakiem „...”,
          co spowoduje, że wszystkie pozostałe (podane przez użytkownika) parametry zostaną umieszczone w
          „standardowej” tablicy JavaScript. Tylko ostatni parametr w definicji funkcji może być parametrem rest.
         Obok przedstawiono przykładowy kod.</Text>
          <Text style={styles.pages.code}>{restParametersExample2}</Text>
        </View>
        <View style={styles.pages.column}>
          <Text style={styles.pages.code}>{restParametersExample1}</Text>
          <Text style={styles.pages.text}>Należy pamiętać, że definicja funkcji może mieć tylko jeden parametr restowy.
      Parametr ten musi być ostatnim parametrem w definicji funkcji. Obok przedstawiono poprawny przykład. </Text>
        </View>
      </View>



    </View>
  );
}