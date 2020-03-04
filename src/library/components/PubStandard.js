import React, { Component } from "react";
import { Text, View, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'

class MyCarousel extends Component {
  render() {
    return (
      <View style={{height: 50, alignItems: 'center', paddingTop:20, marginBottom: 30}}>
       <AdMobBanner
  adSize="banner"
  adUnitID="ca-app-pub-3940256099942544/2934735716"
  testDevices={[AdMobBanner.simulatorId]}
  onAdFailedToLoad={error => console.error(error)}
/>
      </View>
    );
  }
}

export default MyCarousel;
