import React from 'react';
import { Image } from 'react-native';

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('../../res/images/logolnv.png')}
        style={{ width: 100, height: 35, resizeMode: 'stretch' }}
      />
    );
  }
}

export default LogoTitle