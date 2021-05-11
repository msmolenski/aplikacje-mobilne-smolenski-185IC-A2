import React, { Component } from 'react';
import { Button, View, Text, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import styles from './styles';


export default function (props) {
  const navigation = useNavigation();
  return <LazyLoading {...props} navigation={navigation} />;
}

export class LazyLoading extends Component {
  render() {
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

        <Image 
          source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Big_Pine_landscape.jpg'}}  
          style={{ width: '100%', height: 200 }} 
          PlaceholderContent={<ActivityIndicator />}
        />

      <View style={styles.pages.columns}>
      <AntDesign name="stepforward" size={24} color="black" />
      <AntDesign name="customerservice" size={24} color="black" />
      <AntDesign name="book" size={24} color="black" />
      <AntDesign name="clockcircleo" size={24} color="black" />
      <AntDesign name="mail" size={24} color="black" />
      <AntDesign name="home" size={24} color="black" />
      <AntDesign name="meho" size={24} color="black" />
      <AntDesign name="shoppingcart" size={24} color="black" />
      <AntDesign name="paperclip" size={24} color="black" />
      <AntDesign name="qrcode" size={24} color="black" />
      </View>
      <View style={styles.pages.columns}>
      <Entypo name="cycle" size={24} color="black" />
      <Entypo name="database" size={24} color="black" />
      <Entypo name="drink" size={24} color="black" />
      <Entypo name="drop" size={24} color="black" />
      <Entypo name="emoji-flirt" size={24} color="black" />
      <Entypo name="evernote" size={24} color="black" />
      <Entypo name="facebook" size={24} color="black" />
      <Entypo name="fingerprint" size={24} color="black" />
      <Entypo name="flag" size={24} color="black" />
      <Entypo name="flow-branch" size={24} color="black" />
      </View>
      <View style={styles.pages.columns}>
      <SimpleLineIcons name="key" size={24} color="black" />
      <SimpleLineIcons name="paper-plane" size={24} color="black" />
      <SimpleLineIcons name="settings" size={24} color="black" />
      <SimpleLineIcons name="social-twitter" size={24} color="black" />
      <SimpleLineIcons name="social-github" size={24} color="black" />
      <SimpleLineIcons name="social-youtube" size={24} color="black" />
      <SimpleLineIcons name="social-steam" size={24} color="black" />
      <SimpleLineIcons name="trash" size={24} color="black" />
      <SimpleLineIcons name="bag" size={24} color="black" />
      <SimpleLineIcons name="cup" size={24} color="black" />
      </View>
    </View>
    )
  };
}