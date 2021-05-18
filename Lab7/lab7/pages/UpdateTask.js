import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const UpdateTask = ({ navigation }) => {
  let [inputTaskId, setInputTaskId] = useState('');
  let [taskName, setTaskName] = useState('');
  let [taskDescription, setTaskDescription] = useState('');

  let updateAllStates = (name, address) => {
    setTaskName(name);
    setTaskDescription(address);
  };

  let searchTask = () => {
    console.log(inputTaskId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [inputTaskId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.user_name,
              res.user_address
            );
          } else {
            alert('Nie znaleziono zadania');
            updateAllStates('', '', '');
          }
        }
      );
    });
  };
  let updateTask = () => {
    console.log(inputTaskId, taskName, taskDescription);

    if (!inputTaskId) {
      alert('Uzupełnij Id zadania');
      return;
    }
    if (!taskName) {
      alert('Uzupełnij nazwę zadania');
      return;
    }
    if (!taskDescription) {
      alert('Uzupełnij opis zadania');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_user set user_name=? , user_address=? where user_id=?',
        [taskName, taskDescription, inputTaskId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Zadanie zaktualizowane pomyślnie',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Edycja się nie powiodła');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Id zadnia"
                style={{ padding: 10 }}
                onChangeText={
                  (inputTaskId) => setInputTaskId(inputTaskId)
                }
              />
              <Mybutton
                title="Wyszukaj zadanie"
                customClick={searchTask} 
              />
              <Mytextinput
                placeholder="Nazwa"
                value={taskName}
                style={{ padding: 10 }}
                onChangeText={
                  (taskName) => setTaskName(taskName)
                }
              />
              <Mytextinput
                value={taskDescription}
                placeholder="Opis"
                onChangeText={
                  (taskAddress) => setTaskDescription(taskAddress)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton
                title="Zaktalizuj"
                customClick={updateTask}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default UpdateTask;