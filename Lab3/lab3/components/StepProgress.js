import React from 'react';
import { Button, View, Text, ActivityIndicator } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import styles from './styles';

export default function StepProgress({ navigation }) {


  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <View style={styles.pages.navi}>
        <Button color="#2F4F4F" title="Random Numbers" onPress={() => navigation.push('Random Numbers')} />
        <Button color="#2F4F4F" title="Lazy Loading" onPress={() => navigation.push('Lazy Loading')} />
        <Button color="#2F4F4F" title="Cofnij" onPress={() => navigation.goBack()} />
      </View>

      <ProgressSteps>
        <ProgressStep
          label="Pierwszy krok"
          nextBtnText={'Dalej'}>
          <View style={{ alignItems: 'center' }}>
            <Text>To pierwszy krok! Poniżej mały ActivityIndicator.</Text>
          </View>
          <View>
            <ActivityIndicator color='green' size='small' />
          </View>
        </ProgressStep>
        <ProgressStep
          label="Drugi krok"
          nextBtnText={'Dalej'}
          previousBtnText={'Cofnij'}>
          <View style={{ alignItems: 'center' }}>
            <Text>W tym kroku widzisz duży ActivityIndicator </Text>
          </View>
          <View>
            <ActivityIndicator color='grey' size='large' />
          </View>
        </ProgressStep>
        <ProgressStep
          label="Trzeci krok"
          nextBtnText={'Dalej'}
          previousBtnText={'Cofnij'}
          finishBtnText={'Strona główna'}
          onSubmit={() => { navigation.navigate('Strona główna') }}>
          <View style={{ alignItems: 'center' }}>
            <Text>To tyle na dziś! :)</Text>
          </View>
        </ProgressStep>

      </ProgressSteps>
    </View>
  );
}