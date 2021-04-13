import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SpreadOperator from './components/SpreadOperator';
import RestParameters from './components/RestParameters';
import useState from './components/useState';


const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View >
      <View>
        <Button color="#2F4F4F" title="Spread Operator" onPress={() => navigation.push('Spread Operator')} />
      </View>
      <View>
        <Button color="#2F4F4F" title="Rest Parameters" onPress={() => navigation.push('Rest Parameters')} />
      </View>
      <View>
        <Button color="#2F4F4F" title="useState" onPress={() => navigation.push('useState')} />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Strona główna" component={HomeScreen} />
        <Stack.Screen name="Spread Operator" component={SpreadOperator} />
        <Stack.Screen name="Rest Parameters" component={RestParameters} />
        <Stack.Screen name="useState" component={useState} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

