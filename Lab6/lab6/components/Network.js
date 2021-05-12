import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from '@react-navigation/native';
import styles from './styles';


export default function (props) {
  const navigation = useNavigation();
  return <Network {...props} navigation={navigation} />;
}

export class Network extends Component {
  state = {};
  componentDidMount() {
    this.fetchState();
  }
  fetchState = async () => {
    const state = await NetInfo.fetch();
    var tempState = JSON.stringify(state)
    this.setState(JSON.parse(tempState))
  };

  render() {
    var details = this.state.details ? JSON.parse(JSON.stringify(this.state.details, null)) : ''
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, marginTop: 50 }}>
        <View style={styles.pages.navi}>
          <Button color="#2F4F4F" title="Images" onPress={() => navigation.push('Images')} />
          <Button color="#2F4F4F" title="Slider Image" onPress={() => navigation.push('Slider Image')} />
          <Button color="#2F4F4F" title="Lazy Loading" onPress={() => navigation.push('Lazy Loading')} />
        </View>
        <View style={styles.pages.navi}>
          <Button color="#2F4F4F" title="Network" onPress={() => navigation.push('Network')} />
          <Button color="#2F4F4F" title="AsyncStore" onPress={() => navigation.push('AsyncStore')} />
          <Button color="#2F4F4F" title="SyncData" onPress={() => navigation.push('SyncData')} />
        </View>
        <View style={styles.pages.column}>
          <Text style={styles.pages.text}>Stan połączenia</Text>
          {this.state.isConnected
            ? <Text style={styles.pages.code}>Połączono  </Text>
            : <Text style={styles.pages.code}>Brak połączenia  </Text>}
          <Text style={styles.pages.text}>Typ połączenia </Text>
          <Text style={styles.pages.code}>{this.state.type}  </Text>
          <Text style={styles.pages.text}>Adres IP</Text>
          <Text style={styles.pages.code}>{details.ipAddress}  </Text>
          <Text style={styles.pages.text}>Siła sygnału</Text>
          <Text style={styles.pages.code}>{details.strength} %  </Text>

        </View>
      </View>
    );
  }
}