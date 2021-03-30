import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TextInput,Alert } from 'react-native';
import Constants from 'expo-constants';


export default class App extends Component {
  state = {
    text: 0,
    inputValue1: 0,
    inputValue2: 0,
    result: 0
  }
  onButtonPressed = function() { this.setState({ text:this.state.inputValue })}
  _handleTextChange1 = inputValue1 => { this.setState({ inputValue1 }); 
  };
  _handleTextChange2 = inputValue2 => { this.setState({ inputValue2 }); 
  };

  add = function() {
    let x = parseFloat(this.state.inputValue1);
    let y = parseFloat(this.state.inputValue2);
    let result = x + y;
    this.setState({ text: result})
  }

  subtract = function() {
    let x = parseFloat(this.state.inputValue1);
    let y = parseFloat(this.state.inputValue2);
    let result = x - y;
    this.setState({ text: result})
  }

  multiplicate = function(){
    let x = parseFloat(this.state.inputValue1);
    let y = parseFloat(this.state.inputValue2);
    let result = x * y;
    this.setState({ text: result})
  }

  divide = function(){
    let x = parseFloat(this.state.inputValue1);
    let y = parseFloat(this.state.inputValue2);
    let result = x / y;
    this.setState({ text: result})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
        <TextInput
          value={this.state.inputValue1}
          keyboardType = 'numeric'
          onChangeText={this._handleTextChange1}
          style={{ height: 40, 
            borderColor: 'gray', 
            borderWidth: 2, 
            autoFocus: true,
            textAlign: 'center',
            width: 100,}}
        />

        <TextInput
          value={this.state.inputValue2}
          keyboardType = 'numeric'
          onChangeText={this._handleTextChange2}
          style={{ height: 40, cd,
            borderColor: 'gray', 
            borderWidth: 2, 
            textAlign: 'center',
            width: 100,}}
          />
        </View>

        <View style={styles.buttonContainer}>
            <View style={styles.buttonStyle}>
              <Button color="grey" title='+' onPress={this.add.bind(this)} style={styles.buttonStyle}/>
            </View>
            <View style={styles.buttonStyle}>
              <Button color="grey" title='-' onPress={this.subtract.bind(this)} style={styles.buttonStyle}/>
            </View>
            <View style={styles.buttonStyle}>
              <Button color="grey" title='*' onPress={this.multiplicate.bind(this)} style={styles.buttonStyle}/>
            </View>
            <View style={styles.buttonStyle}>
              <Button color="grey" title='/' onPress={this.divide.bind(this)} style={styles.buttonStyle}/>
            </View>
          </View>

        <Text style={styles.paragraph}>
          {this.state.text}
        </Text>
      
        
      </View>
    );
  }
}
//style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  input: {
    flexDirection: 'row',
    marginBottom:5,
  },
  paragraph: {
    fontSize: 18,
    width: 200,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
    borderColor: 'grey',
    borderWidth: 3, backgroundColor: 'grey'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:5
  },
  buttonStyle: {
    margin: 5,
    width: 41,
  },

});