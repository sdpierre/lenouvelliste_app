import React from 'react';
import { Image } from 'react-native';

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('../../res/images/logo_white.png')}
        style={{ width: 130, height: 40 }}
      />
    );
  }
}

export default LogoTitle