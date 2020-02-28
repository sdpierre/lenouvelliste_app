import React from 'react';
import { Image } from 'react-native';

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
      source={{
        uri:'https://images.lenouvelliste.com/app/logo.png',
        }}
        style={{ width: 130, height: 40 }}
      />
    );
  }
}

export default LogoTitle