import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_task'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_task', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_task(task_id INTEGER PRIMARY KEY AUTOINCREMENT, task_name VARCHAR(20), task_description VARCHAR(255))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="ToDo List" />
          <Mybutton
            title="Dodaj zadanie"
            customClick={() => navigation.navigate('Dodaj zadanie')}
          />
          <Mybutton
            title="Edytuj zadanie"
            customClick={() => navigation.navigate('Update')}
          />
          <Mybutton
            title="Zobacz zadanie"
            customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="Wszystkie zadania"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mybutton
            title="Usuń zadanie"
            customClick={() => navigation.navigate('Delete')}
          />
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

export default HomeScreen;