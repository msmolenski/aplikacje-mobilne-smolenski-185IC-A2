import React, { Component, Suspense } from 'react';
import { Button, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const LazyLoaded = React.lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import("./LazyLoaded")), 3000)
    )
);

export default function (props) {
  const navigation = useNavigation();
  return <LazyLoading {...props} navigation={navigation} />;
}

export class LazyLoading extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View >
        <View style={styles.pages.navi}>
          <Button color="#2F4F4F" title="Random Numbers" onPress={() => navigation.push('Random Numbers')} />
          <Button color="#2F4F4F" title="Step Progress" onPress={() => navigation.push('Step Progress')} />
          <Button color="#2F4F4F" title="Cofnij" onPress={() => navigation.goBack()} />
        </View>

        <View>
          <Text style={styles.pages.text}>Poniżej znajduje się losowy string</Text>
          <Suspense fallback={<Text style={styles.pages.code}>Generowanie losowego stringa...</Text>}>
            <LazyLoaded />
          </Suspense>
        </View>
      </View>
    )
  };
}