import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const ViewTask = () => {
  let [inputTaskId, setInputTaskId] = useState('');
  let [taskData, setTaskData] = useState({});

  let searchTask = () => {
    console.log(inputTaskId);
    setTaskData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [inputTaskId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setTaskData(results.rows.item(0));
          } else {
            alert('Nie znaleziono zadania');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Wprowadź Id zadania"
            onChangeText={
              (inputTaskId) => setInputTaskId(inputTaskId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Wyszukaj" customClick={searchTask} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
            <Text>Id: {taskData.user_id}</Text>
            <Text>Nazwa: {taskData.user_name}</Text>
            <Text>Opis: {taskData.user_address}</Text>
          </View>
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

export default ViewTask;