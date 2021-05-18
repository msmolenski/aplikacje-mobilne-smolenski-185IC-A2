import 'react-native-gesture-handler';

import * as React from 'react';
import { Button, View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './pages/HomeScreen';
import AddTask from './pages/AddTask';
import UpdateTask from './pages/UpdateTask';
import ViewTask from './pages/ViewTask';
import ViewAllTask from './pages/ViewAllTask';
import DeleteTask from './pages/DeleteTask';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Strona Główna', 
            headerStyle: {
              backgroundColor: '#2F4F4F', 
            },
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="View"
          component={ViewTask}
          options={{
            title: 'Zobacz zadanie',
            headerStyle: {
              backgroundColor: '#2F4F4F',
            },
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAllTask}
          options={{
            title: 'Wszystkie zadania',
            headerStyle: {
              backgroundColor: '#2F4F4F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateTask}
          options={{
            title: 'Edytuj zadanie',
            headerStyle: {
              backgroundColor: '#2F4F4F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Dodaj zadanie"
          component={AddTask}
          options={{
            title: 'Dodaj zadanie',
            headerStyle: {
              backgroundColor: '#2F4F4F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
          }}
        />
        <Stack.Screen
          name="Delete"
          component={DeleteTask}
          options={{
            title: 'Usuń zadanie',
            headerStyle: {
              backgroundColor: '#2F4F4F', 
            },
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;