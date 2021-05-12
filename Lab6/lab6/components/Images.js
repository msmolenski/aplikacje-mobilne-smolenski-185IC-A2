import React from 'react';
import { Button, View, Text, Image } from 'react-native';
import styles from './styles';


export default function Images({ navigation }) {


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
        <Text style={styles.pages.text}>Obraz z wykorzystaniem URI</Text>
      </View>
      <Image style={styles.pages.img}
        source={{ uri: 'https://samequizy.pl/wp-content/uploads/2018/08/filing_images_adf42417a130.jpg' }} />
      <View style={styles.pages.column}>
        <Text style={styles.pages.text}>Obraz z wykorzystaniem require</Text>
      </View>
      <Image style={styles.pages.img} source={require('./images/shrek.png')} />
    </View>
  );
}