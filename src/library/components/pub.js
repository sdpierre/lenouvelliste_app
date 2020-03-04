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
      <View style={{backgroundColor: '#F7F7F7', height: 270, alignItems: 'center', paddingTop:5, paddingBottom:5,}}>
       <AdMobBanner
  adSize="mediumRectangle"
  adUnitID="ca-app-pub-3940256099942544/2934735716"
  testDevices={[AdMobBanner.simulatorId]}
  onAdFailedToLoad={error => console.error(error)}
/>
                      </View>
    );
  }
}

export default MyCarousel;
