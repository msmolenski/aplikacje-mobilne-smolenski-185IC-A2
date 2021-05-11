import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SliderImage from './components/SliderImage';
import LazyLoading from './components/LazyLoading';
import Images from './components/Images';
import Network from './components/Network';
import AsyncStore from './components/AsyncStore';
import SyncData from './components/SyncData';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View >
      <View>
        <Button color="#2F4F4F" title="Images" onPress={() => navigation.push('Images')} />
      </View>
      <View>
        <Button color="#2F4F4F" title="Slider Image" onPress={() => navigation.push('Slider Image')} />
      </View>
      <View>
        <Button color="#2F4F4F" title="Lazy Loading" onPress={() => navigation.push('Lazy Loading')} />
      </View>
      <View>
        <Button color="#2F4F4F" title="Network" onPress={() => navigation.push('Network')} />
      </View>
      <View>
        <Button color="#2F4F4F" title="AsyncStore" onPress={() => navigation.push('AsyncStore')} />
      </View>
      <View>
        <Button color="#2F4F4F" title="SyncData" onPress={() => navigation.push('SyncData')} />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Strona główna" component={HomeScreen} />
        <Stack.Screen name="Images" component={Images} />
        <Stack.Screen name="Slider Image" component={SliderImage} />
        <Stack.Screen name="Lazy Loading" component={LazyLoading} />
        <Stack.Screen name="Network" component={Network} />
        <Stack.Screen name="AsyncStore" component={AsyncStore} />
        <Stack.Screen name="SyncData" component={SyncData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

