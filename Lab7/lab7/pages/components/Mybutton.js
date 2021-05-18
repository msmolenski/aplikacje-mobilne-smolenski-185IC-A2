import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Mybutton = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.customClick}>
      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#2F4F4F',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 64,
    marginVertical: 20,
    borderRadius:10,
    height: 25,
    color:'#f4a'
  },
  text: {
    color: '#fff',
  },
});

export default Mybutton;