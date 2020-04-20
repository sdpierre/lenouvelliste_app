import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Share} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';

class MyCarousel extends Component {

  constructor(props) {
    super(props);
  }
  onClick(url, titre) {
    Share.share(
      {
        message: url,
        url: url,
        title: titre,
      },
      {
        // Android only:
        dialogTitle: titre,
        // iOS only:
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
      },
    );
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={this.onClick.bind(this, this.props.url, this.props.titre)}
          id="offline">
          <Text style={{}}>
            <Ionicons name="share" size={25} color="#808080" />
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MyCarousel;
