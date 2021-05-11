import React, { Component } from 'react';
import { Button, View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function (props) {
  const navigation = useNavigation();
  return <RandomNumbers {...props} navigation={navigation} />;
}

const NumberList = ({ numbers }) => {
  var key = 0;
  return (
    <ScrollView >
      {numbers.map(number =>
        <Text key={key++}>{number}</Text> )}
    </ScrollView>
  );
};

export class RandomNumbers extends Component {
  constructor() {
    super();
    const numbers = Array.from({ length: 100 },
      () => Math.floor(Math.random() * 1000) + 1);
    this.state = {
      numbers
    };
  }

  generateRandomNumbers = () => {
    this.state.numbers = Array.from(
      { length: this.state.numbers.length },
      () => Math.floor(Math.random() * 1000) + 1);
    this.forceUpdate();
  }

  sortNumbers = () => {
    this.state.numbers.sort((a, b) => a - b);
    this.forceUpdate();
  }

  render() {
    const { navigation } = this.props;
    return (
      <View >
        <View style={styles.pages.navi}>
          <Button color="#2F4F4F" title="Lazy Loading" onPress={() => navigation.push('Lazy Loading')} />
          <Button color="#2F4F4F" title="Step Progress" onPress={() => navigation.push('Step Progress')} />
          <Button color="#2F4F4F" title="Cofnij" onPress={() => navigation.goBack()} />
        </View>

        <View>
          <Button color="#778899" title="Wylosuj liczby" onPress={() => this.generateRandomNumbers()} />
          <Button color="#778899" title="Sortuj" onPress={() => this.sortNumbers()} />
        </View>

        <View alignItems='center'>
          <View style={styles.pages.numbers}>
            <NumberList numbers={this.state.numbers} />
          </View>
        </View>
      </View>

    );
  }
}
