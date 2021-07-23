import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image} from "react-native";

class Banner extends Component {
  render() {
    return (
      <View style={{height: 250, alignItems: 'center', paddingTop:20, marginBottom: 30}}>
      <Image
        source={require('../../res/images/300x250.png')}
        style={{ width: 300, height: 250 }}
      />
      </View>
    );
  }
}

export default Banner;
