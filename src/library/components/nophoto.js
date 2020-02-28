import React from 'react';
import { Image } from 'react-native';

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
      source={{
        uri:'https://images.lenouvelliste.com/noimageandroid.jpg',
        }}
        style={{ width: 130, height: 40 }}
      />
    );
  }
}

export default LogoTitle