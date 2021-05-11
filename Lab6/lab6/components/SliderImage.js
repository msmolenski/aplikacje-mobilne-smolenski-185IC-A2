import React, { Component } from 'react';
import { Button, View, Text, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';


  export default function(props) {
    const navigation = useNavigation();
    return <SliderImage {...props} navigation = {navigation} />;
  }
  
  export class SliderImage extends Component {  
    state = {
      imgSize: 1,
    }

  resize = (value) => {
    this.setState({imgSize: value});
  }

  render(){
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
        
        <Slider
        style={styles.pages.slider}
        minimumValue={0.1}
        maximumValue={1}
        value={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={this.resize}
        />
        <Image style={{ transform: [{ scale: this.state.imgSize}] }} source={require('./images/shrek.png')}/>
      </View>
    </View>
  );
}}