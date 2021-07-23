import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image} from "react-native";

class Banner extends Component {
  render() {
    return (
      <View style={{height: 50, alignItems: 'center', paddingTop:20, marginBottom: 30}}>
      <Image
        source={require('../../res/images/320x50.png')}
        style={{ width: 320, height: 50 }}
      />
      </View>
    );
  }
}

export default Banner;
