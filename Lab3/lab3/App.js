import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RandomNumbers from './components/RandomNumbers';
import LazyLoading from './components/LazyLoading';
import StepProgress from './components/StepProgress';



const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View >
      <View>
        <Button color="#2F4F4F" title="Random Numbers" onPress={() => navigation.push('Random Numbers')} />
      </View>
      <View>
        <Button color="#2F4F4F" title="Lazy Loading" onPress={() => navigation.push('Lazy Loading')} />
      </View>
      <View>
        <Button color="#2F4F4F" title="Step Progress" onPress={() => navigation.push('Step Progress')} />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Strona główna" component={HomeScreen} />
        <Stack.Screen name="Random Numbers" component={RandomNumbers} />
        <Stack.Screen name="Lazy Loading" component={LazyLoading} />
        <Stack.Screen name="Step Progress" component={StepProgress} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

